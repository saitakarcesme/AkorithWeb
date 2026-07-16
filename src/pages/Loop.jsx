import { motion } from 'framer-motion'
import { Page, Reveal, Stagger, StaggerItem, SplitWords } from '../components/motion.jsx'
import {
  SectionHeading,
  CtaSection,
  PrimaryButton,
  GhostButton,
  Spark,
  GITHUB_URL,
} from '../components/ui.jsx'

const CYCLE = [
  { name: 'Understand', desc: 'Turn the request, project, and attachments into one explicit definition of done.' },
  { name: 'Plan', desc: 'Choose the next bounded action that moves the durable goal forward.' },
  { name: 'Execute', desc: 'Run the selected CLI against the chosen directory and record meaningful progress.' },
  { name: 'Analyze', desc: 'Inspect evidence, outputs, tests, and remaining work instead of assuming success.' },
  { name: 'Replan', desc: 'If the goal is not reached, feed the analysis into the next focused plan.' },
]

const TERMINAL_LINES = [
  { text: 'Goal · redesign the blog and verify every route', color: 'text-ink/85' },
  { text: 'Cycle 2 · Analyze', color: 'text-ink/45' },
  { text: '✓ Homepage and article layout implemented', color: 'text-emerald-400' },
  { text: '○ Mobile navigation still needs visual verification', color: 'text-ink/70' },
  { text: '↩ returning to Plan with the remaining evidence', color: 'text-violet-300' },
  { text: 'Next · verify 375 px layout, then run the production build', color: 'text-sky-300' },
]

const GUARANTEES = [
  {
    title: 'Evidence before completion',
    desc: 'A Goal finishes only when its definition of done is supported by the work and verification evidence.',
  },
  {
    title: 'Any selected CLI',
    desc: 'Use Claude, Codex, OpenCode, or Ollama. Paste a GitHub repository URL and Akorith clones it into a managed Goal workspace.',
  },
  {
    title: 'Concurrent durable goals',
    desc: 'Keep multiple Loop tabs, resume each goal independently, and preserve its phase, cycle, evidence, and elapsed time.',
  },
]

function GoalCycleDiagram() {
  return (
    <div className="mt-14 overflow-hidden rounded-[1.5rem] border border-line bg-surface p-5 sm:p-8">
      <div className="relative mx-auto hidden aspect-[3.25/1] max-w-5xl md:block">
        <svg className="absolute inset-0 h-full w-full text-muted/55" viewBox="0 0 1000 310" fill="none" aria-hidden>
          <defs>
            <marker id="web-loop-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0 0 8 4 0 8Z" fill="currentColor" />
            </marker>
          </defs>
          <path d="M170 72H314M434 72H578M638 104V205M578 236H434" stroke="currentColor" markerEnd="url(#web-loop-arrow)" />
          <path d="M374 205V105" stroke="#8f6ae0" strokeDasharray="7 7" markerEnd="url(#web-loop-arrow)" />
          <path d="M698 236H826" stroke="#34c08b" markerEnd="url(#web-loop-arrow)" />
        </svg>
        {CYCLE.map((step, index) => {
          const positions = ['left-[5%] top-[9%]', 'left-[31%] top-[9%]', 'left-[57%] top-[9%]', 'left-[57%] top-[63%]', 'left-[31%] top-[63%]']
          return (
            <motion.div
              key={step.name}
              whileHover={{ y: -3 }}
              className={`absolute w-[18%] rounded-xl border border-line bg-paper p-4 ${positions[index]}`}
            >
              <span className="font-mono text-[10px] text-clay-deep">0{index + 1}</span>
              <p className="mt-1 font-serif text-base font-semibold text-ink">{step.name}</p>
            </motion.div>
          )
        })}
        <div className="absolute left-[83%] top-[63%] w-[14%] rounded-xl border border-moss/40 bg-moss/10 p-4">
          <span className="font-mono text-[10px] text-moss">✓</span>
          <p className="mt-1 font-serif text-base font-semibold text-moss">Complete</p>
        </div>
        <span className="absolute left-[44%] top-[58%] font-mono text-[9px] text-muted">goal not reached</span>
        <span className="absolute left-[72%] top-[71%] font-mono text-[9px] text-moss">goal reached</span>
      </div>
      <div className="space-y-3 md:hidden">
        {CYCLE.map((step, index) => (
          <div key={step.name}>
            <div className="flex items-center gap-3 rounded-xl border border-line bg-paper p-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-clay/10 font-mono text-xs text-clay-deep">0{index + 1}</span>
              <div><p className="font-serif font-semibold text-ink">{step.name}</p><p className="mt-0.5 text-xs text-muted">{step.desc}</p></div>
            </div>
            {index < CYCLE.length - 1 && <p className="py-1 text-center text-muted">↓</p>}
          </div>
        ))}
        <div className="rounded-xl border border-moss/40 bg-moss/10 p-4 text-center font-serif font-semibold text-moss">Goal reached → Complete</div>
        <p className="text-center font-mono text-[10px] text-clay-deep">not reached ↺ return to Plan</p>
      </div>
    </div>
  )
}

export default function Loop() {
  return (
    <Page>
      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden px-6 pb-24 pt-36 sm:pt-44">
        <div aria-hidden className="bg-dots mask-fade-b absolute inset-0 opacity-70" />
        <Spark className="absolute left-[16%] top-56 hidden h-5 w-5 text-clay/45 animate-sway lg:block" />
        <Spark className="absolute right-[13%] top-40 hidden h-7 w-7 text-clay/30 animate-sway lg:block" />

        <div className="relative mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-line bg-surface shadow-sm"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-8 w-8 animate-spin-slow text-clay"
            >
              <path d="M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>

          <h1 className="font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-6xl">
            <SplitWords text="One goal," />{' '}
            <SplitWords text="kept alive" delay={0.25} gradient />
            <br />
            <SplitWords text="until it is done." delay={0.5} />
          </h1>
          <Reveal delay={0.6}>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
              Loop is Akorith's durable Goal mode. Give it a project or GitHub repository and a concrete outcome;
              it understands, plans, executes, analyzes, and replans until the evidence says done.
            </p>
          </Reveal>
          <Reveal delay={0.75}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <PrimaryButton to="/download">Start looping</PrimaryButton>
              <GhostButton href={GITHUB_URL}>Read the source</GhostButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== The cycle ===== */}
      <section className="border-y border-line bg-cream/40 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="The cycle"
            title={
              <>
                Understand → Plan → Execute → <span className="accent-word">Analyze.</span>
              </>
            }
            lead="Analyze either exits to Complete or returns through Replan. The cycle is explicit, durable, and visible while it runs."
          />
          <GoalCycleDiagram />
        </div>
      </section>

      {/* ===== Terminal demo ===== */}
      <section className="px-6 py-24">
        <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Watch it work"
              title={
                <>
                  Visible phases. Real evidence. <span className="accent-word">A clear finish.</span>
                </>
              }
              lead="Loop keeps the calm chat language of Workspace, adds a compact phase rail, and narrates every durable step with a title and a short explanation. Verified GitHub Loops checkpoint and push to their origin."
            />
            <Stagger className="mt-8 space-y-4" gap={0.12}>
              {GUARANTEES.map((g) => (
                <StaggerItem key={g.title}>
                  <div className="rounded-xl border border-line bg-surface px-5 py-4">
                    <p className="font-semibold text-ink">{g.title}</p>
                    <p className="mt-1 text-sm text-muted">{g.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          {/* animated terminal */}
          <Reveal delay={0.15}>
            <div className="overflow-hidden rounded-2xl border border-ink/15 bg-night shadow-[0_30px_70px_-24px_rgba(40,32,58,0.45)]">
              <div className="border-b border-white/[0.07] bg-night-soft px-4 py-2.5">
                <span className="font-mono text-[11px] text-ink/50">akorith loop — zsh</span>
              </div>
              <motion.div
                className="space-y-2.5 p-6 font-mono text-[13px] leading-relaxed"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-80px' }}
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.45 } } }}
              >
                {TERMINAL_LINES.map((line, i) => (
                  <motion.p
                    key={i}
                    className={line.color}
                    variants={{
                      hidden: { opacity: 0, x: -8 },
                      show: { opacity: 1, x: 0, transition: { duration: 0.35 } },
                    }}
                  >
                    {line.text}
                  </motion.p>
                ))}
                <motion.span
                  className="inline-block h-4 w-2 bg-violet-400"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ repeat: Infinity, duration: 1.1 }}
                />
              </motion.div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== Philosophy strip ===== */}
      <section className="border-t border-line px-6 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <Spark className="mx-auto mb-6 h-6 w-6 text-clay" />
            <p className="font-serif text-2xl font-medium leading-relaxed text-ink sm:text-3xl">
              “A long task should not disappear into a spinner.{' '}
              <span className="accent-word">Loop makes the reasoning cycle visible</span> — and
              keeps returning until the outcome is real.”
            </p>
          </Reveal>
        </div>
      </section>

      <CtaSection />
    </Page>
  )
}
