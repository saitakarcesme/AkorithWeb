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
  { step: '01', name: 'Select', desc: 'Build a lineup from available Claude, Codex, OpenCode, Ollama, and local models.' },
  { step: '02', name: 'Challenge', desc: 'Choose one consistent task: token efficiency, test writing, speed, visual work, or repo behavior.' },
  { step: '03', name: 'Battle', desc: 'Akorith runs the same objective benchmark for every selected model and records the evidence.' },
  { step: '04', name: 'Compare', desc: 'The library turns saved runs into a performance matrix, leader, averages, and recent results.' },
]

const PLUGINS = [
  { name: 'Claude', cat: 'Providers', status: 'Available', desc: 'Runs the signed-in Claude CLI directly from Workspace, General Chat, Benchmark, and Loop.' },
  { name: 'OpenAI Codex', cat: 'Providers', status: 'Available', desc: 'Uses your local Codex CLI session for project work without storing an API key.' },
  { name: 'OpenCode', cat: 'Providers', status: 'Available', desc: 'Exposes installed OpenCode models with project-scoped, streamed execution.' },
  { name: 'Git + Git LFS', cat: 'Developer tools', status: 'Available', desc: 'Adds repository inspection and large-file capabilities while preserving Akorith’s no-push boundary.' },
  { name: 'Pandoc + Poppler', cat: 'Documents', status: 'Available', desc: 'Detects local document and PDF tooling for tasks that need conversion or inspection.' },
  { name: 'FFmpeg + ImageMagick', cat: 'Media', status: 'Available', desc: 'Surfaces audited local media tools through capability hints and static diagnostics.' },
]

const WORKBENCH_POINTS = [
  ['Multi-project sidebar', 'Keep every repo one click away, each with its own chats and context.'],
  ['Direct project editing', 'Select one model, describe the outcome, and follow the work inside a Codex-style project thread.'],
  ['Plans and attachments', 'Use read-only Plan mode or attach images, PDFs, Markdown, and bounded @ project files.'],
  ['Durable project memory', 'Each project keeps its own chat history and summarized context without leaking running state.'],
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
            <SplitWords text="not another chat box." delay={0.3} gradient />
          </h1>
          <Reveal delay={0.5}>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
              Workspace, Loop, Dashboard, Benchmark, and Plugins — the current Akorith workflow
              in one local desktop app.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== Workbench ===== */}
      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Workspace"
              title={
                <>
                  Every project, every model, <span className="accent-word">one window.</span>
                </>
              }
              lead="Workspace is home base: choose a project and one model, then plan, edit, verify, and review changes in the same conversation."
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

      {/* ===== Benchmark ===== */}
      <section className="border-y border-line bg-cream/40 px-6 py-24">
        <div className="relative mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Benchmark"
            title={
              <>
                Compare models with <span className="accent-word">the same challenge.</span>
              </>
            }
            lead="Mix local and cloud models, run one objective challenge, and keep every result in a visual performance library."
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
              lead="Configure providers, appearance, project workflow, telemetry, updates, and safe local data behavior without a wall of unused controls."
            />
            <Stagger className="mt-8 space-y-4" gap={0.1}>
              {[
                ['Two 53-week activity maps', 'Compare local token work with the public @saitakarcesme GitHub contribution calendar directly below it.'],
                ['Compute history', 'See live CPU history on Apple Silicon plus detected local and connected GPU hardware.'],
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
            lead="Provider CLIs and audited local tools are detected with static version checks, authentic product identity, and no automatic installation."
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
