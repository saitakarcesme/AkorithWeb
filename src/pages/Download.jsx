import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Page, Reveal, Stagger, StaggerItem, SplitWords } from '../components/motion.jsx'
import { SectionHeading, Card, GhostButton, Spark, GITHUB_URL } from '../components/ui.jsx'

const STEPS = [
  {
    n: '01',
    title: 'Open the latest release',
    code: 'open https://github.com/saitakarcesme/Akorith/releases/latest',
  },
  {
    n: '02',
    title: 'Install the native build',
    code: 'macOS: open the DMG and move Akorith to Applications\nWindows: run Akorith-Setup-x64.exe',
  },
  {
    n: '03',
    title: 'Launch and choose a CLI',
    code: 'Open Akorith · add a project · choose Claude, Codex, OpenCode, or Ollama',
  },
]

const REQUIREMENTS = [
  { name: 'macOS or Windows', desc: 'Signed macOS builds and Windows installer/portable builds are published with every stable release.', required: true },
  { name: 'claude CLI', desc: 'Adds your signed-in Claude models to General Chat, Workspace, Benchmark, Loop, and Research.', required: false },
  { name: 'codex CLI', desc: 'Adds your signed-in OpenAI Codex models for project work and autonomous Research without storing an API key.', required: false },
  { name: 'opencode CLI', desc: 'Adds installed OpenCode models for direct project work, goals, and Research.', required: false },
  { name: 'Ollama', desc: 'Adds fully local models for chat, benchmarks, compatible Loop work, and supported Research runs.', required: false },
  { name: 'Local tools', desc: 'Git, ripgrep, Pandoc, FFmpeg, and other audited tools are detected individually when installed.', required: false },
]

const FAQ = [
  {
    q: 'Do I need any API keys?',
    a: 'No. Akorith stores zero keys and zero credentials. It drives the CLIs you are already logged into — claude, codex, opencode — and talks to Ollama locally. If a CLI works in your terminal, it works in Akorith.',
  },
  {
    q: 'Where is my data stored?',
    a: 'Everything lives on your machine in a local SQLite database plus app configuration and managed attachment files. Chats, project memory, goals, research jobs, report artifacts, benchmarks, and usage stats remain local and deletable.',
  },
  {
    q: 'Which platforms are supported?',
    a: 'Stable releases currently include signed macOS Apple Silicon/Intel builds plus Windows installer and portable builds. Linux can still be run from source but is not a packaged release target yet.',
  },
  {
    q: 'Can project tasks push or delete things automatically?',
    a: 'Workspace change review does not grant commit, push, revert, or destructive authority. Loop and local execution remain project-scoped, and destructive actions require explicit human approval.',
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
            <SplitWords text="From download to workspace" />
            <br />
            <SplitWords text="in a few minutes." delay={0.3} gradient />
          </h1>
          <Reveal delay={0.5}>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
              Install the latest native release, choose the CLI you already use, and start working.
              No Akorith account, API key, or cloud proxy is required.
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
              Prefer to inspect or build the source?{' '}
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-clay-deep underline-offset-4 hover:underline"
              >
                Open the repository ↗
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
            lead="Akorith degrades gracefully: each signed-in provider CLI adds its models, while local tools and Ollama unlock only the capabilities present on your machine."
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
