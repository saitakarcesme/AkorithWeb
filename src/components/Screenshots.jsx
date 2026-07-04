import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { TiltCard } from './motion.jsx'
import { PulseDot } from './mocks.jsx'

/* ============================================================
   Real app screenshots (public/screenshots/*), shown inside
   glowing dark frames with tilt, tab galleries, and a lightbox.
   ============================================================ */

export const SHOTS = {
  workspace: {
    src: '/screenshots/01-workspace.png',
    label: 'Workspace',
    caption: 'Type a task once — Akorith plans it and drives Codex, OpenCode, and Claude for you.',
  },
  dashboard: {
    src: '/screenshots/02-dashboard.png',
    label: 'Dashboard',
    caption: 'Local usage, runtime observation, loops, and test signal in one read-only overview.',
  },
  plugins: {
    src: '/screenshots/03-plugins.png',
    label: 'Plugins',
    caption: 'Agents, integrations, telemetry, memory, and browser automation — permission-gated.',
  },
  companions: {
    src: '/screenshots/04-companions.png',
    label: 'Companions',
    caption: 'Athena remembers your goals and preferences — but never touches your files.',
  },
  agents: {
    src: '/screenshots/05-agents.png',
    label: 'Agents',
    caption: 'Reusable action shortcuts with explicit permission policies and full run history.',
  },
  settings: {
    src: '/screenshots/06-settings.png',
    label: 'Settings',
    caption: 'Providers, usage limits, workflow, and data controls — all local, all yours.',
  },
}

const EASE = [0.21, 0.47, 0.32, 0.98]

/* ---------------- Lightbox ---------------- */

function Lightbox({ shot, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-night/90 p-4 backdrop-blur-md sm:p-10"
    >
      <motion.figure
        initial={{ scale: 0.92, y: 24 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 12 }}
        transition={{ duration: 0.35, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-6xl"
      >
        <div className="shot-frame">
          <img src={shot.src} alt={`Akorith — ${shot.label}`} />
        </div>
        <figcaption className="mt-4 flex items-center justify-between gap-4">
          <p className="text-sm text-muted">
            <span className="font-mono text-clay-deep">{shot.label}</span> — {shot.caption}
          </p>
          <button
            onClick={onClose}
            className="shrink-0 rounded-full border border-line bg-surface px-4 py-1.5 font-mono text-xs text-soot transition-colors hover:border-clay hover:text-ink"
          >
            esc · close
          </button>
        </figcaption>
      </motion.figure>
    </motion.div>
  )
}

/* ---------------- Single framed screenshot ---------------- */

export function ShotFrame({ shot, tilt = true, className = '' }) {
  const data = SHOTS[shot]
  const [open, setOpen] = useState(false)

  const frame = (
    <motion.button
      type="button"
      onClick={() => setOpen(true)}
      whileHover={{ scale: tilt ? 1 : 1.015 }}
      className="group relative block w-full cursor-zoom-in text-left"
      aria-label={`Enlarge ${data.label} screenshot`}
    >
      <div aria-hidden className="shot-glow" />
      <div className="shot-frame">
        <div className="flex items-center gap-2 border-b border-white/[0.06] bg-night px-4 py-2.5">
          <PulseDot color="bg-moss" className="scale-75" />
          <span className="font-mono text-[11px] text-ink/45">akorith — {data.label.toLowerCase()}</span>
          <span className="ml-auto font-mono text-[10px] text-ink/25 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            click to zoom ⌕
          </span>
        </div>
        <img src={data.src} alt={`Akorith — ${data.label}`} loading="lazy" />
      </div>
    </motion.button>
  )

  return (
    <div className={`relative ${className}`}>
      {tilt ? <TiltCard max={4}>{frame}</TiltCard> : frame}
      <AnimatePresence>{open && <Lightbox shot={data} onClose={() => setOpen(false)} />}</AnimatePresence>
    </div>
  )
}

/* ---------------- Tabbed showcase gallery ---------------- */

const ORDER = ['workspace', 'dashboard', 'plugins', 'companions', 'agents', 'settings']
const AUTO_MS = 5000

export function AppShowcase({ className = '' }) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [zoom, setZoom] = useState(false)

  useEffect(() => {
    if (paused || zoom) return
    const id = setInterval(() => setActive((v) => (v + 1) % ORDER.length), AUTO_MS)
    return () => clearInterval(id)
  }, [paused, zoom])

  const key = ORDER[active]
  const shot = SHOTS[key]
  const close = useCallback(() => setZoom(false), [])

  return (
    <div
      className={className}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* tabs */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {ORDER.map((k, i) => (
          <button
            key={k}
            onClick={() => setActive(i)}
            className={`relative rounded-full px-4 py-2 font-mono text-xs transition-colors duration-200 sm:text-sm ${
              i === active ? 'text-ink' : 'text-muted hover:text-soot'
            }`}
          >
            {i === active && (
              <motion.span
                layoutId="showcase-pill"
                className="absolute inset-0 rounded-full border border-clay/40 bg-clay/15"
                transition={{ type: 'spring', bounce: 0.25, duration: 0.55 }}
              />
            )}
            <span className="relative">{SHOTS[k].label}</span>
          </button>
        ))}
      </div>

      {/* stage */}
      <div className="relative">
        <div aria-hidden className="shot-glow" />
        <AnimatePresence mode="wait">
          <motion.button
            key={key}
            type="button"
            onClick={() => setZoom(true)}
            initial={{ opacity: 0, y: 26, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -18, scale: 0.99 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="block w-full cursor-zoom-in text-left"
            aria-label={`Enlarge ${shot.label} screenshot`}
          >
            <div className="shot-frame">
              <img src={shot.src} alt={`Akorith — ${shot.label}`} loading="lazy" />
            </div>
          </motion.button>
        </AnimatePresence>

        {/* caption + auto-advance progress */}
        <div className="mx-auto mt-6 max-w-2xl text-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={key}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="text-sm leading-relaxed text-muted"
            >
              {shot.caption}
            </motion.p>
          </AnimatePresence>
          <div className="mx-auto mt-5 h-0.5 w-40 overflow-hidden rounded-full bg-line">
            {!paused && !zoom && (
              <motion.div
                key={key + active}
                className="h-full bg-gradient-to-r from-clay to-moss"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: AUTO_MS / 1000, ease: 'linear' }}
              />
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>{zoom && <Lightbox shot={shot} onClose={close} />}</AnimatePresence>
    </div>
  )
}
