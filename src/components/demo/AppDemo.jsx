import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { IconSettings } from './Icons.jsx'
import { NAV_ICONS } from './nav-icons.js'

/* ============================================================
   Interactive in-browser replica of the Akorith desktop app.
   Click the sidebar, switch views, type in the chats — replies
   are canned and always point to the real download.
   Styled to match the app itself (system font, app grays),
   not the site's pixel/editorial theme.
   ============================================================ */

const T = {
  shell: 'bg-[#141416]',
  side: 'bg-[#232326]',
  sideActive: 'bg-[#3a3a3f] text-white',
  card: 'bg-[#1d1d20]',
  cardBorder: 'border-white/[0.07]',
  input: 'bg-[#232326]',
  text: 'text-[#ececec]',
  dim: 'text-[#9a9aa1]',
  faint: 'text-[#6b6b72]',
}

/* ---------------- canned demo replies ---------------- */

const REPLIES = [
  'The project pass is complete. I inspected the current structure, applied the focused change, and verified the production build.',
  'I finished the requested update and kept the result scoped to this project. The changed files and verification summary are below.',
  'The implementation is ready for review. No commit or push was performed; Akorith only recorded the local project delta.',
]

const ATHENA_REPLIES = [
  "I'm only the demo Athena — the real me remembers your goals, preferences, and projects across sessions. Download Akorith and let's actually talk.",
  'In the full app I think and remember, but never touch your files. This browser page can do neither — the download button can fix that.',
]

function DownloadNudge() {
  return (
    <span className="mt-2 flex flex-wrap items-center gap-3">
      <Link
        to="/download"
        className="rounded-full bg-white px-3.5 py-1.5 text-[12px] font-semibold text-black transition-colors hover:bg-[#c9b6f5]"
      >
        Download Akorith ↓
      </Link>
      <span className={`font-mono text-[10px] ${T.faint}`}>free · open source · local-first</span>
    </span>
  )
}

/** Types out reply text, then reveals the download nudge. */
function TypedReply({ text, onDone }) {
  const [len, setLen] = useState(0)
  const done = len >= text.length
  useEffect(() => {
    const id = setInterval(() => setLen((v) => (v >= text.length ? v : v + 2)), 18)
    return () => clearInterval(id)
  }, [text])
  useEffect(() => {
    if (done && onDone) onDone()
  }, [done, onDone])
  return (
    <>
      <span>{text.slice(0, len)}</span>
      {done && <DownloadNudge />}
    </>
  )
}

/* ---------------- shared chat thread ---------------- */

function Thread({ messages, speaker = 'akorith', endRef }) {
  return (
    <div className="space-y-3">
      {messages.map((m, i) =>
        m.role === 'user' ? (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-sm bg-white px-4 py-2 text-[13px] text-black"
          >
            {m.text}
          </motion.div>
        ) : (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`w-fit max-w-[92%] rounded-2xl rounded-bl-sm border ${T.cardBorder} ${T.card} px-4 py-2.5 text-[13px] leading-relaxed ${T.text}`}
          >
            <span className={`mb-1 block font-mono text-[9.5px] uppercase tracking-wider ${T.faint}`}>
              {speaker}
            </span>
            {m.typed ? <TypedReply text={m.text} /> : m.text}
          </motion.div>
        ),
      )}
      <div ref={endRef} />
    </div>
  )
}

function useChat(replies) {
  const [messages, setMessages] = useState([])
  const [busy, setBusy] = useState(false)
  const n = useRef(0)
  const endRef = useRef(null)
  const replyTimer = useRef(null)

  useEffect(() => () => {
    if (replyTimer.current) window.clearTimeout(replyTimer.current)
  }, [])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [messages])

  const send = (text) => {
    if (!text.trim() || busy) return false
    setMessages((m) => [...m, { role: 'user', text: text.trim() }])
    setBusy(true)
    replyTimer.current = window.setTimeout(() => {
      setMessages((m) => [...m, { role: 'assistant', text: replies[n.current % replies.length], typed: true }])
      n.current += 1
      setBusy(false)
      replyTimer.current = null
    }, 700)
    return true
  }
  return { messages, send, busy, endRef, setMessages }
}

function ChatInput({ placeholder, onSend, accent = true }) {
  const [value, setValue] = useState('')
  const submit = () => {
    if (onSend(value)) setValue('')
  }
  return (
    <div className={`rounded-xl border ${T.cardBorder} ${T.input} px-4 py-3`}>
      <div className="flex items-center gap-3">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          placeholder={placeholder}
          className={`w-full bg-transparent text-[13px] outline-none placeholder:text-[#6b6b72] ${T.text}`}
        />
        <button
          onClick={submit}
          aria-label="Send"
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm transition-colors ${
            accent ? 'bg-white text-black hover:bg-[#c9b6f5]' : 'bg-white/10 text-white'
          }`}
        >
          ➤
        </button>
      </div>
    </div>
  )
}

/* ================= WORKSPACE ================= */

const WORKSPACE_MODELS = ['OpenCode · kimi-k2.7-code', 'Codex · GPT-5.4', 'Claude · Sonnet']

function WorkspaceTrace({ busy }) {
  const steps = busy
    ? ['Reading project context', 'Planning the focused change']
    : ['Read project context', 'Updated the requested interface', 'Verified the production build']
  return (
    <div className={`mt-4 border-t ${T.cardBorder} pt-4`}>
      <p className={`text-[11px] ${T.dim}`}>{busy ? 'Working for 8s' : 'Worked for 18s'}</p>
      <div className="mt-3 space-y-2">
        {steps.map((step, index) => (
          <div key={step} className="flex items-start gap-2.5">
            <span className={`mt-1 h-2 w-2 shrink-0 rounded-full ${busy && index === steps.length - 1 ? 'animate-pulse bg-violet-400' : 'bg-emerald-400'}`} />
            <div>
              <p className={`text-[12px] font-medium ${T.text}`}>{step}</p>
              <p className={`mt-0.5 text-[10.5px] leading-relaxed ${T.dim}`}>
                {index === 0 ? 'Loaded the selected folder and bounded project memory.' : index === 1 ? 'Kept the next action small and visible in the conversation.' : 'Typecheck and build completed without errors.'}
              </p>
            </div>
          </div>
        ))}
      </div>
      {!busy && (
        <div className={`mt-4 grid grid-cols-3 gap-2 rounded-lg border ${T.cardBorder} bg-black/20 p-3 font-mono text-[9.5px] ${T.dim}`}>
          <span>2 files changed</span><span className="text-emerald-400">+84 lines</span><span className="text-red-300">−19 lines</span>
        </div>
      )}
    </div>
  )
}

export function WorkspaceView({ seed }) {
  const { messages, send, busy, endRef, setMessages } = useChat(REPLIES)
  const [modelIndex, setModelIndex] = useState(0)
  const seeded = useRef('')

  useEffect(() => {
    if (seed && seed !== seeded.current) {
      seeded.current = seed
      setMessages([
        { role: 'user', text: seed },
        { role: 'assistant', text: REPLIES[0], typed: false },
      ])
    }
  }, [seed, setMessages])

  return (
    <div className="flex h-full flex-col justify-center px-5 py-8 sm:px-10">
      {messages.length === 0 ? (
        <div className="text-center">
          <h3 className={`text-xl font-semibold sm:text-2xl ${T.text}`}>
            What should we build in AkorithWeb?
          </h3>
          <p className={`mt-2 text-[13px] ${T.dim}`}>
            Choose a model and work directly inside this project.
          </p>
        </div>
      ) : (
        <div className="mb-5 max-h-64 overflow-y-auto pr-1">
          <Thread messages={messages} endRef={endRef} />
          <WorkspaceTrace busy={busy} />
        </div>
      )}

      <div className={`mx-auto mt-6 w-full max-w-xl rounded-2xl border ${T.cardBorder} ${T.input} p-4`}>
        <ChatInputInner onSend={send} />
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setModelIndex((current) => (current + 1) % WORKSPACE_MODELS.length)}
            className={`flex items-center gap-1.5 rounded-full border ${T.cardBorder} px-3 py-1 font-mono text-[10.5px] ${T.dim}`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <b className={T.text}>{WORKSPACE_MODELS[modelIndex]}</b> ⌄
          </button>
          <span className={`rounded-full px-2.5 py-1 font-mono text-[10.5px] ${T.faint}`}>✦ Plan · Queue · @ files</span>
        </div>
      </div>
      <p className={`mx-auto mt-3 flex items-center gap-1.5 font-mono text-[10px] ${T.faint}`}>
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Project memory on · direct project editing
      </p>
    </div>
  )
}

function ChatInputInner({ onSend }) {
  const [value, setValue] = useState('')
  const submit = () => {
    if (onSend(value)) setValue('')
  }
  return (
    <div className="flex items-center gap-3">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && submit()}
        placeholder="Describe a task for AkorithWeb…  (Enter to send)"
        className={`w-full bg-transparent text-[13px] outline-none placeholder:text-[#6b6b72] ${T.text}`}
      />
      <button
        onClick={submit}
        aria-label="Send"
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-sm text-black transition-colors hover:bg-[#c9b6f5]"
      >
        ➤
      </button>
    </div>
  )
}

/* ================= DASHBOARD ================= */

const DASH_STATS = [
  ['1.2M', 'Lifetime tokens'],
  ['970.9K', 'Peak tokens'],
  ['6m 4s', 'Longest task'],
  ['3 days', 'Current streak'],
  ['5 days', 'Longest streak'],
]

function ActivityGrid({ github = false }) {
  return (
    <div className="mt-3 grid grid-cols-[repeat(36,minmax(0,1fr))] gap-1">
      {Array.from({ length: 36 * 5 }).map((_, index) => {
        const hot = index > (github ? 142 : 158) && index % (github ? 6 : 7) !== 0
        const peak = index === (github ? 166 : 170)
        const color = github
          ? peak ? 'bg-[#39d353]' : hot ? 'bg-[#26a641]/70' : 'bg-white/[0.04]'
          : peak ? 'bg-violet-400' : hot ? 'bg-emerald-400/45' : 'bg-white/[0.04]'
        return <span key={index} className={`aspect-square rounded-[2px] border border-white/[0.04] ${color}`} />
      })}
    </div>
  )
}

export function DashboardView() {
  return (
    <div className="px-5 py-6 sm:px-8">
      <div className="text-center">
        <div className="mx-auto h-14 w-14 rounded-full border border-violet-400/40 bg-gradient-to-br from-violet-400/70 to-emerald-400/60" />
        <h3 className={`mt-3 text-2xl font-semibold ${T.text}`}>Ibrahim</h3>
        <p className={`mt-1 text-[12px] ${T.dim}`}>@local · <span className={`rounded-full border ${T.cardBorder} px-2 py-0.5`}>Akorith</span></p>
      </div>

      <motion.div
        className={`mx-auto mt-5 grid max-w-3xl grid-cols-2 overflow-hidden rounded-xl border ${T.cardBorder} lg:grid-cols-5`}
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
      >
        {DASH_STATS.map(([value, label]) => (
          <motion.div
            key={label}
            variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
            className={`border-r border-white/[0.05] p-3 text-center ${T.card}`}
          >
            <p className={`text-[14px] font-semibold ${T.text}`}>{value}</p>
            <p className={`mt-1 text-[9.5px] ${T.dim}`}>{label}</p>
          </motion.div>
        ))}
      </motion.div>

      <div className="mx-auto mt-5 max-w-3xl">
        <div className="flex items-center justify-between">
          <p className={`text-[12px] font-semibold ${T.text}`}>Token activity</p>
          <span className={`text-[10px] ${T.dim}`}>Daily</span>
        </div>
        <ActivityGrid />
        <div className="mt-4 flex items-center justify-between">
          <p className={`text-[12px] font-semibold ${T.text}`}>GitHub activity</p>
          <span className={`text-[10px] ${T.dim}`}>@saitakarcesme</span>
        </div>
        <ActivityGrid github />
        <div className={`mt-5 border-t ${T.cardBorder} pt-4`}>
          <div className="flex items-center justify-between"><p className={`text-[12px] font-semibold ${T.text}`}>Compute usage</p><span className={`font-mono text-[9px] ${T.faint}`}>THIS MAC · CPU 38%</span></div>
          <svg viewBox="0 0 600 54" className="mt-2 h-12 w-full" preserveAspectRatio="none" aria-hidden>
            <path d="M0 39 C35 36 55 16 90 24 S145 46 185 30 240 12 280 26 335 45 380 31 430 10 470 25 530 43 600 18" fill="none" stroke="#7b7b82" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  )
}

/* ================= PLUGINS ================= */

const PLUGIN_CATS = ['All', 'Providers', 'Developer', 'Documents', 'Media', 'Data']
const PLUGINS = [
  {
    name: 'OpenCode',
    cat: 'Providers',
    status: 'AVAILABLE',
    desc: 'Runs installed OpenCode models directly inside project chats and durable goals.',
    note: 'Detected: opencode 1.17.13',
  },
  {
    name: 'Git',
    cat: 'Developer',
    status: 'AVAILABLE',
    desc: 'Read-only repository context and completion deltas with no automatic push authority.',
    note: 'Detected: git 2.50.1',
  },
  {
    name: 'ripgrep',
    cat: 'Developer',
    status: 'AVAILABLE',
    desc: 'Fast bounded project search for files and text during local model work.',
    note: 'Detected: ripgrep 15.1.0',
  },
  {
    name: 'Pandoc',
    cat: 'Documents',
    status: 'AVAILABLE',
    desc: 'Local document conversion capability surfaced to compatible tasks.',
    note: 'Detected: pandoc 3.7.0',
  },
  {
    name: 'FFmpeg',
    cat: 'Media',
    status: 'AVAILABLE',
    desc: 'Audited local audio and video inspection or conversion capability.',
    note: 'Detected: ffmpeg 7.1',
  },
  {
    name: 'SQLite',
    cat: 'Data',
    status: 'AVAILABLE',
    desc: 'Local database inspection capability with a static installation diagnostic.',
    note: 'Detected: sqlite 3.50.2',
  },
]

const STATUS_STYLE = {
  AVAILABLE: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10',
  UNAVAILABLE: 'text-amber-400 border-amber-400/30 bg-amber-400/10',
  PLANNED: 'text-[#9a9aa1] border-white/15 bg-white/5',
}

export function PluginsView() {
  const [cat, setCat] = useState('All')
  const shown = PLUGINS.filter((p) => cat === 'All' || p.cat === cat)
  return (
    <div className="px-5 py-6 sm:px-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className={`text-xl font-semibold ${T.text}`}>Plugins</h3>
          <p className={`mt-1 text-[12.5px] ${T.dim}`}>
            Provider CLIs and audited local tools detected on this Mac.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`rounded-full border ${T.cardBorder} px-3 py-1 font-mono text-[10px] ${T.dim}`}>
            21/24 ready
          </span>
          <span className="rounded-full bg-white px-3 py-1 font-mono text-[10px] font-semibold text-black">
            Re-check all
          </span>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {PLUGIN_CATS.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`rounded-full px-3 py-1 text-[11.5px] transition-colors ${
              cat === c ? 'bg-white font-semibold text-black' : `${T.dim} hover:text-white`
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <motion.div layout className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shown.map((p) => (
            <motion.div
              layout
              key={p.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className={`rounded-xl border ${T.cardBorder} ${T.card} p-4`}
            >
              <div className="flex items-start justify-between gap-2">
                <p className={`text-[13px] font-semibold leading-snug ${T.text}`}>{p.name}</p>
                <span
                  className={`shrink-0 rounded-full border px-2 py-0.5 font-mono text-[8.5px] ${STATUS_STYLE[p.status]}`}
                >
                  {p.status}
                </span>
              </div>
              <p className={`mt-0.5 font-mono text-[9.5px] uppercase tracking-wider ${T.faint}`}>
                {p.cat} · v0.1.0 · built-in
              </p>
              <p className={`mt-2 text-[11.5px] leading-relaxed ${T.dim}`}>{p.desc}</p>
              <p className={`mt-2 rounded-md border ${T.cardBorder} bg-black/20 px-2.5 py-1.5 font-mono text-[10px] ${T.dim}`}>
                {p.note}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

/* ================= COMPANIONS ================= */

const MEMORIES = [
  ['PREFERENCE', 'Development Workflow', 'Prefers commit-heavy development.'],
  ['TECHNICAL', 'Primary stack', 'Electron + React + better-sqlite3, local-first.'],
  ['WARNING', 'Test Integrity', 'Strongly dislikes fake or invisible tests.'],
]

export function CompanionsView() {
  const { messages, send, endRef } = useChat(ATHENA_REPLIES)
  const [companion, setCompanion] = useState('Athena')
  return (
    <div className="grid h-full lg:grid-cols-[200px_1fr_210px]">
      {/* companion list */}
      <div className={`hidden border-r ${T.cardBorder} p-4 lg:block`}>
        <h3 className={`text-[15px] font-semibold ${T.text}`}>Companions</h3>
        <p className={`mt-1 text-[10.5px] leading-snug ${T.dim}`}>
          Think and remember. Companions never touch your files.
        </p>
        {[
          ['Athena', 'A', 'warm · wise · supportive'],
          ['Zeus', 'Z', 'direct · decisive'],
        ].map(([name, initial, traits]) => (
          <button
            key={name}
            onClick={() => setCompanion(name)}
            className={`mt-3 block w-full rounded-xl border p-3 text-left transition-colors ${
              companion === name ? `${T.cardBorder} ${T.card}` : 'border-transparent hover:bg-white/[0.03]'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <span className={`flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-[13px] font-semibold ${T.text}`}>
                {initial}
              </span>
              <span>
                <span className={`block text-[13px] font-semibold ${T.text}`}>{name}</span>
                <span className={`block font-mono text-[9px] ${T.faint}`}>{traits}</span>
              </span>
            </span>
          </button>
        ))}
      </div>

      {/* chat */}
      <div className="flex min-h-[320px] min-w-0 flex-col p-4 sm:p-5">
        <p className={`border-b ${T.cardBorder} pb-3 text-[13px] ${T.dim}`}>
          <b className={T.text}>{companion}</b>{' '}
          {companion === 'Athena'
            ? '· warm, wise, emotionally steady — your thoughtful companion.'
            : '· direct, protective, decisive — the push to move.'}
        </p>
        <div className="my-4 flex-1 space-y-3 overflow-y-auto pr-1">
          {messages.length === 0 && (
            <div className={`w-fit max-w-[92%] rounded-2xl rounded-bl-sm border ${T.cardBorder} ${T.card} px-4 py-2.5 text-[13px] leading-relaxed ${T.text}`}>
              <span className={`mb-1 block font-mono text-[9.5px] uppercase tracking-wider ${T.faint}`}>
                {companion}
              </span>
              {companion === 'Athena'
                ? 'I remember your goals and how you like to work. What are we untangling today?'
                : 'See the mountain, choose the strike, move. What is your next step?'}
            </div>
          )}
          <Thread messages={messages} speaker={companion} endRef={endRef} />
        </div>
        <ChatInput placeholder={`Message ${companion}…`} onSend={send} />
      </div>

      {/* memory panel */}
      <div className={`hidden border-l ${T.cardBorder} p-4 lg:block`}>
        <div className="flex items-center justify-between">
          <p className={`font-mono text-[10px] uppercase tracking-wider ${T.dim}`}>Memory</p>
          <span className={`rounded-full border ${T.cardBorder} px-2 py-0.5 font-mono text-[9px] ${T.dim}`}>
            Extract
          </span>
        </div>
        <div className="mt-3 space-y-2.5">
          {MEMORIES.map(([kind, title, body]) => (
            <div key={title} className={`rounded-lg border ${T.cardBorder} ${T.card} p-2.5`}>
              <p className={`font-mono text-[8.5px] uppercase tracking-wider ${T.faint}`}>{kind}</p>
              <p className={`mt-0.5 text-[11.5px] font-semibold ${T.text}`}>{title}</p>
              <p className={`mt-0.5 text-[10px] leading-snug ${T.dim}`}>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ================= AGENTS ================= */

const AGENTS = [
  ['FirstAgent', 'ask write · 1 run'],
  ['Repo Health', 'preview · 0 runs'],
  ['Test folder_analyzer', 'preview · 2 runs'],
  ['Custom Notes Summarizer', 'preview · 1 run'],
  ['Test commit_assistant', 'safe commands · 1 run'],
  ['Test changelog_maker', 'safe commands · 1 run'],
]

export function AgentsView() {
  const [selected, setSelected] = useState('Test folder_analyzer')
  const [history, setHistory] = useState([
    'Folder structure overview, notable files, and observations',
    'Folder contains data.csv, draft.md, invoice.pdf, notes.txt…',
  ])
  const runPreview = () =>
    setHistory((h) => [
      'Demo preview — download Akorith to run agents against real folders',
      ...h,
    ])

  return (
    <div className="grid h-full min-w-0 md:grid-cols-[220px_1fr]">
      <div className={`min-w-0 border-b md:border-b-0 md:border-r ${T.cardBorder} p-4`}>
        <div className="flex items-center justify-between">
          <p className={`font-mono text-[10px] uppercase tracking-wider ${T.dim}`}>Your agents</p>
          <span className="rounded-full bg-white px-2.5 py-0.5 font-mono text-[9px] font-semibold text-black">
            + Create
          </span>
        </div>
        <div className="mt-3 flex gap-2 overflow-x-auto md:block md:space-y-2 md:overflow-visible">
          {AGENTS.map(([name, meta]) => (
            <button
              key={name}
              onClick={() => setSelected(name)}
              className={`shrink-0 rounded-xl border p-3 text-left transition-colors md:w-full ${
                selected === name
                  ? `${T.cardBorder} ${T.card}`
                  : 'border-transparent hover:bg-white/[0.03]'
              }`}
            >
              <p className={`whitespace-nowrap text-[12px] font-semibold md:whitespace-normal ${T.text}`}>
                {name}
              </p>
              <p className={`mt-0.5 font-mono text-[9px] ${T.faint}`}>{meta}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="min-w-0 p-4 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className={`text-lg font-semibold ${T.text}`}>{selected}</h3>
            <p className={`mt-0.5 text-[12px] ${T.dim}`}>Summarize a folder structure and large files.</p>
          </div>
          <span className={`rounded-full border border-red-400/30 bg-red-400/10 px-3 py-1 font-mono text-[10px] text-red-300`}>
            Delete
          </span>
        </div>

        <div className={`mt-4 rounded-xl border ${T.cardBorder} ${T.card} p-4 font-mono text-[11px]`}>
          <div className="flex justify-between gap-4 py-1">
            <span className={T.dim}>Permission</span>
            <span className={T.text}>preview</span>
          </div>
          <div className="flex justify-between gap-4 py-1">
            <span className={T.dim}>Folder</span>
            <span className={`truncate ${T.text}`}>~/Desktop/projects/…/organizer-sandbox</span>
          </div>
          <div className="flex justify-between gap-4 py-1">
            <span className={T.dim}>Commands</span>
            <span className={T.text}>off</span>
          </div>
          <p className={`mt-2 border-t ${T.cardBorder} pt-2 text-[10px] ${T.faint}`}>
            Preview only: plans and previews changes, writes nothing and runs nothing.
          </p>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <div className={`flex-1 rounded-lg border ${T.cardBorder} ${T.input} px-3 py-2 text-[12px] ${T.faint}`}>
            Optional input for this run…
          </div>
          <button
            onClick={runPreview}
            className="rounded-lg bg-white px-4 py-2 text-[12px] font-semibold text-black transition-colors hover:bg-[#c9b6f5]"
          >
            Preview
          </button>
        </div>

        <p className={`mt-5 font-mono text-[10px] uppercase tracking-wider ${T.dim}`}>Run history</p>
        <div className="mt-2 space-y-2">
          <AnimatePresence initial={false}>
            {history.map((h, i) => (
              <motion.p
                key={h + i}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-start gap-2 text-[11.5px] ${T.dim}`}
              >
                <span className="shrink-0 font-mono text-[9.5px] font-semibold uppercase text-emerald-400">
                  completed
                </span>
                <span className="truncate">{h}</span>
              </motion.p>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

/* ================= SETTINGS ================= */

const SETTINGS_NAV = [
  ['General', 'Identity and theme'],
  ['Providers', 'Claude, ChatGPT, Ollama'],
  ['Telemetry', 'This Mac and connected computer'],
  ['Update', 'Install the latest Akorith'],
  ['Workflow', 'Project context and queues'],
  ['Benchmark', 'Defaults and exports'],
  ['Data', 'Storage and safety'],
]

export function SettingsView() {
  const [section, setSection] = useState('General')
  const [name, setName] = useState('Ibrahim')
  const [theme, setTheme] = useState('Dark')
  const [saved, setSaved] = useState(false)

  return (
    <div className="grid h-full min-w-0 md:grid-cols-[210px_1fr]">
      <div className={`min-w-0 border-b md:border-b-0 md:border-r ${T.cardBorder} p-4`}>
        <h3 className={`text-[15px] font-semibold ${T.text}`}>Settings</h3>
        <p className={`text-[10.5px] ${T.dim}`}>Akorith workspace controls</p>
        <div className="mt-3 flex gap-2 overflow-x-auto md:block md:space-y-1.5 md:overflow-visible">
          {SETTINGS_NAV.map(([label, sub]) => (
            <button
              key={label}
              onClick={() => setSection(label)}
              className={`shrink-0 rounded-lg border px-3 py-2 text-left transition-colors md:w-full ${
                section === label
                  ? `${T.cardBorder} ${T.card}`
                  : 'border-transparent hover:bg-white/[0.03]'
              }`}
            >
              <span className={`block whitespace-nowrap text-[12.5px] font-semibold md:whitespace-normal ${T.text}`}>
                {label}
              </span>
              <span className={`hidden text-[10px] md:block ${T.faint}`}>{sub}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="min-w-0 p-4 sm:p-6">
        {section === 'General' ? (
          <>
            <h4 className={`text-lg font-semibold ${T.text}`}>General</h4>
            <p className={`text-[12px] ${T.dim}`}>Local display and app appearance.</p>

            <p className={`mt-4 text-[11.5px] font-medium ${T.dim}`}>Display name</p>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`mt-1.5 w-full rounded-lg border ${T.cardBorder} ${T.input} px-3 py-2 text-[13px] outline-none focus:border-white/25 ${T.text}`}
            />

            <p className={`mt-4 text-[11.5px] font-medium ${T.dim}`}>Theme</p>
            <div className={`mt-1.5 grid grid-cols-2 rounded-lg border ${T.cardBorder} p-1`}>
              {['Light', 'Dark'].map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`relative rounded-md py-1.5 text-[12.5px] transition-colors ${
                    theme === t ? 'text-white' : T.faint
                  }`}
                >
                  {theme === t && (
                    <motion.span layoutId="demo-theme" className="absolute inset-0 rounded-md bg-white/10" />
                  )}
                  <span className="relative">{t}</span>
                </button>
              ))}
            </div>
            {theme === 'Light' && (
              <p className={`mt-1.5 font-mono text-[10px] text-amber-300/80`}>
                the demo stays dark — the real app really switches ✦
              </p>
            )}

            <div className="mt-4 grid grid-cols-3 gap-2">
              {[
                ['Available providers', '4/4'],
                ['Project memory', 'On'],
                ['App version', '0.7.6'],
              ].map(([label, value]) => (
                <div key={label} className={`rounded-lg border ${T.cardBorder} ${T.card} p-3`}>
                  <p className={`truncate text-[10px] ${T.faint}`}>{label}</p>
                  <p className={`mt-0.5 text-[13px] font-semibold ${T.text}`}>{value}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                setSaved(true)
                setTimeout(() => setSaved(false), 1800)
              }}
              className="mt-4 rounded-lg bg-white px-4 py-2 text-[12px] font-semibold text-black transition-colors hover:bg-[#c9b6f5]"
            >
              {saved ? '✓ saved locally' : 'Save changes'}
            </button>
          </>
        ) : (
          <div className="flex h-full min-h-[240px] flex-col items-center justify-center text-center">
            <p className={`text-[14px] font-semibold ${T.text}`}>{section}</p>
            <p className={`mt-1.5 max-w-[260px] text-[12px] ${T.dim}`}>
              This panel lives in the full app.
            </p>
            <Link
              to="/download"
              className="mt-4 rounded-full bg-white px-4 py-1.5 text-[12px] font-semibold text-black transition-colors hover:bg-[#c9b6f5]"
            >
              Download Akorith ↓
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

/* ================= RESEARCH ================= */

const RESEARCH_PHASES = ['Plan', 'Discover', 'Verify', 'Synthesize', 'Publish']
const RESEARCH_DEPTHS = [
  ['Quick', '~10 min'],
  ['Research', '~1 hour'],
  ['Deep', '10+ hours'],
  ['Continuous', 'until paused'],
]
const RESEARCH_MODELS = ['Claude · Sonnet', 'OpenCode · glm-5.2', 'Codex · GPT-5.4']
const RESEARCH_FORMATS = ['PDF', 'DOCX', 'Markdown', 'XLSX']
const RESEARCH_PLANS = [
  ['Map the field', 'Find current benchmark suites, model cards, and independent evaluations.'],
  ['Build the evidence ledger', 'Deduplicate sources and connect each model profile to supporting claims.'],
  ['Compare and publish', 'Resolve conflicting scores, synthesize one-page profiles, and export the atlas.'],
]
const RESEARCH_BOOKS = [
  ['Frontier Model Atlas', 'PDF · 86 sources', 'from-violet-500/55 to-emerald-500/20'],
  ['Local Coding Model Index', 'XLSX · 43 sources', 'from-emerald-500/45 to-sky-500/15'],
  ['Agent UI Field Notes', 'DOCX · 29 sources', 'from-sky-500/35 to-violet-500/30'],
]

function ResearchLibraryDemo({ onOpen }) {
  return (
    <div className="p-4 sm:p-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className={`font-mono text-[9px] uppercase tracking-[0.18em] ${T.faint}`}>Research library</p>
          <h3 className={`mt-1 text-[17px] font-semibold ${T.text}`}>Published reports</h3>
        </div>
        <span className={`rounded-full border ${T.cardBorder} px-3 py-1 font-mono text-[9px] ${T.dim}`}>3 reports</span>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {RESEARCH_BOOKS.map(([title, meta, gradient], index) => (
          <button key={title} onClick={() => onOpen(index)} className="min-w-0 text-left">
            <motion.div whileHover={{ y: -4 }} className={`flex aspect-[210/297] flex-col rounded-lg border border-white/10 bg-gradient-to-br ${gradient} p-3`}>
              <span className="font-mono text-[6.5px] uppercase tracking-[0.18em] text-white/45">Akorith Research</span>
              <strong className="mt-5 break-words text-[10px] leading-snug text-white sm:text-[12px]">{title}</strong>
              <span className="mt-auto font-mono text-[7px] text-white/40">REV 0{index + 1}</span>
            </motion.div>
            <p className={`mt-2 truncate text-[10.5px] font-semibold ${T.text}`}>{title}</p>
            <p className={`mt-0.5 truncate font-mono text-[8px] ${T.faint}`}>{meta}</p>
          </button>
        ))}
      </div>
    </div>
  )
}

export function ResearchView() {
  const [surface, setSurface] = useState('run')
  const [topic, setTopic] = useState('Create a cited atlas of frontier AI models and their benchmark performance.')
  const [depth, setDepth] = useState(1)
  const [model, setModel] = useState(0)
  const [format, setFormat] = useState('PDF')
  const [phase, setPhase] = useState(1)
  const [running, setRunning] = useState(true)
  const [activeTab, setActiveTab] = useState(0)
  const tabs = ['Frontier model atlas', 'Agent UI patterns']

  useEffect(() => {
    if (!running) return undefined
    if (phase >= RESEARCH_PHASES.length - 1) {
      setRunning(false)
      return undefined
    }
    const id = window.setTimeout(() => setPhase((current) => current + 1), 3200)
    return () => window.clearTimeout(id)
  }, [phase, running])

  const start = () => {
    if (!topic.trim()) return
    setPhase(0)
    setRunning(true)
    setSurface('run')
  }

  if (surface === 'library') {
    return (
      <div>
        <div className={`flex items-center justify-between border-b ${T.cardBorder} px-4 py-3 sm:px-6`}>
          <div className="flex gap-1" role="tablist" aria-label="Research surfaces">
            <button role="tab" aria-selected="false" onClick={() => setSurface('run')} className={`rounded-full px-3 py-1 text-[10px] ${T.dim}`}>Research</button>
            <button role="tab" aria-selected="true" className="rounded-full bg-white px-3 py-1 text-[10px] font-semibold text-black">Library</button>
          </div>
          <button onClick={start} className="rounded-full bg-white px-3 py-1 text-[10px] font-semibold text-black">＋ New research</button>
        </div>
        <ResearchLibraryDemo onOpen={(index) => { setActiveTab(index % tabs.length); setSurface('run') }} />
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex min-w-0 gap-1 overflow-x-auto" role="tablist" aria-label="Concurrent research jobs">
          {tabs.map((tab, index) => (
            <button key={tab} role="tab" aria-selected={activeTab === index} onClick={() => setActiveTab(index)} className={`shrink-0 rounded-lg px-3 py-1.5 text-[10.5px] ${activeTab === index ? 'bg-white/10 text-white' : T.dim}`}>
              <span className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full ${running && index === activeTab ? 'animate-pulse bg-emerald-400' : 'bg-white/25'}`} />
              {tab}
            </button>
          ))}
        </div>
        <button onClick={() => setSurface('library')} className={`rounded-full border ${T.cardBorder} px-3 py-1 text-[9.5px] ${T.dim}`}>Library · 3</button>
      </div>

      <div className={`mt-4 rounded-xl border ${T.cardBorder} ${T.card} p-4`}>
        <textarea
          value={topic}
          onChange={(event) => setTopic(event.target.value)}
          aria-label="Research request"
          rows={2}
          className={`w-full resize-none bg-transparent text-[12px] leading-relaxed outline-none placeholder:text-[#6b6b72] ${T.text}`}
        />
        <div className={`mt-3 flex flex-wrap items-center gap-1.5 border-t ${T.cardBorder} pt-3`}>
          <button onClick={() => setModel((current) => (current + 1) % RESEARCH_MODELS.length)} className={`rounded-full border ${T.cardBorder} px-2.5 py-1 font-mono text-[8.5px] ${T.dim}`}>
            <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />{RESEARCH_MODELS[model]} ⌄
          </button>
          <div className="flex rounded-full border border-white/[0.07] p-0.5">
            {RESEARCH_DEPTHS.map(([name], index) => (
              <button key={name} aria-pressed={depth === index} onClick={() => setDepth(index)} className={`rounded-full px-2 py-0.5 text-[8.5px] ${depth === index ? 'bg-white/10 text-white' : T.faint}`}>{name}</button>
            ))}
          </div>
          <button onClick={() => setFormat(RESEARCH_FORMATS[(RESEARCH_FORMATS.indexOf(format) + 1) % RESEARCH_FORMATS.length])} className={`rounded-full border ${T.cardBorder} px-2.5 py-1 font-mono text-[8.5px] ${T.dim}`}>{format} ⌄</button>
          <button onClick={running ? () => setRunning(false) : start} aria-label={running ? 'Pause research' : 'Start research'} className={`ml-auto flex h-7 w-7 items-center justify-center rounded-full text-[10px] ${running ? 'bg-white/10 text-white' : 'bg-white text-black'}`}>
            {running ? 'Ⅱ' : '➤'}
          </button>
        </div>
      </div>

      <div className="relative mt-5 grid grid-cols-5 gap-1 before:absolute before:left-[10%] before:right-[10%] before:top-3 before:h-px before:bg-white/10">
        {RESEARCH_PHASES.map((name, index) => (
          <button key={name} aria-current={index === phase ? 'step' : undefined} onClick={() => setPhase(index)} className="relative z-10 flex min-w-0 flex-col items-center gap-1.5">
            <span className={`flex h-6 w-6 items-center justify-center rounded-full border font-mono text-[8px] ${index < phase ? 'border-emerald-400 bg-emerald-400 text-black' : index === phase ? 'border-violet-400 bg-[#1d1d20] text-white ring-4 ring-violet-400/10' : 'border-white/15 bg-[#1d1d20] text-[#6b6b72]'}`}>
              {index < phase ? '✓' : index + 1}
            </span>
            <small className={`truncate text-[8px] ${index === phase ? T.text : T.faint}`}>{name}</small>
          </button>
        ))}
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-[1.2fr_0.8fr]">
        <div className={`rounded-xl border ${T.cardBorder} bg-black/10 p-4`}>
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className={`text-[12px] font-semibold ${T.text}`}>{running ? RESEARCH_PHASES[phase] + ' in progress' : 'Report revision ready'}</p>
              <p className={`mt-0.5 font-mono text-[8.5px] ${T.faint}`}>{RESEARCH_DEPTHS[depth][1]} · {RESEARCH_MODELS[model]}</p>
            </div>
            <span className={`rounded-full border ${T.cardBorder} px-2 py-0.5 font-mono text-[8px] ${T.dim}`}>42 sources</span>
          </div>
          <div className={`mt-3 border-l ${T.cardBorder} pl-3`}>
            {RESEARCH_PLANS.map(([title, body], index) => (
              <div key={title} className="relative pb-2.5 last:pb-0">
                <span className={`absolute -left-[15px] top-1.5 h-1.5 w-1.5 rounded-full ${index < 2 ? 'bg-emerald-400' : 'animate-pulse bg-violet-400'}`} />
                <p className={`text-[10.5px] font-semibold ${T.text}`}>{title}</p>
                <p className={`mt-0.5 text-[9px] leading-relaxed ${T.dim}`}>{body}</p>
              </div>
            ))}
          </div>
        </div>
        <button onClick={() => setSurface('library')} className={`group flex min-h-40 flex-col rounded-xl border ${T.cardBorder} bg-gradient-to-br from-violet-500/35 via-[#25232b] to-emerald-500/20 p-4 text-left`}>
          <span className="font-mono text-[7px] uppercase tracking-[0.18em] text-white/40">Akorith Research</span>
          <strong className="mt-5 text-[13px] leading-snug text-white">Frontier Model Atlas</strong>
          <span className="mt-auto font-mono text-[8px] text-white/45">{format} · revision 04 · open library →</span>
        </button>
      </div>
    </div>
  )
}

/* ================= LOOP ================= */

const LOOP_PHASES = ['Understand', 'Plan', 'Execute', 'Analyze', 'Replan', 'Complete']
const LOOP_UPDATES = [
  ['Goal understood', 'Turned the request into one concrete outcome and a definition of done.'],
  ['Plan prepared', 'Selected the next bounded action that can be verified after execution.'],
  ['Executing cycle 2', 'The chosen CLI is working inside the scoped repository and recording evidence.'],
  ['Result analyzed', 'Compared changed files and verification results with the complete Goal.'],
  ['Remaining work replanned', 'Fed the most important unfinished requirement into the next cycle.'],
  ['Goal reached', 'All required evidence now matches the requested outcome.'],
]

export function LoopView() {
  const [activeTab, setActiveTab] = useState(0)
  const [phase, setPhase] = useState(2)
  const tabs = ['Ship responsive dashboard', 'Summarize research PDF']
  return (
    <div className="p-4 sm:p-6">
      <div className={`flex gap-1 border-b ${T.cardBorder} pb-3`}>
        {tabs.map((tab, index) => (
          <button key={tab} onClick={() => setActiveTab(index)} className={`rounded-lg px-3 py-1.5 text-[11px] ${activeTab === index ? 'bg-white/10 text-white' : T.dim}`}>{tab}</button>
        ))}
        <button className={`rounded-lg px-3 py-1.5 text-[11px] ${T.dim}`}>＋ New</button>
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div><p className={`font-mono text-[9px] uppercase tracking-wider ${T.faint}`}>Durable goal · cycle 2</p><h3 className={`mt-1 text-[16px] font-semibold ${T.text}`}>{tabs[activeTab]}</h3></div>
        <span className="rounded-full border border-violet-400/30 bg-violet-400/10 px-3 py-1 font-mono text-[9px] text-violet-300">{LOOP_PHASES[phase]}</span>
      </div>
      <div className={`relative mt-5 rounded-xl border ${T.cardBorder} ${T.card} px-4 py-5`}>
        <div className="relative grid grid-cols-6 gap-1 before:absolute before:left-[8%] before:right-[8%] before:top-3 before:h-px before:bg-white/10">
          {LOOP_PHASES.map((name, index) => (
            <button key={name} onClick={() => setPhase(index)} className="relative z-10 flex min-w-0 flex-col items-center gap-1.5">
              <span className={`flex h-6 w-6 items-center justify-center rounded-full border font-mono text-[8px] ${index < phase || phase === 5 ? 'border-emerald-400 bg-emerald-400 text-black' : phase === index ? 'border-violet-400 bg-[#1d1d20] text-white ring-4 ring-violet-400/10' : 'border-white/15 bg-[#1d1d20] text-[#6b6b72]'}`}>{index < phase || phase === 5 ? '✓' : index + 1}</span>
              <small className={`hidden truncate text-[8.5px] sm:block ${phase === index ? T.text : T.faint}`}>{name}</small>
            </button>
          ))}
        </div>
        <div className={`mt-5 border-l ${T.cardBorder} pl-4`}>
          {LOOP_UPDATES.slice(0, Math.max(1, phase + 1)).map(([title, body], index) => (
            <div key={title} className="relative pb-3 last:pb-0">
              <span className={`absolute -left-[19px] top-1.5 h-1.5 w-1.5 rounded-full ${index === phase ? 'animate-pulse bg-violet-400' : 'bg-emerald-400'}`} />
              <p className={`text-[11.5px] font-semibold ${T.text}`}>{title}</p>
              <p className={`mt-0.5 text-[10px] leading-relaxed ${T.dim}`}>{body}</p>
            </div>
          ))}
        </div>
      </div>
      <p className={`mt-4 text-[11px] leading-relaxed ${T.dim}`}>Every durable step explains what Akorith did. Analyze returns incomplete work to Plan; verified work exits to Complete.</p>
    </div>
  )
}

/* ================= BENCHMARK ================= */

const BENCHMARK_MODELS = ['OpenCode · glm-5.2', 'OpenCode · deepseek-v4', 'Ollama · qwen2.5-coder']
export function BenchmarkView() {
  const [challenge, setChallenge] = useState('UI behavior flow')
  const [selected, setSelected] = useState([0, 1])
  const toggle = (index) => setSelected((current) => current.includes(index) ? current.filter((item) => item !== index) : [...current, index])
  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-wrap items-end justify-between gap-3"><div><h3 className={`text-lg font-semibold ${T.text}`}>Benchmark</h3><p className={`mt-1 text-[11px] ${T.dim}`}>Run one challenge across models and compare objective performance.</p></div><select value={challenge} onChange={(event) => setChallenge(event.target.value)} className={`rounded-lg border ${T.cardBorder} ${T.input} px-3 py-2 text-[11px] ${T.text}`}><option>UI behavior flow</option><option>Token efficiency</option><option>Python test writing</option><option>Speed test</option></select></div>
      <div className="mt-4 flex flex-wrap gap-2">{BENCHMARK_MODELS.map((model, index) => <button key={model} onClick={() => toggle(index)} className={`rounded-full border px-3 py-1.5 font-mono text-[9.5px] ${selected.includes(index) ? 'border-emerald-400/40 bg-emerald-400/10 text-emerald-300' : `${T.cardBorder} ${T.dim}`}`}>{selected.includes(index) ? '● ' : '○ '}{model}</button>)}</div>
      <div className={`mt-5 overflow-hidden rounded-xl border ${T.cardBorder}`}><div className={`grid grid-cols-[1.4fr_repeat(3,1fr)] border-b ${T.cardBorder} px-3 py-2 font-mono text-[8.5px] ${T.faint}`}><span>MODEL</span><span>UI FLOW</span><span>TOKENS</span><span>AVG</span></div>{BENCHMARK_MODELS.map((model, index) => <div key={model} className={`grid grid-cols-[1.4fr_repeat(3,1fr)] items-center border-b ${T.cardBorder} px-3 py-2.5 text-[10px] last:border-0`}><span className={`truncate ${T.text}`}>{model}</span><span className={index === 0 ? 'text-emerald-400' : 'text-violet-300'}>{[81,66,72][index]}</span><span>{[100,96,75][index]}</span><strong className={T.text}>{[91,81,74][index]}</strong></div>)}</div>
      <div className="mt-4 grid grid-cols-3 gap-2">{[['Leader','glm-5.2'],['Library average','82/100'],['Saved runs','16']].map(([label,value]) => <div key={label} className={`rounded-lg border ${T.cardBorder} ${T.card} p-3`}><p className={`font-mono text-[8px] uppercase ${T.faint}`}>{label}</p><p className={`mt-1 text-[11px] font-semibold ${T.text}`}>{value}</p></div>)}</div>
    </div>
  )
}

/* ================= SHELL ================= */

const NAV = ['New chat', 'Workspace', 'Loop', 'Research', 'Benchmark', 'Plugins']

const CHATS = ['hello', 'hey which model are you', 'which model are you tell me', 'hello']

const TITLES = {
  Workspace: 'analizeRepo · Project workspace',
  Loop: 'Loop',
  Research: 'Research',
  Dashboard: 'Dashboard',
  Benchmark: 'Benchmark',
  Plugins: 'Plugins',
  Settings: 'Settings',
}

export function AppDemo({ initial = 'Workspace', className = '' }) {
  const [view, setView] = useState(initial)
  const [seed, setSeed] = useState('')

  const go = (v) => {
    if (v === 'New chat') {
      setSeed('')
      setView('Workspace')
    } else setView(v)
  }
  const openChat = (text) => {
    setSeed(text)
    setView('Workspace')
  }

  return (
    <div
      className={`overflow-hidden rounded-2xl border border-white/10 ${T.shell} text-left font-sans shadow-[0_36px_90px_-30px_rgba(0,0,0,0.9)] ${className}`}
    >
      {/* top bar */}
      <div className={`flex items-center justify-between border-b ${T.cardBorder} px-4 py-2.5`}>
        <span className={`truncate text-[12.5px] font-semibold ${T.text}`}>{TITLES[view]}</span>
        <div className="flex items-center gap-2">
          <span className={`hidden rounded-md border ${T.cardBorder} px-2.5 py-1 text-[10.5px] sm:block ${T.dim}`}>
            Project workspace
          </span>
          <span className={`hidden items-center gap-1.5 rounded-md border ${T.cardBorder} px-2.5 py-1 text-[10.5px] sm:flex ${T.dim}`}>
            Changes
          </span>
          <span className="rounded-md border border-clay/40 bg-clay/15 px-2.5 py-1 font-mono text-[9.5px] text-clay-deep">
            live demo
          </span>
        </div>
      </div>

      <div className="grid min-w-0 md:grid-cols-[190px_1fr]">
        {/* sidebar */}
        <div className={`${T.side} hidden flex-col md:flex`}>
          <div className="flex-1 p-2.5">
            {NAV.map((item) => {
              const Icon = NAV_ICONS[item]
              return (
                <button
                  key={item}
                  onClick={() => go(item)}
                  className={`mb-0.5 flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-[12.5px] transition-colors ${
                    view === item ? T.sideActive : `${T.dim} hover:bg-white/[0.05] hover:text-white`
                  }`}
                >
                  <Icon className="h-[15px] w-[15px] opacity-80" />
                  {item}
                </button>
              )
            })}
            <p className={`mt-4 px-2.5 font-mono text-[9px] uppercase tracking-wider ${T.faint}`}>
              Projects <span className={`ml-1 rounded bg-white/10 px-1 ${T.dim}`}>1</span>
            </p>
            <p className={`mt-1.5 px-2.5 text-[12px] ${T.text}`}>▸ analizeRepo</p>
            <p className={`mt-4 px-2.5 font-mono text-[9px] uppercase tracking-wider ${T.faint}`}>Chats</p>
            <div className="mt-1">
              {CHATS.map((c, i) => (
                <button
                  key={i}
                  onClick={() => openChat(c)}
                  className={`block w-full truncate rounded-md px-2.5 py-1 text-left text-[11.5px] transition-colors ${T.dim} hover:bg-white/[0.05] hover:text-white`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div className={`flex items-center border-t ${T.cardBorder} p-2`}>
            <button onClick={() => go('Dashboard')} className="flex min-w-0 flex-1 items-center gap-2.5 rounded-md px-2 py-1.5 text-left transition-colors hover:bg-white/[0.04]">
              <span className={`flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-[11px] font-semibold ${T.text}`}>I</span>
              <span className={`truncate text-[12px] font-semibold ${T.text}`}>Ibrahim</span>
            </button>
            <button onClick={() => go('Settings')} aria-label="Settings" className="rounded-md p-2 transition-colors hover:bg-white/[0.04]">
              <IconSettings className={`h-4 w-4 ${T.faint}`} />
            </button>
          </div>
        </div>

        {/* mobile nav */}
        <div className={`flex gap-1 overflow-x-auto border-b ${T.cardBorder} p-2 md:hidden`}>
          {['Workspace', 'Loop', 'Research', 'Dashboard', 'Benchmark', 'Plugins', 'Settings'].map((item) => (
            <button
              key={item}
              onClick={() => go(item)}
              className={`shrink-0 rounded-full px-3 py-1 text-[11.5px] ${
                view === item ? 'bg-white font-semibold text-black' : T.dim
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* main view */}
        <div className="min-h-[440px] min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={view + seed}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="h-full"
            >
              {view === 'Workspace' && <WorkspaceView seed={seed} />}
              {view === 'Loop' && <LoopView />}
              {view === 'Research' && <ResearchView />}
              {view === 'Dashboard' && <DashboardView />}
              {view === 'Benchmark' && <BenchmarkView />}
              {view === 'Plugins' && <PluginsView />}
              {view === 'Settings' && <SettingsView />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

/* Standalone single-view frame for feature sections. */
export function DemoPanel({ view, title, className = '' }) {
  const Views = {
    workspace: WorkspaceView,
    dashboard: DashboardView,
    loop: LoopView,
    research: ResearchView,
    benchmark: BenchmarkView,
    plugins: PluginsView,
    settings: SettingsView,
  }
  const View = Views[view]
  return (
    <div
      className={`min-w-0 overflow-hidden rounded-2xl border border-white/10 ${T.shell} text-left font-sans shadow-[0_28px_70px_-28px_rgba(0,0,0,0.85)] ${className}`}
    >
      <div className={`flex items-center justify-between border-b ${T.cardBorder} px-4 py-2.5`}>
        <span className={`text-[12px] font-semibold ${T.text}`}>{title}</span>
        <span className="rounded-md border border-clay/40 bg-clay/15 px-2.5 py-1 font-mono text-[9.5px] text-clay-deep">
          live demo
        </span>
      </div>
      <View />
    </div>
  )
}
