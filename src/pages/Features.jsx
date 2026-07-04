import { Page, Reveal, Stagger, StaggerItem, SplitWords } from '../components/motion.jsx'
import {
  SectionHeading,
  Card,
  CtaSection,
  Spark,
} from '../components/ui.jsx'
import { WorkbenchMock, TestLabMock } from '../components/mocks.jsx'
import { DemoPanel } from '../components/demo/AppDemo.jsx'

const TESTLAB_STEPS = [
  { step: '01', name: 'Detect', desc: 'Akorith scans the benchmark codebase and understands its stack and structure.' },
  { step: '02', name: 'Generate', desc: 'Each selected local model receives the identical prompt, file path, and runner.' },
  { step: '03', name: 'Run', desc: 'Generated tests execute inside a fresh, disposable temp sandbox — never in your repo.' },
  { step: '04', name: 'Score', desc: 'Results are scored side by side and exported as a shareable PDF report.' },
]

const PLUGINS = [
  { name: 'OpenCode Agent (Gaia)', cat: 'Agents', status: 'Available', desc: 'Routes prompts to the Gaia terminal with output captured and summarized into chat.' },
  { name: 'GitHub Workbench', cat: 'Integrations', status: 'Available', desc: 'Pull requests, issues, and checks as a read-first workbench panel via the gh CLI.' },
  { name: 'Browser / Chrome Automation', cat: 'Browser', status: 'Available', desc: 'Controlled browser tasks for research and web-app testing — permission-gated.' },
  { name: 'Remote Ollama Telemetry', cat: 'Telemetry', status: 'Preview', desc: 'Reports remote GPU and VRAM so the Dashboard can show off-machine runtimes.' },
  { name: 'Hermes Memory / Skills', cat: 'Memory', status: 'Planned', desc: 'Durable memory and reusable skills shared across chats, projects, and missions.' },
  { name: 'Chroma Memory', cat: 'Memory', status: 'Preview', desc: 'Vector memory backend for mission, skill, and project memory with semantic search.' },
]

const WORKBENCH_POINTS = [
  ['Multi-project sidebar', 'Keep every repo one click away, each with its own chats and context.'],
  ['Direct model chat', 'Ask any provider or local model directly — Enter to send, memory on by default.'],
  ['Image understanding', 'Drop PNG, JPEG, WebP, or GIF straight into the conversation.'],
  ['Session memory', 'Conversations are summarized automatically so context survives restarts.'],
]

const statusColor = {
  Available: 'text-moss border-moss/30 bg-moss/10',
  Preview: 'text-clay-deep border-clay/30 bg-clay/10',
  Planned: 'text-muted border-line bg-cream/60',
}

export default function Features() {
  return (
    <Page>
      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden px-6 pb-20 pt-36 sm:pt-44">
        <div aria-hidden className="bg-dots mask-fade-b absolute inset-0 opacity-70" />
        <Spark className="absolute right-[16%] top-44 hidden h-5 w-5 text-clay/45 animate-sway lg:block" />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="mb-5 flex items-center justify-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.22em] text-clay-deep">
            <Spark className="h-3.5 w-3.5" />
            Features
          </p>
          <h1 className="font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-6xl">
            <SplitWords text="A full cockpit," />
            <br />
            <span className="accent-word">
              <SplitWords text="not another chat box." delay={0.3} />
            </span>
          </h1>
          <Reveal delay={0.5}>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
              Workbench, Dashboard, Test Lab, and Plugins — everything you need to run serious
              AI work from one desktop app.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== Workbench ===== */}
      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Workbench"
              title={
                <>
                  Every project, every model, <span className="accent-word">one window.</span>
                </>
              }
              lead="The Workbench is home base: pick a model, start a conversation, attach a project, and let Akorith keep the memory."
            />
            <Stagger className="mt-8 space-y-4" gap={0.1}>
              {WORKBENCH_POINTS.map(([title, desc]) => (
                <StaggerItem key={title}>
                  <div className="rounded-xl border border-line bg-surface px-5 py-4">
                    <p className="font-semibold text-ink">{title}</p>
                    <p className="mt-1 text-sm text-muted">{desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
          <Reveal delay={0.15}>
            <WorkbenchMock />
          </Reveal>
        </div>
      </section>

      {/* ===== Test Lab ===== */}
      <section className="border-y border-line bg-cream/40 px-6 py-24">
        <div className="relative mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Model Test Lab"
            title={
              <>
                Benchmark local models <span className="accent-word">on your codebase.</span>
              </>
            }
            lead="Stop guessing which Ollama model to trust. Test Lab pits them against the same generated-test task in a sandbox and hands you a scored PDF."
          />
          <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TESTLAB_STEPS.map((s) => (
              <StaggerItem key={s.step}>
                <Card className="h-full p-7">
                  <p className="font-serif text-3xl font-medium text-clay">{s.step}</p>
                  <h3 className="mt-3 font-serif text-xl font-semibold text-ink">{s.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{s.desc}</p>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal delay={0.2} className="mx-auto mt-14 max-w-3xl">
            <TestLabMock />
          </Reveal>
        </div>
      </section>

      {/* ===== Settings / control room ===== */}
      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
          <Reveal className="order-2 lg:order-1">
            <DemoPanel view="settings" title="Settings — live demo, click around" />
          </Reveal>
          <div className="order-1 lg:order-2">
            <SectionHeading
              eyebrow="Control room"
              title={
                <>
                  Usage limits you define. <span className="accent-word">Telemetry you own.</span>
                </>
              }
              lead="Enter your plan's Claude or Codex limits and Akorith compares them against its locally recorded usage — because the CLIs won't tell you. GPU and VRAM telemetry included."
            />
            <Stagger className="mt-8 space-y-4" gap={0.1}>
              {[
                ['270-day activity heatmap', 'GitHub-style view of every active day, send, and peak.'],
                ['Provider mix', 'See exactly how tokens split across Claude, Codex, and local models.'],
                ['Light & dark themes', 'A native-feeling Electron app that respects your aesthetic.'],
                ['In-app source updater', 'Keep your checkout current with upstream from inside the app.'],
              ].map(([title, desc]) => (
                <StaggerItem key={title}>
                  <div className="rounded-xl border border-line bg-surface px-5 py-4">
                    <p className="font-semibold text-ink">{title}</p>
                    <p className="mt-1 text-sm text-muted">{desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* ===== Plugins ===== */}
      <section className="border-t border-line px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Plugins"
            title={
              <>
                Extend <span className="accent-word">the OS.</span>
              </>
            }
            lead="Agents, integrations, telemetry, memory, browser automation — a growing plugin surface built on a read-only foundation, where nothing executes without you."
          />
          <Stagger className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PLUGINS.map((p) => (
              <StaggerItem key={p.name}>
                <Card className="flex h-full flex-col p-7">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-serif text-lg font-semibold leading-snug text-ink">
                      {p.name}
                    </h3>
                    <span
                      className={`shrink-0 rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider ${statusColor[p.status]}`}
                    >
                      {p.status}
                    </span>
                  </div>
                  <p className="mt-1 font-mono text-xs text-muted/80">{p.cat}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{p.desc}</p>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal delay={0.2} className="mx-auto mt-14 max-w-5xl">
            <DemoPanel view="plugins" title="Plugins — live demo, filter the grid" />
          </Reveal>
        </div>
      </section>

      <CtaSection />
    </Page>
  )
}
