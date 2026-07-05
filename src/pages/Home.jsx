import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Page, Reveal, Stagger, StaggerItem, SplitWords, CountUp, Magnetic, Parallax } from '../components/motion.jsx'
import { AppDemo } from '../components/demo/AppDemo.jsx'
import { InstallTerminal } from '../components/demo/InstallTerminal.jsx'
import {
  PrimaryButton,
  GhostButton,
  SectionHeading,
  Card,
  CodeBlock,
  Marquee,
  CtaSection,
  Spark,
  GITHUB_URL,
  CLI_GITHUB_URL,
} from '../components/ui.jsx'
import { TerminalsMock, DashboardMock } from '../components/mocks.jsx'
import { CliSession } from '../components/demo/CliTerminal.jsx'
import { AkMark } from '../components/Logo.jsx'

const MODELS = [
  'Claude Fable 5',
  'GPT-5.5 Codex',
  'OpenCode',
  'qwen3.5:9b',
  'gemma3:12b',
  'llama3.1:8b',
  'deepseek-r1:8b',
  'phi4:14b',
  'mistral:latest',
  'qwen3-coder:30b',
  'hermes3:8b',
  'qwen2.5-coder:7b',
]

const PILLARS = [
  {
    to: '/loop',
    name: 'Loop',
    tag: 'Autonomous builder',
    desc: 'Point Loop at a repository and let local models grow it over time — every change validated before it is committed.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
        <path d="M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    to: '/agents',
    name: 'Companions',
    tag: 'Long-memory minds',
    desc: 'Athena and Zeus think with you and remember your goals across sessions — but never touch your files.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
        <path d="M12 21s-7-4.6-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.4-7 10-7 10Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    to: '/agents',
    name: 'Agents',
    tag: 'Actions with guardrails',
    desc: 'Reusable local shortcuts — organize folders, audit repos, write changelogs — behind an explicit permission policy.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
        <path d="M13 2 4.5 12.5H11L9.5 22 19 10h-6.5L13 2Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

const PRIVACY = [
  {
    title: 'Zero keys stored',
    desc: 'Akorith rides your existing CLI logins — claude, codex, opencode. No API keys ever touch its config.',
  },
  {
    title: 'Local SQLite',
    desc: 'Chats, memory, and usage stats live in a single local database file. Delete it and it is gone.',
  },
  {
    title: 'Every action logged',
    desc: 'Nothing destructive runs silently. Agents log each step and ask before writing outside their sandbox.',
  },
  {
    title: 'Your GPU, your models',
    desc: 'Run fully offline with Ollama. Loop, Benchmark, and Companions work without a single network call.',
  },
]

export default function Home() {
  return (
    <Page>
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden px-6 pb-24 pt-36 sm:pt-44">
        <div aria-hidden className="bg-dots mask-fade-b absolute inset-0 opacity-70" />
        {/* drifting aurora glow */}
        <div
          aria-hidden
          className="absolute left-1/2 top-10 h-[420px] w-[620px] -translate-x-[70%] rounded-full bg-clay/[0.16] blur-3xl animate-aurora-a"
        />
        <div
          aria-hidden
          className="absolute left-1/2 top-32 h-[360px] w-[520px] -translate-x-[10%] rounded-full bg-moss/[0.10] blur-3xl animate-aurora-b"
        />
        {/* quiet sparks */}
        <Spark className="absolute left-[12%] top-40 hidden h-6 w-6 text-clay/50 animate-sway lg:block" />
        <Spark className="absolute right-[14%] top-64 hidden h-4 w-4 text-clay/35 animate-sway lg:block" />

        <div className="relative mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-8 flex w-fit items-center gap-2.5 rounded-full border border-line bg-surface px-4 py-1.5 shadow-sm"
          >
            <Spark className="h-3.5 w-3.5 text-clay" />
            <span className="font-mono text-xs text-muted">Local-first · Open source · Electron</span>
          </motion.div>

          <h1 className="font-serif text-5xl font-semibold leading-[1.06] tracking-tight text-ink sm:text-6xl lg:text-7xl">
            <SplitWords text="The Agent OS for" />
            <br />
            <SplitWords text="your desktop." delay={0.35} gradient />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl"
          >
            Akorith orchestrates <span className="font-medium text-ink">Claude</span>,{' '}
            <span className="font-medium text-ink">Codex</span>,{' '}
            <span className="font-medium text-ink">OpenCode</span>, and local{' '}
            <span className="font-medium text-ink">Ollama</span> models in one workspace — chats,
            autonomous loops, benchmarks, and agents that act only with your permission.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Magnetic>
              <PrimaryButton to="/download">Download for macOS</PrimaryButton>
            </Magnetic>
            <Magnetic>
              <GhostButton href={GITHUB_URL}>View on GitHub</GhostButton>
            </Magnetic>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-6 font-mono text-xs text-muted/80"
          >
            git clone → npm install → npm run dev
          </motion.p>
        </div>

        {/* hero: install it, type akorith, watch it boot */}
        <motion.div
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 1.1, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="relative mx-auto mt-20 max-w-2xl"
        >
          <Parallax distance={30}>
            <div className="relative">
              <div aria-hidden className="shot-glow" />
              <InstallTerminal />
            </div>
          </Parallax>
        </motion.div>
      </section>

      {/* ================= MARQUEE ================= */}
      <section className="border-y border-line bg-cream/50 py-10">
        <Reveal>
          <p className="mb-6 text-center font-mono text-xs uppercase tracking-[0.3em] text-muted">
            One workspace · every model
          </p>
        </Reveal>
        <Marquee items={MODELS} />
      </section>

      {/* ================= PILLARS ================= */}
      <section className="px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="The three pillars"
            title={
              <>
                Think. Remember. <span className="accent-word">Act.</span>
              </>
            }
            lead="Akorith splits AI work into pieces you can actually trust — a builder that proves its work, minds that keep context, and hands that ask first."
          />
          <Stagger className="mt-14 grid gap-6 md:grid-cols-3">
            {PILLARS.map((p, i) => (
              <StaggerItem key={p.name}>
                <Link to={p.to} className="block h-full">
                  <Card className="group h-full p-8">
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-clay/10 text-clay transition-transform duration-300 group-hover:scale-110">
                        {p.icon}
                      </div>
                      <span className="font-serif text-4xl font-medium text-line">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-muted">
                      {p.tag}
                    </p>
                    <h3 className="mt-2 font-serif text-2xl font-semibold text-ink">{p.name}</h3>
                    <p className="mt-3 leading-relaxed text-muted">{p.desc}</p>
                    <p className="mt-6 text-sm font-semibold text-clay transition-transform duration-300 group-hover:translate-x-1">
                      Learn more →
                    </p>
                  </Card>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ================= LIVE DEMO ================= */}
      <section className="relative overflow-hidden border-t border-line bg-cream/40 px-6 py-28">
        <div
          aria-hidden
          className="absolute -left-32 top-24 h-80 w-80 rounded-full bg-clay/[0.10] blur-3xl animate-aurora-a"
        />
        <div className="relative mx-auto max-w-6xl">
          <SectionHeading
            center
            eyebrow="Try it right here"
            title={
              <>
                Don't take screenshots' word — <span className="accent-word">click around.</span>
              </>
            }
            lead="This is a living replica of the app. Switch tabs in the sidebar, filter the plugins, poke the settings — even type in the chat. When you want the real engine, it's one command away."
          />
          <Reveal delay={0.15} className="relative mt-14">
            <div aria-hidden className="shot-glow" />
            <AppDemo />
          </Reveal>
        </div>
      </section>

      {/* ================= TERMINALS ================= */}
      <section className="border-t border-line px-6 py-28">
        <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Multi-agent workspace"
              title={
                <>
                  Three terminals. One task.{' '}
                  <span className="accent-word">Zero tab-switching.</span>
                </>
              }
              lead="Type a task once and Akorith plans it, then drives Olympus (Codex), Gaia (OpenCode), and Atlantis (Claude) side by side — with live output, summaries, and full session memory."
            />
            <Stagger className="mt-8 space-y-4" gap={0.12}>
              {[
                ['Olympus', 'OpenAI Codex terminal — heavyweight code generation'],
                ['Gaia', 'OpenCode terminal — fast open-source agent runs'],
                ['Atlantis', 'Claude terminal — deep reasoning and review'],
              ].map(([name, desc]) => (
                <StaggerItem key={name}>
                  <div className="flex items-center gap-4 rounded-xl border border-line bg-surface px-5 py-4">
                    <Spark className="h-3.5 w-3.5 shrink-0 text-clay" />
                    <div>
                      <span className="font-mono text-sm font-semibold text-ink">{name}</span>
                      <span className="ml-3 text-sm text-muted">{desc}</span>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
          <Reveal delay={0.15}>
            <TerminalsMock />
          </Reveal>
        </div>
      </section>

      {/* ================= DASHBOARD / STATS ================= */}
      <section className="border-t border-line bg-cream/40 px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <Reveal className="order-2 lg:order-1">
              <DashboardMock />
            </Reveal>
            <div className="order-1 lg:order-2">
              <SectionHeading
                eyebrow="Dashboard"
                title={
                  <>
                    Know exactly where <span className="accent-word">every token</span> goes.
                  </>
                }
                lead="An activity heatmap, provider mix, daily usage, and GPU telemetry — recorded locally, compared against the limits you set. No vendor dashboard required."
              />
              <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                {[
                  { to: 1.1, decimals: 1, suffix: 'M', label: 'tokens tracked' },
                  { to: 3, suffix: '', label: 'cloud providers' },
                  { to: 20, suffix: '+', label: 'local models' },
                  { to: 0, suffix: '', label: 'API keys stored' },
                ].map((s) => (
                  <div key={s.label} className="border-l-2 border-clay/40 pl-4">
                    <p className="font-serif text-4xl font-semibold tracking-tight text-ink">
                      <CountUp to={s.to} suffix={s.suffix} decimals={s.decimals ?? 0} />
                    </p>
                    <p className="mt-1 text-sm text-muted">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CLI ================= */}
      <section className="relative overflow-hidden border-t border-line px-6 py-28">
        <div
          aria-hidden
          className="absolute -right-32 top-10 h-72 w-72 rounded-full bg-clay/[0.12] blur-3xl animate-aurora-b"
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
          <div>
            <Reveal>
              <p className="mb-5 flex w-fit items-center gap-2 rounded-full border border-clay/40 bg-clay/10 px-4 py-1.5 font-mono text-xs text-clay-deep">
                <Spark className="h-3.5 w-3.5 text-clay" />
                New · Akorith CLI
              </p>
            </Reveal>
            <SectionHeading
              eyebrow=""
              title={
                <>
                  The same crew, now in <span className="accent-word">your terminal.</span>
                </>
              }
              lead="One prompt for Claude, Codex, and OpenCode — switch models mid-session with /model, keep a thread per provider, and script it with one-shot mode. No API keys, ever."
            />
            <Reveal delay={0.15}>
              <CodeBlock className="mt-8" code="curl -fsSL https://akorith.space/install | bash" />
            </Reveal>
            <Reveal delay={0.25}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <PrimaryButton to="/cli">Meet the CLI</PrimaryButton>
                <GhostButton href={CLI_GITHUB_URL}>CLI on GitHub</GhostButton>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <div className="relative">
              <div aria-hidden className="shot-glow" />
              <CliSession />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= PRIVACY ================= */}
      <section className="border-t border-line px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <div className="mx-auto mb-6 w-fit rounded-2xl border border-line bg-surface p-3 shadow-sm">
                <AkMark className="h-8 w-8" tone="clay" />
              </div>
            </Reveal>
            <SectionHeading
              center
              eyebrow="Local-first by design"
              title={
                <>
                  Nothing leaves <span className="accent-word">your machine.</span>
                </>
              }
              lead="Akorith is an orchestrator, not a middleman. It never proxies your traffic, never stores credentials, and never phones home."
            />
          </div>
          <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PRIVACY.map((item) => (
              <StaggerItem key={item.title}>
                <Card className="h-full p-7">
                  <Spark className="h-4 w-4 text-clay" />
                  <h3 className="mt-4 font-serif text-lg font-semibold text-ink">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{item.desc}</p>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CtaSection />
    </Page>
  )
}
