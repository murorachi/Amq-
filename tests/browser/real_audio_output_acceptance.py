#!/usr/bin/env python3
"""Real Chromium audio-output acceptance for the unchanged V82.82 product.

Unlike the lifecycle mock, this test uses native HTMLMediaElement decoding and a
PulseAudio monitor capture. Only the remote AMQ mirror response is replaced with a
deterministic PCM WAV fixture; the first mirror is deliberately failed to exercise
the application's actual fallback code.
"""
import argparse
import array
import io
import math
import shutil
import struct
import subprocess
import threading
import time
import wave
from pathlib import Path

from playwright.sync_api import sync_playwright

STORAGE_SHIM = r"""<script>(() => {
  const values = new Map();
  const storage = {
    get length() { return values.size; },
    key: i => [...values.keys()][i] ?? null,
    getItem: k => values.has(String(k)) ? values.get(String(k)) : null,
    setItem: (k, v) => values.set(String(k), String(v)),
    removeItem: k => values.delete(String(k)),
    clear: () => values.clear()
  };
  Object.defineProperty(window, 'localStorage', {configurable:true, value:storage});
  Object.defineProperty(window, 'sessionStorage', {configurable:true, value:storage});
})();</script>"""


def check(condition, message):
    if not condition:
        raise AssertionError(message)
    print("PASS " + message, flush=True)


def make_wav(seconds=6.0, sample_rate=44100):
    """Generate audible, deterministic 440 Hz PCM16 stereo audio in memory."""
    frames = bytearray()
    count = int(seconds * sample_rate)
    for i in range(count):
        fade = min(1.0, i / (sample_rate * 0.04), (count - i - 1) / (sample_rate * 0.04))
        sample = int(7000 * max(0.0, fade) * math.sin(2 * math.pi * 440 * i / sample_rate))
        frames.extend(struct.pack("<hh", sample, sample))
    buf = io.BytesIO()
    with wave.open(buf, "wb") as out:
        out.setnchannels(2)
        out.setsampwidth(2)
        out.setframerate(sample_rate)
        out.writeframes(frames)
    return buf.getvalue()


class PulseCapture:
    def __init__(self):
        self.module_id = None
        self.chunks = []
        self.lock = threading.Lock()
        self.proc = None
        self.reader = None

    def start(self):
        for executable in ("pulseaudio", "pactl", "parec"):
            if shutil.which(executable) is None:
                raise AssertionError(f"required audio capture executable missing: {executable}")
        subprocess.run(["pulseaudio", "--start", "--exit-idle-time=-1"], check=True,
                       stdout=subprocess.PIPE, stderr=subprocess.PIPE, timeout=15)
        info = subprocess.run(["pactl", "info"], check=True, capture_output=True, text=True, timeout=10)
        check("Server Name:" in info.stdout, "PulseAudio server is available for output capture")
        sinks = subprocess.run(["pactl", "list", "short", "sinks"], check=True,
                               capture_output=True, text=True, timeout=10).stdout
        if "amq_acceptance" not in sinks:
            loaded = subprocess.run(
                ["pactl", "load-module", "module-null-sink", "sink_name=amq_acceptance",
                 "rate=44100", "channels=2"],
                check=True, capture_output=True, text=True, timeout=10)
            self.module_id = loaded.stdout.strip()
        subprocess.run(["pactl", "set-default-sink", "amq_acceptance"], check=True,
                       capture_output=True, timeout=10)
        time.sleep(0.4)
        self.proc = subprocess.Popen(
            ["parec", "--device=amq_acceptance.monitor", "--format=s16le",
             "--rate=44100", "--channels=2"],
            stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        self.reader = threading.Thread(target=self._read, daemon=True)
        self.reader.start()
        time.sleep(0.4)
        check(self.proc.poll() is None, "PulseAudio monitor capture started")

    def _read(self):
        while self.proc and self.proc.stdout:
            block = self.proc.stdout.read(16384)
            if not block:
                break
            with self.lock:
                self.chunks.append(block)

    def stop(self):
        if self.proc and self.proc.poll() is None:
            self.proc.terminate()
            try:
                self.proc.wait(timeout=5)
            except subprocess.TimeoutExpired:
                self.proc.kill()
                self.proc.wait(timeout=5)
        if self.reader:
            self.reader.join(timeout=3)
        with self.lock:
            raw = b"".join(self.chunks)
        if self.module_id:
            subprocess.run(["pactl", "unload-module", self.module_id],
                           stdout=subprocess.PIPE, stderr=subprocess.PIPE, timeout=10)
        return raw


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--html", type=Path,
                        default=Path(__file__).resolve().parents[2] / "dist" / "amq_learning_tool_v82_85_12.html")
    parser.add_argument("--chromium", default=None)
    args = parser.parse_args()
    html_path = args.html.resolve()
    check(html_path.is_file(), "V82.85.12 standalone candidate exists")

    capture = PulseCapture()
    capture.start()
    raw_pcm = b""
    errors = []
    mirror_requests = {"first": 0, "fallback": 0}
    wav = make_wav()

    try:
        with sync_playwright() as pw:
            launch = {"headless": True, "args": [
                "--no-sandbox", "--disable-dev-shm-usage",
                "--autoplay-policy=document-user-activation-required"
            ]}
            if args.chromium:
                launch["executable_path"] = args.chromium
            browser = pw.chromium.launch(**launch)
            try:
                page = browser.new_page()
                page.on("pageerror", lambda exc: errors.append(str(exc)))
                marker = html_path.read_text(encoding="utf-8")
                head = marker.lower().find("<head>")
                check(head >= 0, "standalone document has a head element")
                pos = head + len("<head>")
                html = marker[:pos] + STORAGE_SHIM + marker[pos:]

                # Default-deny remote traffic. The first real AMQ mirror fails;
                # the second returns valid PCM media through the browser decoder.
                page.route("https://**/*", lambda route: route.abort())
                page.route("https://nawdist.animemusicquiz.com/**",
                           lambda route: (mirror_requests.__setitem__("first", mirror_requests["first"] + 1),
                                          route.abort()))
                def fallback(route):
                    mirror_requests["fallback"] += 1
                    route.fulfill(status=200, content_type="audio/wav", body=wav,
                                  headers={"Access-Control-Allow-Origin": "*",
                                           "Cache-Control": "no-store"})
                page.route("https://naedist.animemusicquiz.com/**", fallback)
                page.set_content(html, wait_until="domcontentloaded", timeout=60000)
                page.wait_for_timeout(900)
                check(page.title() == "AMQ學習工具", "production standalone app initializes")
                page.evaluate("""() => {
                  window.__realAudioEvents = {playing:0, pause:0, ended:0, error:0};
                  for (const name of ['playing','pause','ended','error']) {
                    audioEl.addEventListener(name, () => window.__realAudioEvents[name]++);
                  }
                }""")

                song = page.evaluate("""() => {
                  const pool = getQuizPool();
                  const eligible = pool.find(s => s && s[9]) || songs.find(s => s && s[9]);
                  return eligible ? Array.from(eligible) : null;
                }""")
                check(song is not None and len(song) > 9 and bool(song[9]),
                      "catalog provides a real AMQ audio-mirror candidate")

                # No user gesture: native play() must reject under Chromium's
                # user-activation policy and the app must expose its retry state.
                page.evaluate("(s) => listenSong(s, {autoPlay:true})", song)
                page.wait_for_function(
                    "document.getElementById('dockStatus')?.textContent.includes('瀏覽器尚未允許自動播放')",
                    timeout=10000)
                check(True, "autoplay rejection is surfaced as a manual-play request")
                page.wait_for_function(
                    "audioEl.currentSrc.includes('naedist.animemusicquiz.com')", timeout=15000)
                check(mirror_requests["first"] >= 1 and mirror_requests["fallback"] >= 1,
                      "failed first mirror advances through the real fallback handler")

                page.locator("#playPauseBtn").click(timeout=10000)
                page.wait_for_function("!audioEl.paused && audioEl.readyState >= 2", timeout=10000)
                page.wait_for_function("window.__realAudioEvents.playing > 0", timeout=10000)
                check(True, "user-initiated retry reaches the native playing event")
                page.wait_for_timeout(450)
                first_time = page.evaluate("audioEl.currentTime")
                check(first_time > 0.15, "decoded media playback time advances")
                page.locator("#playPauseBtn").click(timeout=10000)
                page.wait_for_function("audioEl.paused", timeout=5000)
                paused_at = page.evaluate("audioEl.currentTime")
                page.wait_for_timeout(350)
                paused_after = page.evaluate("audioEl.currentTime")
                check(abs(paused_after - paused_at) < 0.08,
                      "pause freezes the actual media timeline")
                page.locator("#playPauseBtn").click(timeout=10000)
                page.wait_for_function("!audioEl.paused", timeout=5000)
                page.wait_for_timeout(350)
                resumed_at = page.evaluate("audioEl.currentTime")
                check(resumed_at > paused_after + 0.12,
                      "resume continues the existing media timeline")
                page.evaluate("audioEl.pause()")

                # Enter the production quiz controller and force only question
                # selection to a known catalog row. Playback, decoding, events,
                # answer settlement and reveal continuity remain production code.
                page.evaluate("window.__aniNavigateApp?.('quiz'); window.__aniEnterQuizV82?.()")
                page.wait_for_function("!document.getElementById('quizView')?.classList.contains('hidden')",
                                       timeout=5000)
                page.locator("#quizTarget").select_option("title")
                auto_next = page.locator("#qsAutoNext")
                if auto_next.is_checked():
                    auto_next.uncheck()
                page.evaluate("""id => {
                  const api = window.__aniEmqAPI;
                  if (api && typeof api.chooseQuestion === 'function') {
                    const original = api.chooseQuestion;
                    api.chooseQuestion = (pool, ...rest) =>
                      pool.find(row => String(row[1]) === String(id) && row[9]) ||
                      pool.find(row => row && row[9]) ||
                      original.call(api, pool, ...rest);
                  }
                }""", str(song[1]))
                page.locator("#quizStart").click(timeout=10000)
                page.wait_for_function(
                    "String(window.__aniQuizStateV45?.quizSong?.[1]) === " + repr(str(song[1])),
                    timeout=10000)
                page.wait_for_function("window.__aniQuizStateV45?.quizAudioStarted === true", timeout=15000)
                check(True, "real audio playback opens the production quiz timer gate")
                page.wait_for_timeout(350)
                before_reveal = page.evaluate("audioEl.currentTime")
                page.locator("#quizAnswer").fill(str(song[4] or ""))
                page.locator("#quizSubmit").click(timeout=10000)
                page.wait_for_function("window.__aniQuizStateV45?.quizFinished === true", timeout=5000)
                check(page.evaluate("!audioEl.paused"),
                      "revealing the answer does not pause the playing track")
                page.wait_for_timeout(350)
                after_reveal = page.evaluate("audioEl.currentTime")
                check(after_reveal > before_reveal + 0.12,
                      "audio timeline continues after answer reveal")
                page.wait_for_function("window.__realAudioEvents.ended > 0", timeout=12000)
                check(True, "native decoded track emits ended without auto-advancing quiz")
                # Start another real question while playback is active, then use
                # the production quiz-exit control to exercise its cleanup handler.
                page.locator("#quizNext").click(timeout=10000)
                page.wait_for_function("window.__aniQuizStateV45?.quizAudioStarted === true", timeout=15000)
                check(not page.evaluate("audioEl.paused"),
                      "next quiz question has active native audio before exit")
                page.locator("#quizExit").click(timeout=10000)
                page.wait_for_function("audioEl.paused", timeout=5000)
                stopped_at = page.evaluate("audioEl.currentTime")
                page.wait_for_timeout(350)
                check(abs(page.evaluate("audioEl.currentTime") - stopped_at) < 0.08,
                      "production quiz-exit handler cleans up active audio playback")
                check(not errors, "no uncaught browser page errors during real-audio acceptance")
            finally:
                browser.close()
    finally:
        raw_pcm = capture.stop()

    check(len(raw_pcm) >= 44100 * 2 * 2,
          "audio monitor captured at least one second of stereo PCM output")
    samples = array.array("h")
    usable = len(raw_pcm) - (len(raw_pcm) % samples.itemsize)
    samples.frombytes(raw_pcm[:usable])
    if samples and struct.pack("=h", 1) != struct.pack("<h", 1):
        samples.byteswap()
    peak = max((abs(x) for x in samples), default=0)
    rms = math.sqrt(sum(x * x for x in samples) / max(1, len(samples)))
    check(peak >= 1000 and rms >= 150,
          f"captured audio output is non-silent (peak={peak}, rms={rms:.1f})")
    print("AUDIO_OUTPUT_METRICS " + f"peak={peak} rms={rms:.1f} samples={len(samples)}", flush=True)


if __name__ == "__main__":
    main()
