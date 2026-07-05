import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Page, Reveal, Stagger, StaggerItem, SplitWords } from '../components/motion.jsx'
import { SectionHeading, Card, GhostButton, Spark, GITHUB_URL } from '../components/ui.jsx'

const STEPS = [
  {
    n: '01',
    title: 'Clone the repository',
    code: 'git clone https://github.com/saitakarcesme/akorith.git\ncd akorith',
  },
  {
    n: '02',
    title: 'Install dependencies',
    code: 'npm install',
  },
  {
    n: '03',
    title: 'Launch the app',
    code: 'npm run dev',
  },
]

const REQUIREMENTS = [
  { name: 'Node.js 22+', desc: 'The only hard requirement. Everything else is optional.', required: true },
  { name: 'claude CLI', desc: 'Unlocks the Atlantis terminal and Claude chats.', required: false },
  { name: 'codex CLI', desc: 'Unlocks the Olympus terminal and Codex chats.', required: false },
  { name: 'opencode CLI', desc: 'Unlocks the Gaia terminal.', required: false },
  { name: 'Ollama', desc: 'Unlocks local models, Loop, and the Test Lab — fully offline.', required: false },
  { name: 'gh CLI', desc: 'Unlocks the GitHub Workbench plugin.', required: false },
]

const FAQ = [
  {
    q: 'Do I need any API keys?',
    a: 'No. Akorith stores zero keys and zero credentials. It drives the CLIs you are already logged into — claude, codex, opencode — and talks to Ollama locally. If a CLI works in your terminal, it works in Akorith.',
  },
  {
    q: 'Where is my data stored?',
    a: 'Everything lives on your machine in a local SQLite database plus JSON config files. Chats, companion memory, usage stats — all local, all deletable, never synced anywhere.',
  },
  {
    q: 'Which platforms are supported?',
    a: 'Akorith is an Electron app built with electron-vite, so it runs on macOS, Windows, and Linux. Development happens primarily on macOS.',
  },
  {
    q: 'Can agents damage my system?',
    a: 'Agents run behind explicit permission policies — preview, safe writes, safe commands, or ask-write. Nothing destructive runs silently, every action is logged, and Test Lab work happens in disposable sandboxes.',
  },
  {
    q: 'Is it really free?',
    a: 'Yes — Akorith is open source. Your only costs are whatever plans you already have with cloud providers, or nothing at all if you run local models through Ollama.',
  },
]

function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }
  return (
    <div className="group relative mt-4 overflow-hidden rounded-xl bg-night">
      <button
        onClick={copy}
        className="absolute right-3 top-3 rounded-md border border-white/15 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-ink/60 opacity-0 transition-opacity duration-200 hover:text-ink group-hover:opacity-100"
      >
        {copied ? '✓ copied' : 'copy'}
      </button>
      <pre className="overflow-x-auto p-5 font-mono text-sm leading-relaxed text-ink/90">
        {code.split('\n').map((line, i) => (
          <div key={i}>
            <span className="select-none text-clay">$ </span>
            {line}
          </div>
        ))}
      </pre>
    </div>
  )
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="card overflow-hidden !rounded-xl">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-serif text-lg font-semibold text-ink">{q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className="shrink-0 text-xl text-clay"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <p className="px-6 pb-6 leading-relaxed text-muted">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Download() {
  return (
    <Page>
      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden px-6 pb-20 pt-36 sm:pt-44">
        <div aria-hidden className="bg-dots mask-fade-b absolute inset-0 opacity-70" />
        <Spark className="absolute right-[15%] top-48 hidden h-5 w-5 text-clay/45 animate-sway lg:block" />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="mb-5 flex items-center justify-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.22em] text-clay-deep">
            <Spark className="h-3.5 w-3.5" />
            Download
          </p>
          <h1 className="font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-6xl">
            <SplitWords text="From clone to crew" />
            <br />
            <SplitWords text="in three commands." delay={0.3} gradient />
          </h1>
          <Reveal delay={0.5}>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
              No installer, no sign-up, no license key. Clone the source, install, run — Akorith
              detects your CLIs and lights up whatever you have.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== Install steps ===== */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-3xl">
          <Stagger className="space-y-6" gap={0.15}>
            {STEPS.map((s) => (
              <StaggerItem key={s.n}>
                <Card className="p-7">
                  <div className="flex items-center gap-4">
                    <span className="font-serif text-xl font-semibold text-clay">{s.n}</span>
                    <h3 className="font-serif text-xl font-semibold text-ink">{s.title}</h3>
                  </div>
                  <CodeBlock code={s.code} />
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal delay={0.2}>
            <p className="mt-8 text-center text-sm text-muted">
              Want a packaged build instead?{' '}
              <a
                href={`${GITHUB_URL}/releases`}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-clay-deep underline-offset-4 hover:underline"
              >
                Check the releases page ↗
              </a>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== Requirements ===== */}
      <section className="border-y border-line bg-cream/40 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Requirements"
            title={
              <>
                Bring what you have. <span className="accent-word">Skip what you don't.</span>
              </>
            }
            lead="Akorith degrades gracefully — each provider CLI you're logged into unlocks its terminal, and Ollama unlocks the fully offline features."
          />
          <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {REQUIREMENTS.map((r) => (
              <StaggerItem key={r.name}>
                <Card className="h-full p-7">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-mono text-base font-semibold text-ink">{r.name}</h3>
                    <span
                      className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider ${
                        r.required
                          ? 'border-clay/40 bg-clay/10 text-clay-deep'
                          : 'border-line bg-cream/70 text-muted'
                      }`}
                    >
                      {r.required ? 'required' : 'optional'}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{r.desc}</p>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            center
            eyebrow="FAQ"
            title={
              <>
                Questions, <span className="accent-word">answered.</span>
              </>
            }
          />
          <Stagger className="mt-12 space-y-4" gap={0.08}>
            {FAQ.map((item) => (
              <StaggerItem key={item.q}>
                <FaqItem {...item} />
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal delay={0.15}>
            <div className="mt-12 text-center">
              <GhostButton href={`${GITHUB_URL}/issues`}>Still stuck? Open an issue</GhostButton>
            </div>
          </Reveal>
        </div>
      </section>
    </Page>
  )
}
