# Candidate 115 — Song-row structure

Source: Candidate 114, SHA-256 `79b5f809abd1af10bf46fd4f2450153f7aba0486a70d164e37d2a54e085f6d02`.

Changes: expanded AMQ/EMQ inline song rows now show the work cover when available, use a stable artwork/title/actions layout, and use inset selected/hover styling instead of translated rows that clip at the scrollport. Existing play, queue, familiarity, tag and reset actions are retained.

Validation: 7 PASS, 0 FAIL; 62 inline scripts syntax-checked; 90 style blocks and 2,567 CSS rules parsed with zero errors. See acceptance report for detailed browser assertions.

Limitations: remote audio, durable storage after real reload, universal cover availability, full osu!stable pixel acceptance, and binary upload/SHA verification are not yet verified.