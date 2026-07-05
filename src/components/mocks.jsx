import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CountUp } from './motion.jsx'

/* ============================================================
   Animated, in-theme product mocks that replace raw screenshots.
   Light windows use the site's paper/surface palette; terminals
   go dark. No traffic lights anywhere.
   ============================================================ */

export function MockWindow({ title, dark = false, className = '', children }) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border shadow-[0_24px_60px_-24px_rgba(0,0,0,0.75)] ${
        dark ? 'border-white/10 bg-night' : 'border-line bg-surface'
      } ${className}`}
    >
      {title && (
        <div
          className={`border-b px-4 py-2.5 font-mono text-[11px] ${
            dark
              ? 'border-white/[0.07] bg-night-soft text-ink/50'
              : 'border-line bg-cream/60 text-muted'
          }`}
        >
          {title}
        </div>
      )}
      {children}
    </div>
  )
}

export function PulseDot({ color = 'bg-moss', className = '' }) {
  return (
    <span className={`relative flex h-2.5 w-2.5 shrink-0 ${className}`}>
      <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-50 ${color}`} />
      <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${color}`} />
    </span>
  )
}

export function Cursor({ dark = false }) {
  return (
    <motion.span
      className={`ml-0.5 inline-block h-[1.05em] w-[2px] align-text-bottom ${dark ? 'bg-violet-400' : 'bg-clay'}`}
      animate={{ opacity: [1, 0, 1] }}
      transition={{ repeat: Infinity, duration: 1 }}
    />
  )
}

/** Types, holds, deletes, moves to the next phrase — forever. */
function useTypeLoop(texts, speed = 45, hold = 1700) {
  const [idx, setIdx] = useState(0)
  const [len, setLen] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const full = texts[idx]
    let t
    if (!deleting && len < full.length) t = setTimeout(() => setLen(len + 1), speed)
    else if (!deleting && len === full.length) t = setTimeout(() => setDeleting(true), hold)
    else if (deleting && len > 0) t = setTimeout(() => setLen(len - 1), 22)
    else {
      setDeleting(false)
      setIdx((idx + 1) % texts.length)
    }
    return () => clearTimeout(t)
  }, [texts, idx, len, deleting, speed, hold])

  return texts[idx].slice(0, len)
}

/* ---------------- Workbench: chat home with cycling models ---------------- */

const WB_NAV = ['New chat', 'Workspace', 'Loop', 'Dashboard', 'Benchmark', 'Plugins', 'Companions', 'Agents']
const WB_MODELS = [
  { dot: 'bg-clay', provider: 'Claude', name: 'Claude Fable 5' },
  { dot: 'bg-sky-600', provider: 'Codex', name: 'GPT-5.5 Codex' },
  { dot: 'bg-moss', provider: 'Local', name: 'qwen3.5:9b-64k' },
]
const WB_PROMPTS = [
  'Refactor the config parser and add tests…',
  'Summarize what changed in this repo today…',
  'Plan a task and drive all three agents…',
]

export function WorkbenchMock({ className = '' }) {
  const typed = useTypeLoop(WB_PROMPTS)
  const [m, setM] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setM((v) => (v + 1) % WB_MODELS.length), 2600)
    return () => clearInterval(id)
  }, [])
  const model = WB_MODELS[m]

  return (
    <MockWindow title="akorith — workspace" className={className}>
      <div className="grid sm:grid-cols-[150px_1fr]">
        {/* sidebar */}
        <motion.div
          className="hidden border-r border-line p-3 sm:block"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
        >
          {WB_NAV.map((item, i) => (
            <motion.div
              key={item}
              variants={{ hidden: { opacity: 0, x: -10 }, show: { opacity: 1, x: 0 } }}
              className={`mb-1 rounded-md px-2.5 py-1.5 font-mono text-[11px] ${
                i === 1 ? 'bg-clay/10 text-clay-deep' : 'text-muted'
              }`}
            >
              {item}
            </motion.div>
          ))}
        </motion.div>

        {/* chat area */}
        <div className="flex flex-col items-center justify-center px-6 py-10 sm:py-14">
          <p className="font-serif text-xl text-ink sm:text-2xl">Welcome back, Ibrahim</p>
          <p className="mt-1.5 text-xs text-muted">Pick a model and start a fresh conversation.</p>

          <div className="mt-6 w-full max-w-md rounded-xl border border-line bg-paper p-4">
            <p className="min-h-[1.4em] text-sm text-soot">
              {typed}
              <Cursor />
            </p>
            <div className="mt-4 flex items-center justify-between">
              <AnimatePresence mode="wait">
                <motion.span
                  key={model.name}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 font-mono text-[11px] text-soot"
                >
                  <span className={`h-2 w-2 rounded-full ${model.dot}`} />
                  <span className="text-muted">{model.provider}</span> {model.name}
                </motion.span>
              </AnimatePresence>
              <motion.span
                className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-paper"
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ repeat: Infinity, duration: 2.2 }}
              >
                →
              </motion.span>
            </div>
          </div>

          <p className="mt-4 flex items-center gap-2 font-mono text-[10px] text-muted">
            <PulseDot color="bg-moss" className="scale-75" /> memory on · session summarized automatically
          </p>
        </div>
      </div>
    </MockWindow>
  )
}

/* ---------------- Terminals: auto-cycling agent tabs ---------------- */

const TERM_TABS = [
  {
    name: 'Olympus',
    provider: 'Codex',
    dot: 'bg-sky-400',
    lines: [
      ['$ codex exec "add input validation"', 'text-ink/85'],
      ['model: gpt-5.5 · directory: ~/analizeRepo', 'text-ink/40'],
      ['✓ patched src/config/parse.ts (+41 −6)', 'text-emerald-400'],
    ],
  },
  {
    name: 'Gaia',
    provider: 'OpenCode',
    dot: 'bg-emerald-400',
    lines: [
      ['$ opencode run "fix broken tests"', 'text-ink/85'],
      ['Build · Big Pickle · OpenCode Zen', 'text-ink/40'],
      ['✓ 24 passed · 0 failed', 'text-emerald-400'],
    ],
  },
  {
    name: 'Atlantis',
    provider: 'Claude',
    dot: 'bg-violet-400',
    lines: [
      ['$ claude -p "review this diff"', 'text-ink/85'],
      ['claude-fable-5 · long-context review', 'text-ink/40'],
      ['✓ 2 issues found, patch suggested', 'text-violet-300'],
    ],
  },
]

export function TerminalsMock({ className = '' }) {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setActive((v) => (v + 1) % TERM_TABS.length), 3200)
    return () => clearInterval(id)
  }, [])
  const tab = TERM_TABS[active]

  return (
    <MockWindow dark title="agent activity — 3 agents running" className={className}>
      <div className="flex gap-1.5 border-b border-white/[0.07] px-3 pt-3">
        {TERM_TABS.map((t, i) => (
          <button
            key={t.name}
            onClick={() => setActive(i)}
            className={`relative flex items-center gap-2 rounded-t-lg px-3.5 py-2 font-mono text-[11px] transition-colors ${
              i === active ? 'text-ink' : 'text-ink/40'
            }`}
          >
            {i === active && (
              <motion.span
                layoutId="term-tab"
                className="absolute inset-0 rounded-t-lg bg-white/[0.07]"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
              />
            )}
            <span className={`relative h-1.5 w-1.5 rounded-full ${t.dot}`} />
            <span className="relative">{t.name}</span>
            <span className="relative hidden text-ink/30 sm:inline">· {t.provider}</span>
          </button>
        ))}
      </div>
      <div className="min-h-[168px] p-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab.name}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.3 } } }}
            className="space-y-2.5 font-mono text-[12.5px] leading-relaxed"
          >
            {tab.lines.map(([text, color], i) => (
              <motion.p
                key={i}
                variants={{ hidden: { opacity: 0, x: -8 }, show: { opacity: 1, x: 0 } }}
                className={color}
              >
                {text}
              </motion.p>
            ))}
            <Cursor dark />
          </motion.div>
        </AnimatePresence>
      </div>
    </MockWindow>
  )
}

/* ---------------- Dashboard: heatmap + bars + donut ---------------- */

const BAR_HEIGHTS = [16, 28, 20, 44, 32, 56, 38, 70, 50, 62, 88, 100]

function heat(r, c) {
  const v = (r * 13 + c * 7 + 5) % 11
  if (v > 8) return 'bg-clay'
  if (v > 6) return 'bg-clay/50'
  if (v > 4) return 'bg-moss/50'
  return 'bg-cream'
}

export function DashboardMock({ className = '' }) {
  const C = 2 * Math.PI * 30
  return (
    <MockWindow title="dashboard — usage & telemetry" className={className}>
      <div className="grid gap-5 p-5 sm:grid-cols-[1.35fr_1fr]">
        {/* left: heatmap + bars */}
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">Usage activity</p>
          <motion.div
            className="mt-3 grid grid-cols-[repeat(16,1fr)] gap-1"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.012 } } }}
          >
            {Array.from({ length: 16 * 6 }).map((_, i) => {
              const r = Math.floor(i / 16)
              const c = i % 16
              const pulses = (r * 16 + c) % 29 === 0
              return (
                <motion.span
                  key={i}
                  variants={{ hidden: { opacity: 0, scale: 0.4 }, show: { opacity: 1, scale: 1 } }}
                  animate={pulses ? { opacity: [1, 0.35, 1] } : undefined}
                  transition={pulses ? { repeat: Infinity, duration: 2.4, delay: (i % 7) * 0.3 } : undefined}
                  className={`aspect-square rounded-[3px] ${heat(r, c)}`}
                />
              )
            })}
          </motion.div>

          <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            Daily tokens · last 12 days
          </p>
          <div className="mt-3 flex h-20 items-end gap-1.5">
            {BAR_HEIGHTS.map((h, i) => (
              <motion.span
                key={i}
                className={`flex-1 rounded-t-[3px] ${i === 10 ? 'bg-clay' : i === 11 ? 'bg-moss' : 'bg-ink/15'}`}
                initial={{ height: 0 }}
                whileInView={{ height: `${h}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.05, ease: [0.21, 0.47, 0.32, 0.98] }}
              />
            ))}
          </div>
        </div>

        {/* right: donut + stats */}
        <div className="flex flex-col items-center justify-center rounded-xl border border-line bg-paper p-4">
          <div className="relative">
            <svg viewBox="0 0 80 80" className="h-32 w-32 -rotate-90">
              <circle cx="40" cy="40" r="30" fill="none" strokeWidth="9" className="stroke-line" />
              <motion.circle
                cx="40" cy="40" r="30" fill="none" strokeWidth="9" strokeLinecap="butt"
                className="stroke-clay" strokeDasharray={C}
                initial={{ strokeDashoffset: C }}
                whileInView={{ strokeDashoffset: C * (1 - 0.62) }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.21, 0.47, 0.32, 0.98] }}
              />
              <motion.circle
                cx="40" cy="40" r="30" fill="none" strokeWidth="9"
                className="stroke-moss" strokeDasharray={`${C * 0.22} ${C}`}
                style={{ transformOrigin: 'center', rotate: `${0.62 * 360}deg` }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.1, duration: 0.5 }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-serif text-xl text-ink">
                <CountUp to={1.1} decimals={1} suffix="M" />
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-muted">tokens</span>
            </div>
          </div>
          <div className="mt-3 space-y-1.5 font-mono text-[10px] text-muted">
            <p className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-clay" /> claude · codex 62%</p>
            <p className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-moss" /> local (ollama) 22%</p>
            <p className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-line" /> other 16%</p>
          </div>
        </div>
      </div>
    </MockWindow>
  )
}

/* ---------------- Benchmark: pipeline + scored models ---------------- */

const LAB_STEPS = ['Detect', 'Generate', 'Run', 'Score']
const LAB_MODELS = [
  { name: 'qwen3.5:9b-64k', score: 92, win: true },
  { name: 'gemma3:12b', score: 74 },
  { name: 'llama3.1:8b', score: 61 },
]

export function BenchmarkMock({ className = '' }) {
  return (
    <MockWindow title="model benchmark — sandbox run" className={className}>
      <div className="p-6">
        {/* pipeline */}
        <div className="relative flex items-center justify-between">
          <div aria-hidden className="absolute inset-x-8 top-1/2 hidden h-px -translate-y-3 bg-line sm:block" />
          {LAB_STEPS.map((s, i) => (
            <div key={s} className="relative flex flex-col items-center gap-2">
              <motion.span
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-surface font-serif text-sm text-clay"
                animate={{ scale: [1, 1.14, 1], borderColor: ['#2c2d32', '#8f6ae0', '#2c2d32'] }}
                transition={{ repeat: Infinity, duration: 4.8, delay: i * 1.2 }}
              >
                {String(i + 1).padStart(2, '0')}
              </motion.span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted">{s}</span>
            </div>
          ))}
        </div>

        {/* model scores */}
        <div className="mt-7 space-y-3">
          {LAB_MODELS.map((m, i) => (
            <div key={m.name} className="flex items-center gap-3">
              <span className="w-36 shrink-0 font-mono text-[11px] text-soot">{m.name}</span>
              <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-cream">
                <motion.div
                  className={`h-full rounded-full ${m.win ? 'bg-moss' : 'bg-clay/40'}`}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${m.score}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.25 + i * 0.18, ease: [0.21, 0.47, 0.32, 0.98] }}
                />
              </div>
              <span className="w-8 text-right font-mono text-[11px] text-muted">{m.score}</span>
              {m.win && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.3, type: 'spring', bounce: 0.5 }}
                  className="rounded-full border border-moss/40 bg-moss/10 px-2 py-0.5 font-mono text-[9px] uppercase text-moss"
                >
                  winner
                </motion.span>
              )}
            </div>
          ))}
        </div>

        <p className="mt-6 flex items-center gap-2 font-mono text-[10px] text-muted">
          <PulseDot color="bg-moss" className="scale-75" />
          fresh temp sandbox per run · PDF report exported
        </p>
      </div>
    </MockWindow>
  )
}

/* ---------------- Plugins: tile grid with scan sweep ---------------- */

const PLUGIN_TILES = [
  { name: 'OpenCode Agent', cat: 'agents', dot: 'bg-moss' },
  { name: 'GitHub Workbench', cat: 'integrations', dot: 'bg-moss' },
  { name: 'Chrome Automation', cat: 'browser', dot: 'bg-moss' },
  { name: 'Ollama Telemetry', cat: 'telemetry', dot: 'bg-clay' },
  { name: 'Hermes Memory', cat: 'memory', dot: 'bg-ink/25' },
  { name: 'Chroma Memory', cat: 'memory', dot: 'bg-clay' },
]

export function PluginsMock({ className = '' }) {
  return (
    <MockWindow title="plugins — 4/9 ready" className={className}>
      <div className="relative overflow-hidden p-5">
        {/* scan sweep */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-clay/[0.07] to-transparent"
          animate={{ left: ['-15%', '110%'] }}
          transition={{ repeat: Infinity, duration: 3.4, ease: 'linear' }}
        />
        <motion.div
          className="relative grid grid-cols-2 gap-3 sm:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
        >
          {PLUGIN_TILES.map((p) => (
            <motion.div
              key={p.name}
              variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
              whileHover={{ y: -3 }}
              className="rounded-xl border border-line bg-paper p-3.5"
            >
              <div className="flex items-center justify-between">
                <PulseDot color={p.dot} className="scale-90" />
                <span className="font-mono text-[9px] uppercase tracking-wider text-muted">{p.cat}</span>
              </div>
              <p className="mt-2.5 font-mono text-[11.5px] font-semibold leading-tight text-ink">
                {p.name}
              </p>
            </motion.div>
          ))}
        </motion.div>
        <p className="relative mt-4 font-mono text-[10px] text-muted">
          read-only foundation — nothing executes without you
        </p>
      </div>
    </MockWindow>
  )
}

/* ---------------- Settings: limits filling + toggles ---------------- */

const LIMIT_BARS = [
  { label: 'Claude · 5-hour window', pct: 38, color: 'bg-clay' },
  { label: 'Codex · weekly plan', pct: 72, color: 'bg-moss' },
]

function Toggle({ on, label }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-line bg-paper px-4 py-3">
      <span className="font-mono text-[11px] text-soot">{label}</span>
      <motion.span
        className={`flex h-5 w-9 items-center rounded-full px-0.5 ${on ? 'bg-moss' : 'bg-ink/15'}`}
        animate={{ backgroundColor: on ? '#34c08b' : 'rgba(242,242,241,0.14)' }}
      >
        <motion.span
          className="h-4 w-4 rounded-full bg-white shadow"
          animate={{ x: on ? 16 : 0 }}
          transition={{ type: 'spring', bounce: 0.4, duration: 0.5 }}
        />
      </motion.span>
    </div>
  )
}

export function SettingsMock({ className = '' }) {
  const [auto, setAuto] = useState(true)
  useEffect(() => {
    const id = setInterval(() => setAuto((v) => !v), 3000)
    return () => clearInterval(id)
  }, [])

  return (
    <MockWindow title="settings — workspace controls" className={className}>
      <div className="space-y-3 p-5">
        <Toggle on={auto} label="Auto-Enter" />
        <Toggle on label="Repo context" />
        <div className="rounded-xl border border-line bg-paper p-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            Usage limits vs. recorded usage
          </p>
          <div className="mt-3 space-y-3">
            {LIMIT_BARS.map((b, i) => (
              <div key={b.label}>
                <div className="flex justify-between font-mono text-[10px] text-muted">
                  <span>{b.label}</span>
                  <span>{b.pct}%</span>
                </div>
                <div className="mt-1 h-2 overflow-hidden rounded-full bg-cream">
                  <motion.div
                    className={`h-full rounded-full ${b.color}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${b.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 + i * 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-3 font-mono text-[10px] text-muted">
            no secrets stored — you enter the limits, Akorith does the math
          </p>
        </div>
      </div>
    </MockWindow>
  )
}

/* ---------------- Companions: chat bubbles + memory chips ---------------- */

const MEMORIES = [
  ['GOAL', 'Ship Akorith 1.0 by August'],
  ['PREFERENCE', 'Performs best under tight deadlines'],
  ['PROJECT', 'Akorith — primary dev project'],
]

export function CompanionsMock({ className = '' }) {
  return (
    <MockWindow title="companions — Zeus · memory on" className={className}>
      <div className="grid gap-4 p-5 sm:grid-cols-[1.3fr_1fr]">
        <div className="space-y-3">
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="ml-auto w-fit rounded-2xl rounded-br-sm bg-ink px-4 py-2 text-sm text-paper"
          >
            hello
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="w-fit max-w-[90%] rounded-2xl rounded-bl-sm border border-line bg-paper px-4 py-2.5 text-sm text-soot"
          >
            <span className="mb-1 block font-mono text-[10px] uppercase tracking-wider text-clay-deep">
              Zeus · decisive
            </span>
            I help you see the mountain, choose the strike, and move. What's your next step
            today?
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.1 }}
            className="flex items-center gap-2 font-mono text-[10px] text-muted"
          >
            <PulseDot color="bg-clay" className="scale-75" /> thinks & remembers — never touches
            your files
          </motion.p>
        </div>

        <motion.div
          className="space-y-2"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.16, delayChildren: 0.7 } } }}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">Remembered</p>
          {MEMORIES.map(([kind, text]) => (
            <motion.div
              key={kind}
              variants={{ hidden: { opacity: 0, x: 18 }, show: { opacity: 1, x: 0 } }}
              className="rounded-lg border border-line bg-paper px-3 py-2"
            >
              <span className="font-mono text-[9px] uppercase tracking-wider text-moss">{kind}</span>
              <p className="text-[12px] leading-snug text-soot">{text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </MockWindow>
  )
}

/* ---------------- Agents: permission card + live run log ---------------- */

const RUN_LOG = [
  ['[run ] repo_health — safe commands', 'text-ink/85'],
  ['[scan] 214 files · 3 suggestions', 'text-ink/45'],
  ['[ask ] write HEALTH.md? → approved', 'text-violet-300'],
  ['[done] report saved · action logged', 'text-emerald-400'],
]

export function AgentsMock({ className = '' }) {
  return (
    <MockWindow dark title="agents — permission-scoped run" className={className}>
      <div className="grid gap-0 sm:grid-cols-[1fr_1.25fr]">
        <div className="border-b border-white/[0.07] p-5 sm:border-b-0 sm:border-r">
          <p className="font-serif text-lg text-ink">repo_health</p>
          <div className="mt-3 space-y-2 font-mono text-[10.5px]">
            <p className="text-ink/45">
              permission{' '}
              <span className="ml-1 rounded border border-violet-400/40 bg-violet-400/10 px-1.5 py-0.5 text-violet-300">
                safe commands
              </span>
            </p>
            <p className="text-ink/45">
              folder <span className="ml-1 text-ink/75">~/Projects/analizeRepo</span>
            </p>
            <p className="text-ink/45">
              commands <span className="ml-1 text-ink/75">allowlist only</span>
            </p>
          </div>
          <motion.button
            className="mt-5 rounded-full bg-ink px-4 py-1.5 font-mono text-[11px] font-semibold text-night"
            animate={{ boxShadow: ['0 0 0 0 rgba(143,106,224,0.5)', '0 0 0 9px rgba(143,106,224,0)'] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
          >
            ▶ Run
          </motion.button>
        </div>
        <div className="p-5">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.5 } } }}
            className="space-y-2.5 font-mono text-[12px] leading-relaxed"
          >
            {RUN_LOG.map(([text, color], i) => (
              <motion.p
                key={i}
                variants={{ hidden: { opacity: 0, x: -8 }, show: { opacity: 1, x: 0 } }}
                className={color}
              >
                {text}
              </motion.p>
            ))}
            <Cursor dark />
          </motion.div>
        </div>
      </div>
    </MockWindow>
  )
}

/* ---------------- Activity: live agent rows ---------------- */

const ROWS = [
  { name: 'Olympus', provider: 'Codex', dot: 'bg-sky-400' },
  { name: 'Gaia', provider: 'OpenCode', dot: 'bg-emerald-400' },
  { name: 'Atlantis', provider: 'Claude', dot: 'bg-violet-400' },
]

export function ActivityMock({ className = '' }) {
  return (
    <MockWindow dark title="agent activity — right dock" className={className}>
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.18 } } }}
        className="divide-y divide-white/[0.06]"
      >
        {ROWS.map((r) => (
          <motion.div
            key={r.name}
            variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
            className="flex items-center gap-3 px-5 py-4"
          >
            <PulseDot color={r.dot} />
            <span className="font-mono text-[13px] font-semibold text-ink">{r.name}</span>
            <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 font-mono text-[10px] text-ink/60">
              {r.provider}
            </span>
            <span className="ml-auto font-mono text-[10px] text-ink/35">live · click to restore</span>
          </motion.div>
        ))}
      </motion.div>
    </MockWindow>
  )
}
