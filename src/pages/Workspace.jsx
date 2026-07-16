import { Page, Reveal, Stagger, StaggerItem, SplitWords } from '../components/motion.jsx'
import { SectionHeading, Card, CtaSection, Spark } from '../components/ui.jsx'
import { DemoPanel } from '../components/demo/AppDemo.jsx'

const FLOW = [
  ['01', 'Understand', 'Loads the selected repository, project memory, attachments, and the exact task you sent.'],
  ['02', 'Work', 'Runs your selected CLI headlessly while readable progress and tool activity stream into chat.'],
  ['03', 'Verify', 'Builds, tests, and inspects the result before the final response is presented.'],
  ['04', 'Report', 'Returns a natural answer with changed files, line totals, elapsed time, and token usage.'],
]

const CAPABILITIES = [
  ['One model at a time', 'Choose Claude, Codex, OpenCode, or Ollama per task. There are no named terminal personas or hidden routing.'],
  ['Project-scoped context', 'Every Workspace chat belongs to one folder, with durable memory and bounded @ file mentions.'],
  ['Plan before editing', 'Switch to read-only Plan mode when you want analysis and a proposed approach without filesystem writes.'],
  ['Queue follow-ups', 'Add the next instruction while a task is running; Akorith keeps request state isolated per chat.'],
  ['Review changes', 'Inspect project changes and stage or unstage one validated relative path without granting commit or push authority.'],
  ['Rich attachments', 'Bring images, PDFs, Markdown, and project files into the same conversation.'],
]

export default function Workspace() {
  return (
    <Page>
      <section className="relative overflow-hidden px-6 pb-20 pt-36 sm:pt-44">
        <div aria-hidden className="bg-dots mask-fade-b absolute inset-0 opacity-70" />
        <Spark className="absolute left-[14%] top-48 hidden h-5 w-5 text-clay/45 animate-sway lg:block" />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="mb-5 flex items-center justify-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.22em] text-clay-deep">
            <Spark className="h-3.5 w-3.5" />
            Project workspace
          </p>
          <h1 className="font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-6xl">
            <SplitWords text="Build in your repo," />
            <br />
            <SplitWords text="without leaving the chat." delay={0.3} gradient />
          </h1>
          <Reveal delay={0.5}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              Workspace gives a selected CLI the project context it needs, then turns its local
              execution into a calm, Codex-style conversation with progress, evidence, and a clear result.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-24">
        <Reveal className="mx-auto max-w-6xl">
          <DemoPanel view="workspace" title="Workspace — interactive product demo" />
        </Reveal>
      </section>

      <section className="border-y border-line bg-cream/40 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="One continuous conversation"
            title={<>From task to verified change, <span className="accent-word">in one thread.</span></>}
            lead="Raw CLI JSON and terminal noise stay in the background. What you see is the work: concise progress, meaningful tool calls, and the final project delta."
          />
          <div className="relative mt-14">
            <div aria-hidden className="absolute left-8 right-8 top-9 hidden h-px bg-line lg:block" />
            <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" gap={0.12}>
              {FLOW.map(([number, name, description]) => (
                <StaggerItem key={name}>
                  <Card className="relative h-full p-7">
                    <span className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-clay/30 bg-clay/10 font-mono text-xs text-clay-deep">
                      {number}
                    </span>
                    <h3 className="relative mt-5 font-serif text-xl font-semibold text-ink">{name}</h3>
                    <p className="relative mt-3 text-sm leading-relaxed text-muted">{description}</p>
                  </Card>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Codex-style controls"
            title={<>Enough control to move fast. <span className="accent-word">Clear boundaries by default.</span></>}
            lead="The current Workspace is project-first, session-isolated, and intentionally direct: select a model, describe the outcome, and follow the work."
          />
          <Stagger className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map(([title, description]) => (
              <StaggerItem key={title}>
                <Card className="h-full p-7">
                  <Spark className="h-4 w-4 text-clay" />
                  <h3 className="mt-4 font-serif text-lg font-semibold text-ink">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{description}</p>
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
