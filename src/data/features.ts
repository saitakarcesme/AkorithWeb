export const features = [
  {
    kicker: "Workspace orchestration",
    title: "One project, three agent lanes",
    body:
      "Akorith starts or reuses Codex, OpenCode, and Claude sessions in the selected folder, then routes prompts through one deliberate bridge path.",
    points: ["Project-scoped workspaces", "Agent Activity drawer", "Prompt target selector", "Output summaries"]
  },
  {
    kicker: "Local-first data model",
    title: "Your chats and project metadata stay on your machine",
    body:
      "Provider authentication remains with official CLIs. Akorith stores local app state in SQLite and JSON config, not provider secrets.",
    points: ["No provider API keys", "Local SQLite history", "Per-chat memory windows", "Repo context controls"]
  },
  {
    kicker: "Operational visibility",
    title: "A dashboard for usage, runtime, plugins, and loops",
    body:
      "The dashboard presents read-only status for provider usage, local runtime, GPU state, controller availability, and mission activity.",
    points: ["Usage-limit cards", "GPU runtime panel", "Controller status", "Plugin diagnostics"]
  }
];
