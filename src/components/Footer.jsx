import { Link } from 'react-router-dom'
import { AkMark } from './Logo.jsx'
import { GITHUB_URL, CLI_GITHUB_URL, Spark } from './ui.jsx'

const COLUMNS = [
  {
    title: 'Product',
    links: [
      { label: 'Features', to: '/features' },
      { label: 'Agents & Companions', to: '/agents' },
      { label: 'Loop', to: '/loop' },
      { label: 'Akorith CLI', to: '/cli' },
      { label: 'Developers', to: '/developers' },
      { label: 'Download', to: '/download' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'GitHub', href: GITHUB_URL },
      { label: 'CLI on GitHub', href: CLI_GITHUB_URL },
      { label: 'Issues', href: `${GITHUB_URL}/issues` },
      { label: 'Releases', href: `${GITHUB_URL}/releases` },
      { label: 'Docs', href: `${GITHUB_URL}/tree/main/docs` },
    ],
  },
  {
    title: 'Providers',
    links: [
      { label: 'Claude Code', href: 'https://claude.com/claude-code' },
      { label: 'OpenAI Codex', href: 'https://openai.com/codex' },
      { label: 'OpenCode', href: 'https://opencode.ai' },
      { label: 'Ollama', href: 'https://ollama.com' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-line bg-night text-ink">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link to="/" className="flex w-fit items-center gap-2.5">
              <AkMark className="h-8 w-8" tone="cream" />
              <span className="font-serif text-xl font-semibold tracking-tight text-ink">
                Akorith
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink/60">
              The local-first Agent OS. Orchestrate Claude, Codex, OpenCode, and local models —
              on your machine, with your logins, under your rules.
            </p>
            <p className="mt-6 flex items-center gap-2 font-mono text-xs text-ink/40">
              <Spark className="h-3 w-3 text-clay" />
              local-first · no keys stored · every action logged
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-ink/40">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.to ? (
                      <Link
                        to={link.to}
                        className="text-sm text-ink/70 transition-colors hover:text-clay"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-ink/70 transition-colors hover:text-clay"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
          <p className="text-sm text-ink/45">
            © {new Date().getFullYear()} Akorith. Open source, built for your desktop.
          </p>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-ink/55 transition-colors hover:text-clay"
          >
            github.com/saitakarcesme/akorith ↗
          </a>
        </div>
      </div>
    </footer>
  )
}
