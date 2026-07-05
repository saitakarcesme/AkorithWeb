import { useState } from 'react'
import { motion } from 'framer-motion'
import { Page, Reveal, Stagger, StaggerItem, SplitWords, Magnetic } from '../components/motion.jsx'
import {
  SectionHeading,
  Card,
  CodeBlock,
  CtaSection,
  PrimaryButton,
  GhostButton,
  Spark,
  CLI_GITHUB_URL,
} from '../components/ui.jsx'
import { CliSession } from '../components/demo/CliTerminal.jsx'

const COMMANDS = [
  ['/model codex', 'Switch to Codex (Olympus) mid-session — your thread survives.'],
  ['/model claude/sonnet', 'Pick a provider with a specific model.'],
  ['/model opencode/anthropic/claude-sonnet-4-5', 'Full provider/model paths work too.'],
  ['/models', 'List every provider with live ready/offline status.'],
  ['/new', 'Fresh conversations across all providers at once.'],
  ['!git status', 'Prefix with ! to run any shell command in place.'],
  ['/exit', 'Leave — your last model choice is remembered.'],
]

const PROVIDERS = [
  {
    name: 'Atlantis',
    provider: 'Claude',
    dot: 'bg-clay',
    via: 'claude -p',
    resume: 'continues with -c',
  },
  {
    name: 'Olympus',
    provider: 'Codex',
    dot: 'bg-sky-400',
    via: 'codex exec',
    resume: 'resume --last',
  },
  {
    name: 'Gaia',
    provider: 'OpenCode',
    dot: 'bg-moss',
    via: 'opencode run',
    resume: 'continues with -c',
  },
  {
    name: 'Local',
    provider: 'Ollama',
    dot: 'bg-ink/40',
    via: 'ollama run',
    resume: 'fully offline',
  },
]

const REQUIREMENTS = [
  ['Node.js 18+', 'The only hard requirement.'],
  ['claude · codex · opencode · ollama', 'At least one CLI you already use — Akorith drives it as-is.'],
  ['Zero API keys', 'It never proxies your traffic or stores credentials.'],
]

function CommandChip({ cmd, desc }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(cmd)
    setCopied(true)
    setTimeout(() => setCopied(false), 1400)
  }
  return (
    <button onClick={copy} className="block h-full w-full text-left" title="Click to copy">
      <Card className="h-full p-5">
        <div className="flex items-start justify-between gap-3">
          <code className="break-all font-mono text-[13px] font-semibold text-clay-deep">
            {cmd}
          </code>
          <span
            className={`shrink-0 font-mono text-[10px] transition-opacity duration-200 ${
              copied ? 'text-moss opacity-100' : 'text-muted opacity-0 group-hover:opacity-60'
            }`}
          >
            {copied ? '✓ copied' : 'copy'}
          </span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted">{desc}</p>
      </Card>
    </button>
  )
}

export default function Cli() {
  return (
    <Page>
      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden px-6 pb-20 pt-36 sm:pt-44">
        <div aria-hidden className="bg-dots mask-fade-b absolute inset-0 opacity-70" />
        <div
          aria-hidden
          className="absolute left-1/2 top-16 h-[380px] w-[560px] -translate-x-[60%] rounded-full bg-clay/[0.14] blur-3xl animate-aurora-a"
        />
        <Spark className="absolute right-[15%] top-44 hidden h-5 w-5 text-clay/45 animate-sway lg:block" />
        <div className="relative mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-8 flex w-fit items-center gap-2.5 rounded-full border border-clay/40 bg-clay/10 px-4 py-1.5"
          >
            <Spark className="h-3.5 w-3.5 text-clay" />
            <span className="font-mono text-xs text-clay-deep">New · Akorith CLI</span>
          </motion.div>
          <h1 className="font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-6xl">
            <SplitWords text="The Agent OS for" />
            <br />
            <span className="accent-word">
              <SplitWords text="your terminal." delay={0.3} />
            </span>
          </h1>
          <Reveal delay={0.5}>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
              One prompt for <span className="font-medium text-soot">Claude</span>,{' '}
              <span className="font-medium text-soot">Codex</span>, and{' '}
              <span className="font-medium text-soot">OpenCode</span>. Switch models
              mid-session, keep separate threads per provider, and stay local-first — no API
              keys, no proxy, no cloud middleman.
            </p>
          </Reveal>
          <Reveal delay={0.65}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Magnetic>
                <PrimaryButton href={CLI_GITHUB_URL}>View on GitHub</PrimaryButton>
              </Magnetic>
              <Magnetic>
                <GhostButton to="/download">Get the desktop app</GhostButton>
              </Magnetic>
            </div>
          </Reveal>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="relative mx-auto mt-16 max-w-2xl"
        >
          <div aria-hidden className="shot-glow" />
          <CliSession />
        </motion.div>
      </section>

      {/* ===== Install ===== */}
      <section className="border-t border-line bg-cream/40 px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            center
            eyebrow="Install"
            title={
              <>
                One line. <span className="accent-word">Any terminal.</span>
              </>
            }
            lead="Grab it with the install script or npm — then just type akorith anywhere."
          />
          <Stagger className="mt-12 space-y-6" gap={0.15}>
            <StaggerItem>
              <Card className="p-7">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-clay-deep">
                  Install script
                </p>
                <CodeBlock className="mt-4" code="curl -fsSL https://akorith.space/install | bash" />
              </Card>
            </StaggerItem>
            <StaggerItem>
              <Card className="p-7">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-clay-deep">
                  or via npm
                </p>
                <CodeBlock className="mt-4" code={'npm install -g akorith\nakorith'} />
              </Card>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      {/* ===== Commands ===== */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Commands"
            title={
              <>
                A whole crew behind <span className="accent-word">one prompt.</span>
              </>
            }
            lead="Type a task and it goes to the active model. Slash commands steer the session — click any command to copy it."
          />
          <Stagger className="group mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {COMMANDS.map(([cmd, desc]) => (
              <StaggerItem key={cmd}>
                <CommandChip cmd={cmd} desc={desc} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ===== Providers ===== */}
      <section className="border-y border-line bg-cream/40 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Under the hood"
            title={
              <>
                Your CLIs, <span className="accent-word">orchestrated.</span>
              </>
            }
            lead="Akorith drives the agent CLIs you're already signed into. Each provider keeps its own conversation thread for the session — /new resets them all, and your last model choice is remembered in ~/.akorith/cli.json."
          />
          <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROVIDERS.map((p) => (
              <StaggerItem key={p.name}>
                <Card className="h-full p-7">
                  <div className="flex items-center gap-3">
                    <span className={`h-2.5 w-2.5 rounded-full ${p.dot}`} />
                    <h3 className="font-serif text-xl font-semibold text-ink">{p.name}</h3>
                  </div>
                  <p className="mt-1 font-mono text-xs text-muted">{p.provider}</p>
                  <div className="mt-5 space-y-2 font-mono text-[12px]">
                    <p className="text-soot">
                      <span className="text-muted">via </span>
                      {p.via}
                    </p>
                    <p className="text-muted">{p.resume}</p>
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ===== One-shot mode ===== */}
      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
          <div className="min-w-0">
            <SectionHeading
              eyebrow="One-shot mode"
              title={
                <>
                  Scriptable, <span className="accent-word">pipeable.</span>
                </>
              }
              lead="Skip the session entirely — fire a single prompt at any model and get the answer on stdout. Perfect for scripts, git hooks, and CI."
            />
            <Stagger className="mt-8 space-y-4" gap={0.12}>
              {REQUIREMENTS.map(([title, desc]) => (
                <StaggerItem key={title}>
                  <div className="rounded-xl border border-line bg-surface px-5 py-4">
                    <p className="font-mono text-sm font-semibold text-ink">{title}</p>
                    <p className="mt-1 text-sm text-muted">{desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
          <Reveal delay={0.15} className="min-w-0">
            <CodeBlock code={'akorith -p "summarize the diff" -m claude/haiku'} />
            <p className="mt-4 flex items-center gap-2 font-mono text-xs text-muted">
              <Spark className="h-3.5 w-3.5 text-clay" />
              same providers, same threads, zero setup
            </p>
          </Reveal>
        </div>
      </section>

      <CtaSection />
    </Page>
  )
}
