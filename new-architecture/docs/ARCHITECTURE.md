# Independent architecture contract

- `src/core.js`: schema, validation, persistence, import/export, pure quiz rules.
- `src/views.js`: render-only view functions.
- `src/app.js`: navigation and event coordination.
- `src/styles.css`: design tokens and responsive layout.
- `src/template.html`: standalone document shell.
- `tools/build.py`: deterministic single-file HTML build.

Modules share a private `AMQNew` namespace so the output runs without runtime imports or external network dependencies.

The local catalog starts empty by design. No legacy AMQ data is imported. Audio is used only when a user supplies an audio URL. Current study plans are target records, not a spaced-repetition scheduler. Multiplayer networking is not implemented.