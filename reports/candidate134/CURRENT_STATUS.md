# CURRENT STATUS — Song Select after Candidate 134 experiment

- Candidate 134 is REJECTED due to a browser-observed catalog lifecycle regression.
- Do not use Candidate 134 as the next working baseline.
- Candidate 132 remains the best intermediate for the eight-row window logic, SHA-256 `558076127bf072b992543c32224e1890c331c7ba3116d58d153757349aa739f1`.
- Candidate 132's window logic passed a real-data DOM check with 13 song rows and exactly 8 visible, but the song list overlaps the underlying work catalog.
- Candidate 134 attempted to make the song list a fixed right-side rail and hide unrelated work cards. Browser test failed: the inline list disappeared and the catalog DOM doubled from 180 to 360 cards.
- Static parsing: 62 executable inline JavaScript blocks have no syntax errors; the additional data-only script block is not executable JS. CSS style block count unchanged at 94.
- Browser: rendered via Playwright set_content; direct file:// is BLOCKED; localStorage persistence NOT RUN.
- Full visual acceptance remains NOT ACCEPTED. Stages 1, 2, and 3 remain incomplete.
