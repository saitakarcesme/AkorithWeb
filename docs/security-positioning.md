# Security Positioning

The public site should avoid vague security claims. It should say what the app does:

- It does not store provider API keys.
- It relies on official CLI logins already present on the user's machine.
- Chat history, usage, project metadata, and settings are local app data.
- Electron hardening is described as a concrete posture: context isolation, sandboxing, disabled Node integration, strict CSP, and stdin prompt delivery.
