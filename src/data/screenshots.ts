import { withBase } from "../utils/assets";

export const screenshots = [
  {
    id: "workspace",
    label: "Workspace",
    title: "A chat-first command surface with project context",
    description:
      "The main workspace keeps planning, model choice, repo context, and agent targeting in one calm surface.",
    image: withBase("images/screenshots/workspace.png")
  },
  {
    id: "activity",
    label: "Agent Activity",
    title: "Three real agent terminals, docked where you need them",
    description:
      "Olympus, Gaia, and Atlantis expose Codex, OpenCode, and Claude sessions running inside the selected project.",
    image: withBase("images/screenshots/agent-activity.png")
  },
  {
    id: "dashboard",
    label: "Dashboard",
    title: "Usage, runtime, loops, and test signal at a glance",
    description:
      "Read-only operational visibility helps teams understand what is running before they send work to agents.",
    image: withBase("images/screenshots/dashboard.png")
  },
  {
    id: "plugins",
    label: "Plugins",
    title: "Plugin diagnostics without hiding the system state",
    description:
      "Akorith surfaces plugin availability, diagnostics, and companion integration status directly in the app.",
    image: withBase("images/screenshots/plugins.png")
  },
  {
    id: "testlab",
    label: "Test Lab",
    title: "Generate, run, repair, and score tests in a sandbox",
    description:
      "The Test Lab reads bounded repo context, runs generated tests away from your source, and exports scored reports.",
    image: withBase("images/screenshots/testlab.png")
  },
  {
    id: "updates",
    label: "Updates",
    title: "A cautious in-app source updater",
    description:
      "The updater fast-forwards safely from GitHub main and refuses destructive reset behavior.",
    image: withBase("images/screenshots/settings-update.png")
  }
];
