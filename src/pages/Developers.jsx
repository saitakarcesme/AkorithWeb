import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Page, Reveal, SplitWords, CountUp } from '../components/motion.jsx'
import { Card, Spark, PrimaryButton, GhostButton, CtaSection, GITHUB_URL } from '../components/ui.jsx'
import { MockWindow, Cursor } from '../components/mocks.jsx'

const PROFILE_URL = 'https://github.com/saitakarcesme'

const COMMITS = [
  ['a41f9c2', 'loop: validate commits before landing', 'text-emerald-400'],
  ['7c22d10', 'companions: long-memory for Athena & Zeus', 'text-violet-300'],
  ['e90b3af', 'testlab: sandbox runs + PDF scoring', 'text-ink/85'],
  ['12fd8c4', 'agents: permission policies (ask write)', 'text-ink/85'],
  ['b06a4e5', 'dashboard: provider mix & GPU telemetry', 'text-ink/45'],
]

export default function Developers() {
  const [gh, setGh] = useState(null)

  useEffect(() => {
    fetch('https://api.github.com/users/saitakarcesme')
      .then((r) => (r.ok ? r.json() : null))
      .then(setGh)
      .catch(() => {})
  }, [])

  return (
    <Page>
      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden px-6 pb-16 pt-36 sm:pt-44">
        <div aria-hidden className="bg-dots mask-fade-b absolute inset-0 opacity-70" />
        <Spark className="absolute left-[15%] top-44 hidden h-5 w-5 text-clay/45 animate-sway lg:block" />
        <Spark className="absolute right-[14%] top-60 hidden h-4 w-4 text-moss/40 animate-sway lg:block" />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="mb-5 flex items-center justify-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.22em] text-clay-deep">
            <Spark className="h-3.5 w-3.5" />
            Developers
          </p>
          <h1 className="font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-6xl">
            <SplitWords text="Built by a human." />
            <br />
            <span className="accent-word">
              <SplitWords text="Run by agents." delay={0.3} />
            </span>
          </h1>
          <Reveal delay={0.5}>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
              Akorith is designed, written, and maintained by one developer — with a crew of
              local agents doing the heavy lifting.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== Developer card ===== */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <Card className="overflow-hidden !p-0">
              <div className="grid md:grid-cols-[240px_1fr]">
                {/* avatar */}
                <motion.div
                  className="relative flex items-center justify-center border-b border-line bg-cream/50 p-8 md:border-b-0 md:border-r"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.35 }}
                >
                  <Spark className="absolute left-4 top-4 h-4 w-4 text-clay/50 animate-sway" />
                  <Spark className="absolute bottom-4 right-4 h-3 w-3 text-moss/50 animate-sway" />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, type: 'spring', bounce: 0.35 }}
                    className="relative"
                  >
                    <div
                      aria-hidden
                      className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-clay/50 to-moss/50 blur-md"
                    />
                    <img
                      src={gh?.avatar_url || `${PROFILE_URL}.png`}
                      alt="İbrahim Sait's GitHub avatar"
                      className="relative h-36 w-36 rounded-2xl border-2 border-surface object-cover shadow-lg"
                    />
                  </motion.div>
                </motion.div>

                {/* info */}
                <div className="p-8">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-clay-deep">
                    Creator & maintainer
                  </p>
                  <h2 className="mt-2 font-serif text-3xl font-semibold text-ink">İbrahim Sait</h2>
                  <a
                    href={PROFILE_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-block font-mono text-sm text-muted transition-colors hover:text-clay"
                  >
                    github.com/saitakarcesme ↗
                  </a>
                  <p className="mt-4 max-w-md leading-relaxed text-muted">
                    Designs and builds Akorith end to end — the Loop engine, the three agent
                    terminals, companions, and the local-first plumbing that keeps everything on
                    your machine.
                  </p>

                  {/* live GitHub stats */}
                  <div className="mt-6 grid grid-cols-3 gap-4">
                    {[
                      { label: 'public repos', value: gh?.public_repos },
                      { label: 'followers', value: gh?.followers },
                      { label: 'mission', value: 1 },
                    ].map((s) => (
                      <div key={s.label} className="border-l-2 border-clay/40 pl-3">
                        <p className="font-serif text-2xl text-ink">
                          {typeof s.value === 'number' ? <CountUp to={s.value} /> : '—'}
                        </p>
                        <p className="font-mono text-[10px] uppercase tracking-wider text-muted">
                          {s.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <PrimaryButton href={PROFILE_URL}>Follow on GitHub</PrimaryButton>
                    <GhostButton href={GITHUB_URL}>Akorith repo</GhostButton>
                  </div>
                </div>
              </div>
            </Card>
          </Reveal>

          {/* commit trail */}
          <Reveal delay={0.15} className="mt-10">
            <MockWindow dark title="git log — akorith · author: İbrahim Sait">
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.22 } } }}
                className="space-y-2.5 p-5 font-mono text-[12.5px] leading-relaxed"
              >
                {COMMITS.map(([hash, msg, color]) => (
                  <motion.p
                    key={hash}
                    variants={{ hidden: { opacity: 0, x: -10 }, show: { opacity: 1, x: 0 } }}
                    className={color}
                  >
                    <span className="text-clay">{hash}</span> {msg}
                  </motion.p>
                ))}
                <motion.p
                  variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
                  className="pt-1 text-ink/45"
                >
                  $ git shortlog -sn → 100% İbrahim Sait
                  <Cursor dark />
                </motion.p>
              </motion.div>
            </MockWindow>
          </Reveal>

          {/* contribute note */}
          <Reveal delay={0.1}>
            <p className="mx-auto mt-10 max-w-xl text-center text-muted">
              Want to join the crew? Issues and pull requests are open —{' '}
              <a
                href={`${GITHUB_URL}/issues`}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-clay-deep underline-offset-4 hover:underline"
              >
                start here ↗
              </a>
            </p>
          </Reveal>
        </div>
      </section>

      <CtaSection />
    </Page>
  )
}
