import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { NAV_ICONS, IconSpark, IconSettings, IconLoop } from './Icons.jsx'

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
  "Nice prompt — but this is the browser demo, so no models were harmed. In the real app this goes straight to Claude, Codex, or OpenCode running on your machine.",
  "I'd love to plan that, but the demo has no engine under the hood. The real Akorith drives the agent CLIs you're already signed into — zero API keys.",
  'That one needs the real Agent OS. It installs with one line and lights up whatever CLIs you have.',
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

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [messages])

  const send = (text) => {
    if (!text.trim() || busy) return false
    setMessages((m) => [...m, { role: 'user', text: text.trim() }])
    setBusy(true)
    setTimeout(() => {
      setMessages((m) => [...m, { role: 'assistant', text: replies[n.current % replies.length], typed: true }])
      n.current += 1
      setBusy(false)
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

export function WorkspaceView({ seed }) {
  const { messages, send, endRef, setMessages } = useChat(REPLIES)
  const [model, setModel] = useState('Atlantis')
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
            What should we build in analizeRepo?
          </h3>
          <p className={`mt-2 text-[13px] ${T.dim}`}>
            Type a task — Akorith plans it and drives Codex, OpenCode, and Claude for you.
          </p>
        </div>
      ) : (
        <div className="mb-5 max-h-64 overflow-y-auto pr-1">
          <Thread messages={messages} endRef={endRef} />
        </div>
      )}

      <div className={`mx-auto mt-6 w-full max-w-xl rounded-2xl border ${T.cardBorder} ${T.input} p-4`}>
        <ChatInputInner onSend={send} />
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <span
            className={`flex items-center gap-1.5 rounded-full border ${T.cardBorder} px-3 py-1 font-mono text-[10.5px] ${T.dim}`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Claude{' '}
            <b className={T.text}>Default</b> ⌄
          </span>
          {['Olympus', 'Gaia', 'Atlantis'].map((m) => (
            <button
              key={m}
              onClick={() => setModel(m)}
              className={`rounded-full px-3 py-1 font-mono text-[10.5px] transition-colors ${
                model === m ? 'bg-white text-black' : `${T.dim} hover:text-white`
              }`}
            >
              {m}
            </button>
          ))}
          <span className={`rounded-full px-2.5 py-1 font-mono text-[10.5px] ${T.faint}`}>✦ More</span>
        </div>
      </div>
      <p className={`mx-auto mt-3 flex items-center gap-1.5 font-mono text-[10px] ${T.faint}`}>
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Session memory on · target{' '}
        {model}
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
        placeholder="Describe a task for analizeRepo…  (Enter to send)"
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
  ['ACTIVE WORKSPACE', 'analizeRepo', '~/Desktop/Projects/…'],
  ['RUNTIME OBSERVED', '3', '0 sessions / 3 PTYs'],
  ['PROVIDER USAGE', '1.2M', '4 recorded sessions'],
  ['TEST SIGNAL', '8 ✓', '8 passed / 1 failed'],
  ['LOOP ACTIVITY', '5', 'recent loops loaded'],
]

const DASH_VISIBILITY = [
  ['REGISTERED AGENTS', '5', '3 connected through runtime paths'],
  ['OBSERVED SESSIONS', '0', '0 active provider calls'],
  ['LOCAL RUNTIME', 'ok', 'conservative local detection'],
  ['RECENT CHAT', '15h ago', '“hello”'],
]

export function DashboardView() {
  return (
    <div className="px-5 py-6 sm:px-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className={`font-mono text-[9.5px] uppercase tracking-[0.2em] ${T.faint}`}>
            Agent OS command surface
          </p>
          <h3 className={`mt-1 text-xl font-semibold ${T.text}`}>Dashboard</h3>
          <p className={`mt-1 text-[12.5px] ${T.dim}`}>
            Local usage, runtime observation, loops, and test signal — read-only.
          </p>
        </div>
        <span className={`rounded-full border ${T.cardBorder} px-3 py-1 font-mono text-[10px] ${T.dim}`}>
          Observation only
        </span>
      </div>

      <motion.div
        className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-5"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
      >
        {DASH_STATS.map(([label, value, sub]) => (
          <motion.div
            key={label}
            variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
            className={`rounded-xl border ${T.cardBorder} ${T.card} p-4`}
          >
            <p className={`font-mono text-[9px] uppercase tracking-wider ${T.faint}`}>{label}</p>
            <p className={`mt-1.5 text-lg font-semibold ${T.text}`}>{value}</p>
            <p className={`mt-0.5 truncate text-[11px] ${T.dim}`}>{sub}</p>
          </motion.div>
        ))}
      </motion.div>

      <div className={`mt-4 rounded-xl border ${T.cardBorder} ${T.card} p-4`}>
        <div className="flex items-center justify-between">
          <p className={`text-[13px] font-semibold ${T.text}`}>Agent OS visibility</p>
          <span className={`font-mono text-[10px] ${T.faint}`}>checked just now</span>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {DASH_VISIBILITY.map(([label, value, sub]) => (
            <div key={label} className={`rounded-lg border ${T.cardBorder} bg-black/20 p-3`}>
              <p className={`font-mono text-[9px] uppercase tracking-wider ${T.faint}`}>{label}</p>
              <p className={`mt-1 text-[15px] font-semibold ${T.text}`}>{value}</p>
              <p className={`mt-0.5 truncate text-[10.5px] ${T.dim}`}>{sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ================= PLUGINS ================= */

const PLUGIN_CATS = ['All', 'Agents', 'Integrations', 'Telemetry', 'Memory', 'Browser']
const PLUGINS = [
  {
    name: 'OpenCode Agent (Gaia)',
    cat: 'Agents',
    status: 'AVAILABLE',
    desc: 'Routes prompts to the Gaia terminal; output is captured and summarized into chat.',
    note: 'Detected: 1.17.13 · Terminal (Gaia) ready',
  },
  {
    name: 'GitHub Workbench',
    cat: 'Integrations',
    status: 'AVAILABLE',
    desc: 'Pull requests, issues, and checks as a read-first workbench panel.',
    note: 'Detected: gh version 2.88.1',
  },
  {
    name: 'Remote Ollama Telemetry',
    cat: 'Telemetry',
    status: 'UNAVAILABLE',
    desc: 'Reports remote GPU/VRAM so the Dashboard can show off-machine runtimes.',
    note: 'No local Ollama CLI configured yet.',
  },
  {
    name: 'Hermes Memory / Skills',
    cat: 'Memory',
    status: 'PLANNED',
    desc: 'Durable memory and reusable skills shared across chats, projects, and missions.',
    note: 'Planned — see the plugin notes for the roadmap.',
  },
  {
    name: 'Chroma Memory',
    cat: 'Memory',
    status: 'UNAVAILABLE',
    desc: 'Vector memory backend with semantic search for missions and projects.',
    note: 'python3 found, chromadb not installed.',
  },
  {
    name: 'Browser / Chrome Automation',
    cat: 'Browser',
    status: 'AVAILABLE',
    desc: 'Controlled browser tasks for research, web-app testing, and debugging.',
    note: 'Chrome/Chromium detected.',
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
            Extend Akorith with agents, tools, panels, and automations.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`rounded-full border ${T.cardBorder} px-3 py-1 font-mono text-[10px] ${T.dim}`}>
            4/9 ready
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
  ['Profile', 'Identity and theme'],
  ['Providers', 'Claude, ChatGPT, Ollama'],
  ['Agents', 'Agent OS foundation'],
  ['API', 'Controller (optional)'],
  ['Workflow', 'Bridge and repo context'],
  ['Data', 'Storage and safety'],
]

export function SettingsView() {
  const [section, setSection] = useState('Profile')
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
        {section === 'Profile' ? (
          <>
            <h4 className={`text-lg font-semibold ${T.text}`}>Profile</h4>
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
                ['Available providers', '2/3'],
                ['Auto-Enter', 'On'],
                ['Repo context', 'Off'],
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
              {saved ? '✓ saved locally' : 'Save usage limits'}
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

/* ================= LOCKED (Loop / Test) ================= */

function LockedView({ name, desc }) {
  return (
    <div className="flex h-full min-h-[320px] flex-col items-center justify-center px-6 text-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 14, ease: 'linear' }}
        className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${T.cardBorder} ${T.card} ${T.text}`}
      >
        <IconLoop className="h-5 w-5" />
      </motion.div>
      <p className={`mt-4 text-lg font-semibold ${T.text}`}>{name} runs on your machine</p>
      <p className={`mt-2 max-w-sm text-[13px] leading-relaxed ${T.dim}`}>{desc}</p>
      <Link
        to="/download"
        className="mt-5 rounded-full bg-white px-4 py-2 text-[12.5px] font-semibold text-black transition-colors hover:bg-[#c9b6f5]"
      >
        Download Akorith ↓
      </Link>
    </div>
  )
}

/* ================= SHELL ================= */

const NAV = ['New chat', 'Workspace', 'Loop', 'Dashboard', 'Test', 'Plugins', 'Companions', 'Agents']

const CHATS = ['hello', 'hey which model are you', 'which model are you tell me', 'hello']

const TITLES = {
  Workspace: 'analizeRepo · Project workspace',
  Loop: 'Loop',
  Dashboard: 'Dashboard',
  Test: 'Test',
  Plugins: 'Plugins',
  Companions: 'Companions',
  Agents: 'Agents',
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
            Workbench
          </span>
          <span className={`hidden items-center gap-1.5 rounded-md border ${T.cardBorder} px-2.5 py-1 text-[10.5px] sm:flex ${T.dim}`}>
            <IconSpark className="h-3 w-3" /> Activity
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
          <button
            onClick={() => go('Settings')}
            className={`flex items-center gap-2.5 border-t ${T.cardBorder} px-4 py-3 text-left transition-colors hover:bg-white/[0.04]`}
          >
            <span className={`flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-[11px] font-semibold ${T.text}`}>
              I
            </span>
            <span>
              <span className={`block text-[12px] font-semibold ${T.text}`}>Ibrahim</span>
              <span className={`block text-[9.5px] ${T.faint}`}>Local profile</span>
            </span>
            <IconSettings className={`ml-auto h-4 w-4 ${T.faint}`} />
          </button>
        </div>

        {/* mobile nav */}
        <div className={`flex gap-1 overflow-x-auto border-b ${T.cardBorder} p-2 md:hidden`}>
          {[...NAV.slice(1), 'Settings'].map((item) => (
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
              {view === 'Dashboard' && <DashboardView />}
              {view === 'Plugins' && <PluginsView />}
              {view === 'Companions' && <CompanionsView />}
              {view === 'Agents' && <AgentsView />}
              {view === 'Settings' && <SettingsView />}
              {view === 'Loop' && (
                <LockedView
                  name="Loop"
                  desc="The autonomous builder plans, writes, validates, and commits with local models — a browser tab can't do that."
                />
              )}
              {view === 'Test' && (
                <LockedView
                  name="Test Lab"
                  desc="Benchmarks run local Ollama models in disposable sandboxes on your hardware — download the app to score your own models."
                />
              )}
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
    plugins: PluginsView,
    companions: CompanionsView,
    agents: AgentsView,
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
