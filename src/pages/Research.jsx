import { motion } from 'framer-motion'
import { Page, Reveal, Stagger, StaggerItem, SplitWords } from '../components/motion.jsx'
import {
  SectionHeading,
  Card,
  CtaSection,
  PrimaryButton,
  GhostButton,
  Spark,
  GITHUB_URL,
} from '../components/ui.jsx'
import { DemoPanel } from '../components/demo/AppDemo.jsx'

const DEPTHS = [
  ['Quick search', '~10 min', 'Find the strongest available sources and return a concise, cited answer.'],
  ['Research', '~1 hour', 'Plan multiple search passes, compare evidence, and build a structured report.'],
  ['Deep research', '10+ hours', 'Keep widening coverage, resolving conflicts, and improving the final artifact.'],
  ['Continuous', 'Until paused', 'Continue watching the subject, revising claims, and publishing new report revisions.'],
]

const FLOW = [
  ['01', 'Plan', 'Translate the request, depth, model, and output format into a durable research plan.'],
  ['02', 'Discover', 'Search broadly, follow useful references, and deduplicate repeated material.'],
  ['03', 'Verify', 'Cross-check claims against the source ledger and surface uncertainty instead of hiding it.'],
  ['04', 'Synthesize', 'Turn the evidence into a readable report with citations, sections, and a designed cover.'],
  ['05', 'Publish', 'Export PDF, DOCX, Markdown, or XLSX and keep every revision in the Research library.'],
]

const OUTPUTS = [
  ['PDF', 'A4 report', 'A designed cover, readable chapters, source notes, and a final downloadable document.'],
  ['DOCX', 'Editable brief', 'A structured Word document ready for review, comments, and further editing.'],
  ['Markdown', 'Portable source', 'A clean, version-friendly report with headings, links, and inline citations.'],
  ['XLSX', 'Evidence workbook', 'Summary, claims, sources, and metrics organized into focused spreadsheet tabs.'],
]

const LIBRARY_BOOKS = [
  ['Frontier Model Atlas', 'Deep research · PDF', 'from-violet-500/55 via-[#25222f] to-emerald-500/25'],
  ['Local Coding Models', 'Research · XLSX', 'from-emerald-500/45 via-[#202a27] to-violet-500/20'],
  ['Agent Interface Patterns', 'Quick search · DOCX', 'from-sky-500/35 via-[#22242b] to-violet-500/35'],
]

export default function Research() {
  return (
    <Page>
      <section className="relative overflow-hidden px-6 pb-20 pt-36 sm:pt-44">
        <div aria-hidden className="bg-dots mask-fade-b absolute inset-0 opacity-70" />
        <div aria-hidden className="absolute left-1/2 top-20 h-72 w-[38rem] -translate-x-1/2 rounded-full bg-clay/[0.13] blur-3xl" />
        <Spark className="absolute left-[15%] top-52 hidden h-5 w-5 text-clay/45 animate-sway lg:block" />
        <Spark className="absolute right-[14%] top-40 hidden h-7 w-7 text-moss/30 animate-sway lg:block" />

        <div className="relative mx-auto max-w-4xl text-center">
          <p className="mb-5 flex items-center justify-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.22em] text-clay-deep">
            <Spark className="h-3.5 w-3.5" />
            Autonomous research
          </p>
          <h1 className="font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-6xl">
            <SplitWords text="Leave the question." />
            <br />
            <SplitWords text="Come back to the evidence." delay={0.3} gradient />
          </h1>
          <Reveal delay={0.5}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              Choose a model, depth, and deliverable. Akorith plans the investigation, gathers and
              verifies sources, then keeps working locally until your cited report is ready.
            </p>
          </Reveal>
          <Reveal delay={0.65}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <PrimaryButton to="/download">Start researching</PrimaryButton>
              <GhostButton href={GITHUB_URL}>Read the source</GhostButton>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="research-demo" className="px-6 pb-24">
        <Reveal className="mx-auto max-w-6xl">
          <DemoPanel view="research" title="Research — interactive product demo" />
        </Reveal>
      </section>

      <section className="border-y border-line bg-cream/40 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Research depth"
            title={<>A ten-minute answer or a <span className="accent-word">ten-hour investigation.</span></>}
            lead="Depth is an explicit operating mode, not a vague quality setting. Pick the time horizon that matches the decision in front of you."
          />
          <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" gap={0.1}>
            {DEPTHS.map(([name, duration, description]) => (
              <StaggerItem key={name}>
                <Card className="h-full p-7">
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-clay-deep">{duration}</p>
                  <h3 className="mt-3 font-serif text-xl font-semibold text-ink">{name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{description}</p>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="The research run"
            title={<>Every claim keeps a path back to <span className="accent-word">its source.</span></>}
            lead="Research is durable and inspectable. The plan, live progress, source ledger, report revisions, and exported artifacts stay together in one tab."
          />
          <div className="relative mt-14">
            <div aria-hidden className="absolute left-8 right-8 top-9 hidden h-px bg-line lg:block" />
            <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5" gap={0.1}>
              {FLOW.map(([number, name, description]) => (
                <StaggerItem key={name}>
                  <Card className="relative h-full p-6">
                    <span className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-clay/30 bg-clay/10 font-mono text-xs text-clay-deep">
                      {number}
                    </span>
                    <h3 className="relative mt-5 font-serif text-lg font-semibold text-ink">{name}</h3>
                    <p className="relative mt-3 text-sm leading-relaxed text-muted">{description}</p>
                  </Card>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-cream/40 px-6 py-24">
        <div className="mx-auto grid max-w-7xl items-start gap-16 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <SectionHeading
              eyebrow="Deliverables"
              title={<>Choose the artifact that fits <span className="accent-word">the work.</span></>}
              lead="The output is part of the research plan from the start, so structure and evidence are shaped for the final format instead of pasted in at the end."
            />
            <Stagger className="mt-8 grid gap-4 sm:grid-cols-2" gap={0.08}>
              {OUTPUTS.map(([format, label, description]) => (
                <StaggerItem key={format}>
                  <div className="h-full rounded-xl border border-line bg-surface p-5">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-serif text-lg font-semibold text-ink">{format}</h3>
                      <span className="rounded-full border border-line px-2.5 py-1 font-mono text-[10px] text-muted">{label}</span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{description}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <Reveal delay={0.15}>
            <div>
              <p className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-clay-deep">Research library</p>
              <h2 className="mt-3 font-serif text-3xl font-semibold text-ink">A bookshelf for finished thinking.</h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
                Every run keeps its cover, status, depth, sources, and latest export. Open an old report,
                continue a paused investigation, or publish a new revision from the same library entry.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {LIBRARY_BOOKS.map(([title, meta, gradient], index) => (
                  <motion.div key={title} whileHover={{ y: -6 }} className="min-w-0">
                    <div className={`flex aspect-[210/297] flex-col rounded-xl border border-white/10 bg-gradient-to-br ${gradient} p-4 shadow-[0_22px_40px_-24px_rgba(0,0,0,0.9)]`}>
                      <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/45">Akorith Research</p>
                      <p className="mt-8 break-words font-serif text-sm font-semibold leading-snug text-white sm:text-base">{title}</p>
                      <p className="mt-auto pt-3 font-mono text-[8px] text-white/45">REV 0{index + 1}</p>
                    </div>
                    <p className="mt-3 truncate text-sm font-semibold text-ink">{title}</p>
                    <p className="mt-1 truncate font-mono text-[10px] text-muted">{meta}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaSection />
    </Page>
  )
}
