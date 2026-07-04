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

const CYCLE = [
  { name: 'Plan', desc: 'Loop reads the repo state and picks the next most valuable increment.' },
  { name: 'Generate', desc: 'A local model writes the change — code, tests, docs — offline on your GPU.' },
  { name: 'Validate', desc: 'The change is built and tested. If it fails, it never lands.' },
  { name: 'Commit', desc: 'Only validated work is committed, with a clean message and full history.' },
]

const TERMINAL_LINES = [
  { text: '$ akorith loop start ./my-project', color: 'text-ink/85' },
  { text: '[loop] iteration 12 · model qwen3.5:9b-64k', color: 'text-ink/45' },
  { text: '[plan] add input validation to config parser', color: 'text-sky-300' },
  { text: '[gen ] src/config/parse.ts (+41 −6)', color: 'text-ink/85' },
  { text: '[test] 24 passed · 0 failed', color: 'text-emerald-400' },
  { text: '[commit] a41f9c2 "config: validate user input"', color: 'text-violet-300' },
  { text: '[loop] iteration 13 queued…', color: 'text-ink/45' },
]

const GUARANTEES = [
  {
    title: 'Validated commits only',
    desc: 'Every iteration must build and pass tests before it can land. Broken code never enters history.',
  },
  {
    title: 'Fully local models',
    desc: 'Loop runs on Ollama models — your hardware, your electricity, zero token bills, zero data leaving.',
  },
  {
    title: 'Grows over time',
    desc: 'Leave it running. Loop compounds small validated increments into a repository that keeps improving.',
  },
]

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
            <SplitWords text="Your repo," />{' '}
            <span className="accent-word">
              <SplitWords text="still growing" delay={0.25} />
            </span>
            <br />
            <SplitWords text="at 3 a.m." delay={0.5} />
          </h1>
          <Reveal delay={0.6}>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
              Loop is Akorith's autonomous project builder. It plans, writes, validates, and
              commits — iteration after iteration — using local models that cost you nothing per
              token.
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
                Plan → Generate → Validate → <span className="accent-word">Commit.</span>
              </>
            }
            lead="A disciplined engineering loop, not a code firehose. Each pass is small, checked, and recorded."
          />
          <div className="relative mt-16">
            {/* connecting line */}
            <div aria-hidden className="absolute left-0 right-0 top-9 hidden h-px bg-line lg:block" />
            <Stagger className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4" gap={0.14}>
              {CYCLE.map((step, i) => (
                <StaggerItem key={step.name}>
                  <div className="relative">
                    <motion.div
                      whileHover={{ scale: 1.08, rotate: -3 }}
                      className="relative z-10 flex h-[72px] w-[72px] items-center justify-center rounded-2xl border border-line bg-surface font-serif text-2xl font-semibold text-clay shadow-sm"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </motion.div>
                    <h3 className="mt-5 font-serif text-xl font-semibold text-ink">{step.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{step.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
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
                  Small steps. Real tests. <span className="accent-word">Honest history.</span>
                </>
              }
              lead="Loop's output reads like a careful engineer's shell — because that's what it is. Failed iterations are discarded; only proven work makes it into git."
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
              “Cloud agents bill by the minute.{' '}
              <span className="accent-word">Loop bills by the kilowatt</span> — and your GPU was
              idle anyway.”
            </p>
          </Reveal>
        </div>
      </section>

      <CtaSection />
    </Page>
  )
}
