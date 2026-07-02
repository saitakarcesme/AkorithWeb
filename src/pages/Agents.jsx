import { motion } from 'framer-motion'
import { Page, Reveal, Stagger, StaggerItem, SplitWords } from '../components/motion.jsx'
import {
  SectionHeading,
  Card,
  CtaSection,
  Spark,
} from '../components/ui.jsx'
import { ActivityMock, CompanionsMock, AgentsMock } from '../components/mocks.jsx'

const TERMINALS = [
  {
    name: 'Olympus',
    provider: 'OpenAI Codex',
    dot: 'bg-sky-700',
    desc: 'The summit. Heavyweight code generation and refactors driven through the codex CLI.',
  },
  {
    name: 'Gaia',
    provider: 'OpenCode',
    dot: 'bg-moss',
    desc: 'The ground. Fast, open-source agent runs through the opencode CLI with output summarized back into chat.',
  },
  {
    name: 'Atlantis',
    provider: 'Claude',
    dot: 'bg-clay',
    desc: 'The deep. Careful reasoning, reviews, and long-context work through the claude CLI.',
  },
]

const COMPANIONS = [
  {
    initial: 'A',
    name: 'Athena',
    traits: ['warm', 'wise', 'supportive'],
    desc: 'Warm, wise, emotionally steady — your thoughtful companion for untangling problems and planning calmly.',
  },
  {
    initial: 'Z',
    name: 'Zeus',
    traits: ['direct', 'masculine', 'decisive'],
    desc: 'Direct, protective, decisive — the push to move. Zeus helps you see the mountain, choose the strike, and act.',
  },
]

const MEMORY_KINDS = [
  ['Goals', 'Ship Akorith 1.0 by August — pinned, remembered, brought up when it matters.'],
  ['Preferences', 'Works best under tight deadlines? Your companion adapts to how you operate.'],
  ['Projects', 'Long-running context about what you are building and why.'],
]

const PERMISSIONS = [
  {
    level: 'preview',
    desc: 'Read-only. The agent reports what it would do — nothing is touched.',
  },
  {
    level: 'safe writes',
    desc: 'May write inside its assigned folder only. Everything else is off limits.',
  },
  {
    level: 'safe commands',
    desc: 'May run allowlisted commands. Anything outside the list is refused.',
  },
  {
    level: 'ask write',
    desc: 'Asks for confirmation before each write. You stay in the loop, always.',
  },
]

export default function Agents() {
  return (
    <Page>
      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden px-6 pb-20 pt-36 sm:pt-44">
        <div aria-hidden className="bg-dots mask-fade-b absolute inset-0 opacity-70" />
        <Spark className="absolute left-[14%] top-48 hidden h-5 w-5 text-clay/45 animate-sway lg:block" />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="mb-5 flex items-center justify-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.22em] text-clay-deep">
            <Spark className="h-3.5 w-3.5" />
            Agents & Companions
          </p>
          <h1 className="font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-6xl">
            <SplitWords text="A crew for" />{' '}
            <span className="accent-word">
              <SplitWords text="your codebase." delay={0.25} />
            </span>
          </h1>
          <Reveal delay={0.5}>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
              Terminals that build, companions that think, agents that act — each with a clear
              boundary between advice and action.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== Terminals ===== */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="The three terminals"
            title={
              <>
                Olympus. Gaia. <span className="accent-word">Atlantis.</span>
              </>
            }
            lead="Every provider gets a named terminal with live output and one-click restore. Akorith routes your task to the right one — or all three at once."
          />
          <Stagger className="mt-14 grid gap-6 md:grid-cols-3">
            {TERMINALS.map((t) => (
              <StaggerItem key={t.name}>
                <Card className="h-full p-8">
                  <div className="flex items-center gap-3">
                    <span className={`h-2.5 w-2.5 rounded-full ${t.dot}`} />
                    <h3 className="font-serif text-xl font-semibold text-ink">{t.name}</h3>
                    <span className="ml-auto rounded-full border border-line bg-cream/60 px-3 py-1 font-mono text-[11px] text-soot">
                      {t.provider}
                    </span>
                  </div>
                  <p className="mt-5 leading-relaxed text-muted">{t.desc}</p>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal delay={0.2} className="mx-auto mt-14 max-w-2xl">
            <ActivityMock />
          </Reveal>
        </div>
      </section>

      {/* ===== Companions ===== */}
      <section className="border-y border-line bg-cream/40 px-6 py-24">
        <div className="relative mx-auto max-w-7xl">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="Companions"
                title={
                  <>
                    Minds that remember. <span className="accent-word">Hands that never touch.</span>
                  </>
                }
                lead="Companions are long-memory local personalities. They think and remember across sessions — goals, preferences, projects — but by design they can never run a command or write a file."
              />
              <Stagger className="mt-8 space-y-4" gap={0.12}>
                {MEMORY_KINDS.map(([title, desc]) => (
                  <StaggerItem key={title}>
                    <div className="rounded-xl border border-line bg-surface px-5 py-4">
                      <p className="font-mono text-xs uppercase tracking-[0.2em] text-clay-deep">
                        {title}
                      </p>
                      <p className="mt-1.5 text-sm text-muted">{desc}</p>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
            <div className="space-y-6">
              {COMPANIONS.map((c, i) => (
                <Reveal key={c.name} delay={i * 0.15}>
                  <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.3 }}>
                    <Card className="p-7">
                      <div className="flex items-center gap-4">
                        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-clay/12 font-serif text-2xl font-semibold text-clay">
                          {c.initial}
                        </span>
                        <div>
                          <h3 className="font-serif text-xl font-semibold text-ink">{c.name}</h3>
                          <div className="mt-1 flex gap-2">
                            {c.traits.map((t) => (
                              <span
                                key={t}
                                className="rounded-full border border-line bg-cream/70 px-2.5 py-0.5 font-mono text-[10px] text-muted"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="mt-4 text-sm leading-relaxed text-muted">{c.desc}</p>
                    </Card>
                  </motion.div>
                </Reveal>
              ))}
              <Reveal delay={0.3}>
                <CompanionsMock />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Agents / permissions ===== */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Agents"
            title={
              <>
                Create once. Run forever. <span className="accent-word">Behind a policy.</span>
              </>
            }
            lead="Agents are reusable local action shortcuts — repo health reports, changelog makers, folder organizers, README builders. Each one declares exactly what it may do before it runs."
          />
          <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PERMISSIONS.map((p) => (
              <StaggerItem key={p.level}>
                <Card className="h-full p-7">
                  <span className="rounded-md border border-clay/30 bg-clay/10 px-2.5 py-1 font-mono text-xs font-semibold text-clay-deep">
                    {p.level}
                  </span>
                  <p className="mt-4 text-sm leading-relaxed text-muted">{p.desc}</p>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal delay={0.15} className="mx-auto mt-14 max-w-3xl">
            <AgentsMock />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-10 max-w-2xl text-center font-serif text-lg italic text-soot">
              “Nothing destructive runs silently; every action is logged.”
            </p>
          </Reveal>
        </div>
      </section>

      <CtaSection />
    </Page>
  )
}
