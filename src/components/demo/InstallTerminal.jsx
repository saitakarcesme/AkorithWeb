import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CLI } from './cli.js'
import { CliBanner, StatusLine, Caret } from './CliTerminal.jsx'

/* Looping hero animation: install Akorith, type `akorith`, watch the real
   banner boot — colors and wordmark match the actual CLI. */

const mono = { fontFamily: '"IBM Plex Mono", ui-monospace, SFMono-Regular, monospace' }
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

export function InstallTerminal({ className = '' }) {
  const [step, setStep] = useState(0)
  // 0 type curl · 1 download · 2 installed · 3 type akorith · 4 boot · 5 hold → restart
  const curlTyped = useTyper(CURL, step === 0)
  const runTyped = useTyper(RUN, step === 3, 90)

  useEffect(() => {
    const delays = [CURL.length * 34 + 700, 1400, 1100, RUN.length * 90 + 800, 5200, 900]
    const id = setTimeout(() => setStep((step + 1) % 6), delays[step])
    return () => clearTimeout(id)
  }, [step])

  return (
    <div
      className={`overflow-hidden rounded-2xl border border-white/10 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.85)] ${className}`}
      style={{ background: CLI.bg }}
    >
      <div
        className="flex items-center justify-between border-b border-white/[0.07] px-4 py-2.5"
        style={{ background: '#141416' }}
      >
        <span className="flex items-center gap-2">
          <span className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          </span>
          <span className="ml-1 text-[11px]" style={{ ...mono, color: CLI.faint }}>
            zsh — 92×30
          </span>
        </span>
        <span className="text-[10px]" style={{ ...mono, color: CLI.faint }}>
          ~/projects
        </span>
      </div>

      <div className="min-h-[320px] p-5 text-[13px] leading-relaxed sm:p-6" style={mono}>
        <AnimatePresence mode="wait">
          {step >= 4 ? (
            <motion.div key="boot" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
              <CliBanner />
              <div className="mt-4">
                <StatusLine />
                <p className="mt-1 text-[12px] sm:text-[13px]" style={{ ...mono, color: CLI.dim }}>
                  Type a task. /help for commands, /model to switch models, ! to run shell.
                </p>
              </div>
              <p className="mt-3 text-[13px] font-bold" style={{ ...mono, color: CLI.text }}>
                ❯ <Caret />
              </p>
            </motion.div>
          ) : (
            <motion.div key="run" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p style={{ color: CLI.text }}>
                <span className="select-none" style={{ color: CLI.green }}>$ </span>
                {step === 0 ? curlTyped : CURL}
                {step === 0 && <Caret />}
              </p>
              {step >= 1 && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2" style={{ color: CLI.dim }}>
                  ▸ downloading akorith…{' '}
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
                    done
                  </motion.span>
                </motion.p>
              )}
              {step >= 2 && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-1" style={{ color: CLI.green }}>
                  ✓ installed — 1 new command: akorith
                </motion.p>
              )}
              {step >= 3 && (
                <p className="mt-4" style={{ color: CLI.text }}>
                  <span className="select-none" style={{ color: CLI.green }}>$ </span>
                  {step === 3 ? runTyped : RUN}
                  {step === 3 && <Caret />}
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
