import { links } from "../utils/links";

export const downloads = [
  {
    id: "source",
    title: "Source ZIP",
    subtitle: "Available now",
    body: "Download the current main branch and run the setup script locally.",
    cta: "Download source",
    href: links.sourceZip,
    meta: "Works on macOS, Windows, and Linux development machines."
  },
  {
    id: "mac",
    title: "macOS",
    subtitle: "Release channel",
    body: "The packaged DMG and ZIP are published from Akorith GitHub Releases.",
    cta: "Open releases",
    href: links.releases,
    meta: "Apple Silicon and Intel targets are configured in the desktop app."
  },
  {
    id: "windows",
    title: "Windows",
    subtitle: "Release channel",
    body: "NSIS installer and portable builds are configured for x64 Windows.",
    cta: "Open releases",
    href: links.releases,
    meta: "Windows 10 1809+ is the supported baseline."
  }
] as const;

export const setupSteps = [
  "Install and sign in to the CLIs you already use: Claude, Codex, OpenCode, or Ollama.",
  "Run the Akorith setup script to check dependencies without collecting secrets.",
  "Open a project and let Akorith attach the available agents to that workspace."
];
