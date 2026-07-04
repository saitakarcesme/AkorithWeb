import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/* Looping hero animation: install Akorith, type `akorith`, watch it boot. */

const CURL = 'curl -fsSL https://akorith.space/install | bash'
const RUN = 'akorith'

function useTyper(text, active, speed = 34) {
  const [len, setLen] = useState(0)
  useEffect(() => {
    if (!active) return
    setLen(0)
    let i = 0
    const id = setInterval(() => {
      i += 1
      setLen(i)
      if (i >= text.length) clearInterval(id)
    }, speed)
    return () => clearInterval(id)
  }, [text, active, speed])
  return active ? text.slice(0, len) : ''
}

function Blink({ className = 'bg-clay' }) {
  return (
    <motion.span
      className={`ml-0.5 inline-block h-[1.05em] w-[7px] align-text-bottom ${className}`}
      animate={{ opacity: [1, 0, 1] }}
      transition={{ repeat: Infinity, duration: 1 }}
    />
  )
}

export function InstallTerminal({ className = '' }) {
  const [step, setStep] = useState(0)
  // 0 type curl · 1 download · 2 installed · 3 type akorith · 4 boot · 5 hold → restart
  const curlTyped = useTyper(CURL, step === 0)
  const runTyped = useTyper(RUN, step === 3, 90)

  useEffect(() => {
    const delays = [CURL.length * 34 + 700, 1500, 1100, RUN.length * 90 + 800, 900, 4200]
    const id = setTimeout(() => setStep((step + 1) % 6), delays[step])
    return () => clearTimeout(id)
  }, [step])

  return (
    <div
      className={`overflow-hidden rounded-2xl border border-white/10 bg-night shadow-[0_30px_80px_-30px_rgba(0,0,0,0.85)] ${className}`}
    >
      <div className="flex items-center justify-between border-b border-white/[0.07] bg-night-soft px-4 py-2.5">
        <span className="font-mono text-[11px] text-ink/45">zsh — 80×24</span>
        <span className="font-mono text-[10px] text-ink/25">~/projects</span>
      </div>
      <div className="min-h-[280px] p-6 font-mono text-[13px] leading-relaxed sm:text-sm">
        <AnimatePresence mode="wait">
          {step === 5 ? (
            <motion.div
              key="fade"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.4 } }}
            >
              <BootFrame runTyped={RUN} showBanner />
            </motion.div>
          ) : (
            <motion.div key="run" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p className="text-ink/90">
                <span className="select-none text-moss">$ </span>
                {step === 0 ? curlTyped : CURL}
                {step === 0 && <Blink />}
              </p>
              {step >= 1 && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 text-ink/45">
                  ▸ downloading akorith…{' '}
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    done
                  </motion.span>
                </motion.p>
              )}
              {step >= 2 && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-1 text-emerald-400">
                  ✓ installed — 1 new command: akorith
                </motion.p>
              )}
              {step >= 3 && (
                <p className="mt-4 text-ink/90">
                  <span className="select-none text-moss">$ </span>
                  {step === 3 ? runTyped : RUN}
                  {step === 3 && <Blink />}
                </p>
              )}
              {step >= 4 && <BootFrame showBanner={step >= 4} />}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function BootFrame({ showBanner }) {
  if (!showBanner) return null
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mt-4 rounded-lg border border-clay/30 bg-clay/[0.06] p-4"
    >
      <p className="font-semibold tracking-wide text-clay-deep">AKORITH · the Agent OS</p>
      <p className="mt-2 text-[12px] text-ink/60">
        <span className="text-emerald-400">●</span> atlantis · claude{'   '}
        <span className="text-sky-400">●</span> olympus · codex{'   '}
        <span className="text-emerald-400">●</span> gaia · opencode
      </p>
      <p className="mt-3 text-ink/90">
        ❯ <Blink className="bg-violet-400" />
      </p>
    </motion.div>
  )
}
