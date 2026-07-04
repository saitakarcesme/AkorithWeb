/* Shared constants so every CLI terminal on the site matches the real
   Akorith CLI byte-for-byte (colors from akorithcli/src/ui.js, wordmark
   and provider list from the running binary). */

export const CLI = {
  version: '0.1.0',
  // white at varying opacity on near-black, exactly as ui.js defines them
  text: '#dcdde0',
  dim: '#85868c',
  faint: '#5c5d63',
  violet: '#a78bfa',
  violetDeep: '#8b5cf6',
  green: '#34d399', // emerald-400 · the ✓ lines
  red: '#f87171',
  yellow: '#fbbf24',
  sky: '#38bdf8',
  bg: '#0b0b0d',
}

/* The exact ASCII wordmark the CLI prints (akorithcli/src/ui.js WORDMARK). */
export const WORDMARK = [
  ' █████╗ ██╗  ██╗ ██████╗ ██████╗ ██╗████████╗██╗  ██╗',
  '██╔══██╗██║ ██╔╝██╔═══██╗██╔══██╗██║╚══██╔══╝██║  ██║',
  '███████║█████╔╝ ██║   ██║██████╔╝██║   ██║   ███████║',
  '██╔══██║██╔═██╗ ██║   ██║██╔══██╗██║   ██║   ██╔══██║',
  '██║  ██║██║  ██╗╚██████╔╝██║  ██║██║   ██║   ██║  ██║',
  '╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝   ╚═╝   ╚═╝  ╚═╝',
].join('\n')

/* /models provider list — codenames + statuses as printed by the binary. */
export const PROVIDERS = [
  { id: 'claude', codename: 'Atlantis', ready: true, hint: 'model aliases: opus, sonnet, haiku (e.g. /model claude/sonnet)' },
  { id: 'codex', codename: 'Olympus', ready: true, hint: 'pass any Codex model id (e.g. /model codex/gpt-5-codex)' },
  { id: 'opencode', codename: 'Gaia', ready: true, hint: 'model format provider/model (e.g. /model opencode/anthropic/claude-sonnet-4-5)' },
  { id: 'ollama', codename: 'Local', ready: false, hint: 'requires a running Ollama install (e.g. /model ollama/qwen3)' },
]

/* status line pieces — mirrors printStatus() / formatModel() */
export function formatModel(provider, model = 'default') {
  const p = PROVIDERS.find((x) => x.id === provider)
  return `${p.codename.toLowerCase()} · ${p.id}/${model}`
}
