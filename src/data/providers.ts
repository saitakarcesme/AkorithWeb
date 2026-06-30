export const providers = [
  {
    name: "Claude",
    lane: "Atlantis",
    auth: "Claude CLI login",
    role: "Long-form reasoning, review, architecture notes",
    mode: "Subscription-backed CLI"
  },
  {
    name: "Codex",
    lane: "Olympus",
    auth: "Codex CLI login",
    role: "Coding tasks, repo edits, terminal-aware execution",
    mode: "ChatGPT account CLI"
  },
  {
    name: "OpenCode",
    lane: "Gaia",
    auth: "opencode auth login",
    role: "OpenCode workflows and alternate agent execution",
    mode: "CLI-backed agent"
  },
  {
    name: "Ollama",
    lane: "Local",
    auth: "Local server",
    role: "Offline/local model chat and test generation",
    mode: "Optional local runtime"
  }
];
