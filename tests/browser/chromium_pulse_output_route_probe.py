#!/usr/bin/env python3
"""Diagnostic-only Chromium/PulseAudio output routing probe.

This does not replace the production audio acceptance gate. It runs a synthetic
non-silent WAV through three Chromium audio-service configurations and reports
whether Chromium creates a PulseAudio sink input and whether the sink monitor
captures non-silent PCM. A clean exit means the probe completed, not that audio
output worked.
"""
import array
import base64
import io
import json
import math
import os
import shutil
import struct
import subprocess
import threading
import time
import wave

from playwright.sync_api import sync_playwright


def make_wav(seconds=2.5, rate=44100):
    outbuf = io.BytesIO()
    frames = bytearray()
    for i in range(int(seconds * rate)):
        fade = min(1.0, i / (rate * 0.03), (seconds * rate - i - 1) / (rate * 0.03))
        value = int(7000 * max(0.0, fade) * math.sin(2 * math.pi * 440 * i / rate))
        frames.extend(struct.pack("<hh", value, value))
    with wave.open(outbuf, "wb") as out:
        out.setnchannels(2)
        out.setsampwidth(2)
        out.setframerate(rate)
        out.writeframes(frames)
    return outbuf.getvalue()


class Monitor:
    def __init__(self):
        self.module_id = None
        self.proc = None
        self.thread = None
        self.lock = threading.Lock()
        self.chunks = []

    def start(self):
        for executable in ("pulseaudio", "pactl", "parec"):
            if shutil.which(executable) is None:
                raise RuntimeError(f"missing required executable: {executable}")
        subprocess.run(["pulseaudio", "--start", "--exit-idle-time=-1"],
                       check=True, capture_output=True, timeout=15)
        sinks = subprocess.run(["pactl", "list", "short", "sinks"], check=True,
                               capture_output=True, text=True, timeout=10).stdout
        if "amq_acceptance" not in sinks:
            result = subprocess.run(
                ["pactl", "load-module", "module-null-sink",
                 "sink_name=amq_acceptance", "rate=44100", "channels=2"],
                check=True, capture_output=True, text=True, timeout=10)
            self.module_id = result.stdout.strip()
        subprocess.run(["pactl", "set-default-sink", "amq_acceptance"],
                       check=True, capture_output=True, timeout=10)
        os.environ["PULSE_SINK"] = "amq_acceptance"
        self.proc = subprocess.Popen(
            ["parec", "--device=amq_acceptance.monitor", "--format=s16le",
             "--rate=44100", "--channels=2"],
            stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        self.thread = threading.Thread(target=self.read, daemon=True)
        self.thread.start()
        time.sleep(0.3)
        if self.proc.poll() is not None:
            raise RuntimeError("PulseAudio monitor process exited during setup")

    def read(self):
        while self.proc and self.proc.stdout:
            block = self.proc.stdout.read(16384)
            if not block:
                return
            with self.lock:
                self.chunks.append(block)

    def reset(self):
        with self.lock:
            self.chunks.clear()

    def measure(self):
        with self.lock:
            raw = b"".join(self.chunks)
        usable = len(raw) - len(raw) % 2
        samples = array.array("h")
        samples.frombytes(raw[:usable])
        if samples and struct.pack("=h", 1) != struct.pack("<h", 1):
            samples.byteswap()
        peak = max((abs(v) for v in samples), default=0)
        rms = math.sqrt(sum(v * v for v in samples) / max(1, len(samples)))
        return {"bytes": len(raw), "samples": len(samples), "peak": peak, "rms": round(rms, 1)}

    def stop(self):
        if self.proc and self.proc.poll() is None:
            self.proc.terminate()
            try:
                self.proc.wait(timeout=5)
            except subprocess.TimeoutExpired:
                self.proc.kill()
                self.proc.wait(timeout=5)
        if self.thread:
            self.thread.join(timeout=2)
        if self.module_id:
            subprocess.run(["pactl", "unload-module", self.module_id],
                           capture_output=True, timeout=10)


def sink_inputs():
    return subprocess.run(["pactl", "list", "short", "sink-inputs"],
                          check=True, capture_output=True, text=True, timeout=10).stdout.strip()


def main():
    wav = base64.b64encode(make_wav()).decode("ascii")
    html = '<audio id="probe" controls src="data:audio/wav;base64,' + wav + '"></audio>'
    variants = [
        ("default-audio-service", []),
        ("disable-audio-service-sandbox", ["--disable-features=AudioServiceSandbox"]),
        ("disable-sandbox-and-oop", ["--disable-features=AudioServiceSandbox,AudioServiceOutOfProcess"]),
    ]
    monitor = Monitor()
    monitor.start()
    results = []
    try:
        with sync_playwright() as pw:
            for name, extra_args in variants:
                monitor.reset()
                row = {"variant": name, "args": extra_args}
                try:
                    browser = pw.chromium.launch(
                        channel="chromium",
                        headless=False,
                        ignore_default_args=["--mute-audio"],
                        args=["--no-sandbox", "--disable-dev-shm-usage",
                              "--autoplay-policy=no-user-gesture-required", *extra_args],
                        env={**os.environ, "PULSE_SINK": "amq_acceptance"},
                    )
                    page = browser.new_page()
                    page.set_content(html)
                    page.evaluate("document.querySelector('#probe').play()")
                    page.wait_for_function("document.querySelector('#probe').currentTime > 0.35",
                                           timeout=10000)
                    time.sleep(0.7)
                    row["sinkInputs"] = sink_inputs()
                    row["capture"] = monitor.measure()
                    row["mediaTime"] = page.evaluate("document.querySelector('#probe').currentTime")
                    row["nonSilentOutput"] = bool(row["capture"]["peak"] >= 1000 and row["capture"]["rms"] >= 150)
                    page.close()
                    browser.close()
                except Exception as exc:
                    row["error"] = f"{type(exc).__name__}: {exc}"
                    row["capture"] = monitor.measure()
                results.append(row)
                print("AUDIO_ROUTE_PROBE " + json.dumps(row, ensure_ascii=False), flush=True)
    finally:
        monitor.stop()
    print("AUDIO_ROUTE_PROBE_SUMMARY " + json.dumps({
        "variants": len(results),
        "anyNonSilentOutput": any(r.get("nonSilentOutput") for r in results),
        "results": results,
    }, ensure_ascii=False), flush=True)
    # Diagnostic-only: do not turn the unresolved output gate into a false pass/fail.
    # The separate real_audio_output_acceptance.py assertion remains authoritative.


if __name__ == "__main__":
    main()
