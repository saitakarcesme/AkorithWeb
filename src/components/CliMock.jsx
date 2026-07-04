import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MockWindow, Cursor, PulseDot } from './mocks.jsx'

/* Animated Akorith CLI session — cycles through real command scenes. */

const SCENES = [
  {
    id: 'task',
    lines: [
      ['❯ refactor the auth module and add tests', 'text-ink/90'],
      ['[atlantis] Claude · planning…', 'text-ink/40'],
      ['✓ patched src/auth/session.ts (+64 −12)', 'text-emerald-400'],
      ['✓ 18 tests passed', 'text-emerald-400'],
    ],
  },
  {
    id: 'switch',
    lines: [
      ['❯ /model codex', 'text-ink/90'],
      ['switched → Olympus · Codex', 'text-violet-300'],
      ['❯ now optimize the hot path', 'text-ink/90'],
      ['[olympus] codex exec · resumes your thread', 'text-ink/40'],
    ],
  },
  {
    id: 'models',
    lines: [
      ['❯ /models', 'text-ink/90'],
      ['● claude · ready      ● codex · ready', 'text-ink/70'],
      ['● opencode · ready    ● ollama · ready', 'text-ink/70'],
      ['❯ !git log --oneline -1', 'text-ink/90'],
      ['a41f9c2 auth: validate sessions', 'text-ink/40'],
    ],
  },
]

export function CliMock({ className = '' }) {
  const [scene, setScene] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setScene((v) => (v + 1) % SCENES.length), 4600)
    return () => clearInterval(id)
  }, [])
  const current = SCENES[scene]

  return (
    <MockWindow dark title="akorith — any terminal" className={className}>
      <div className="min-h-[190px] p-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.55 } } }}
            className="space-y-2.5 font-mono text-[12.5px] leading-relaxed"
          >
            {current.lines.map(([text, color], i) => (
              <motion.p
                key={i}
                variants={{ hidden: { opacity: 0, x: -8 }, show: { opacity: 1, x: 0 } }}
                className={`whitespace-pre ${color}`}
              >
                {text}
              </motion.p>
            ))}
            <Cursor dark />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex items-center gap-2 border-t border-white/[0.06] px-5 py-2.5">
        <PulseDot color="bg-moss" className="scale-75" />
        <span className="font-mono text-[10px] text-ink/35">
          one prompt · per-provider threads · no API keys
        </span>
      </div>
    </MockWindow>
  )
}
