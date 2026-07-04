import { useEffect, useRef, useState } from 'react'
import { CLI, WORDMARK, PROVIDERS, formatModel } from './cli.js'

/* ============================================================
   Faithful in-browser render of the real Akorith CLI. Colors,
   wordmark, status line, /models list, prompt, and rule
   separators all match akorithcli/src/ui.js + repl.js.
   ============================================================ */

const mono = { fontFamily: '"IBM Plex Mono", ui-monospace, SFMono-Regular, monospace' }

export function CliBanner({ compact = false }) {
  return (
    <div>
      <pre
        className="cli-wordmark overflow-x-auto text-[7px] font-bold leading-[1.05] sm:text-[9px] md:text-[10px]"
        style={{ ...mono, marginBottom: compact ? 6 : 10 }}
      >
        {WORDMARK}
      </pre>
      <p className="text-[12px] leading-relaxed sm:text-[13px]" style={mono}>
        <b style={{ color: CLI.text }}>Akorith</b>{' '}
        <span style={{ color: CLI.faint }}>v{CLI.version}</span>{' '}
        <span style={{ color: CLI.dim }}>— the Agent OS for</span>{' '}
        <span style={{ color: CLI.violet }}>your</span>{' '}
        <span
          style={{
            background: `linear-gradient(90deg, ${CLI.sky}, ${CLI.green})`,
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          terminal.
        </span>
      </p>
      {!compact && (
        <p className="mt-1 text-[11.5px] leading-relaxed sm:text-[12px]" style={{ ...mono, color: CLI.faint }}>
          One prompt for Claude, Codex, and OpenCode. No API keys — your CLIs, your machine.
        </p>
      )}
    </div>
  )
}

export function StatusLine({ provider = 'codex', session = 'new session' }) {
  const sep = <span style={{ color: CLI.faint }}>{'  ·  '}</span>
  return (
    <p className="text-[12px] sm:text-[13px]" style={mono}>
      <span style={{ color: CLI.green }}>●</span>{' '}
      <span style={{ color: CLI.dim }}>{formatModel(provider)}</span>
      {sep}
      <span style={{ color: CLI.green }}>act</span>
      {sep}
      <span style={{ color: CLI.faint }}>~</span>
      {sep}
      <span style={{ color: CLI.faint }}>{session}</span>
    </p>
  )
}

export function ModelsList({ active = 'codex' }) {
  return (
    <div className="text-[12px] leading-relaxed sm:text-[13px]" style={mono}>
      <p>
        <b style={{ color: CLI.text }}>Providers</b>{' '}
        <span style={{ color: CLI.dim }}>— switch with /model &lt;provider&gt;[/&lt;model&gt;]</span>
      </p>
      {PROVIDERS.map((p) => (
        <div key={p.id}>
          <p>
            <span style={{ color: CLI.violet }}>{p.id === active ? ' ▸ ' : '   '}</span>
            <b style={{ color: CLI.text }}>{p.id.padEnd(9)}</b>
            <span style={{ color: CLI.violet }}>{p.codename.padEnd(9)}</span>
            <span style={{ color: p.ready ? CLI.green : CLI.red }}>{p.ready ? 'ready' : 'not installed'}</span>
          </p>
          <p style={{ color: CLI.faint }}>{'      ' + p.hint}</p>
        </div>
      ))}
    </div>
  )
}

export function Caret() {
  return (
    <span
      className="ml-0.5 inline-block h-[1.05em] w-[7px] translate-y-[2px]"
      style={{ background: CLI.violetDeep, animation: 'cli-blink 1s steps(1) infinite' }}
    />
  )
}

/** Window chrome shell matching the real Terminal.app-ish frame. */
export function CliWindow({ title = 'akorith — zsh', children, className = '' }) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-white/10 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.85)] ${className}`}
      style={{ background: CLI.bg }}
    >
      <div
        className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-2.5"
        style={{ background: '#141416' }}
      >
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        </span>
        <span className="ml-2 text-[11px]" style={{ ...mono, color: CLI.faint }}>
          {title}
        </span>
      </div>
      {children}
    </div>
  )
}

/* ---------------- animated boot: settled banner, real look ---------------- */

export function CliBoot({ className = '' }) {
  return (
    <CliWindow className={className}>
      <div className="p-5 sm:p-6">
        <CliBanner />
        <div className="mt-4">
          <StatusLine />
          <p className="mt-1 text-[12px] sm:text-[13px]" style={{ ...mono, color: CLI.dim }}>
            Type a task. /help for commands, /model to switch models, ! to run shell.
          </p>
        </div>
        <div className="mt-4">
          <ModelsList />
        </div>
        <p className="mt-3 text-[13px] font-bold" style={{ ...mono, color: CLI.text }}>
          ❯ <Caret />
        </p>
      </div>
    </CliWindow>
  )
}

/* ---------------- cycling live session ---------------- */

const SESSION = [
  { cmd: 'refactor the auth module and add tests', model: 'codex', codename: 'olympus', display: 'Codex' },
  { cmd: '/model claude/sonnet', switchTo: 'atlantis · claude/sonnet' },
  { cmd: 'review this diff for edge cases', model: 'claude', codename: 'atlantis', display: 'Claude' },
  { cmd: '!git status', shell: ['On branch main', 'nothing to commit, working tree clean'] },
]

function Rule({ label = '' }) {
  return (
    <p className="truncate text-[12px] sm:text-[13px]" style={{ ...mono, color: CLI.faint }}>
      {label ? `── ${label} ` : ''}
      {'─'.repeat(60)}
    </p>
  )
}

export function CliSession({ className = '' }) {
  const [visible, setVisible] = useState([])
  const [typed, setTyped] = useState('')
  const step = useRef(0)
  const timers = useRef([])

  useEffect(() => {
    let alive = true
    const push = (node) => alive && setVisible((v) => [...v, node])
    const wait = (ms) => new Promise((r) => timers.current.push(setTimeout(r, ms)))

    async function typeCmd(text) {
      for (let i = 1; i <= text.length && alive; i++) {
        setTyped(text.slice(0, i))
        await wait(38)
      }
      await wait(400)
    }

    async function run() {
      while (alive) {
        const s = SESSION[step.current % SESSION.length]
        setTyped('')
        await typeCmd(s.cmd)
        const key = visible.length + '-' + step.current
        push(
          <p key={`cmd${key}`} className="text-[12px] sm:text-[13px]" style={{ ...mono, color: CLI.text }}>
            <b style={{ color: CLI.text }}>❯ </b>
            {s.cmd}
          </p>,
        )
        setTyped('')
        await wait(250)

        if (s.switchTo) {
          push(
            <p key={`sw${key}`} className="text-[12px] sm:text-[13px]" style={mono}>
              <span style={{ color: CLI.green }}>✓ </span>
              <span style={{ color: CLI.text }}>Now talking to </span>
              <b style={{ color: CLI.text }}>{s.switchTo}</b>
            </p>,
          )
        } else if (s.shell) {
          for (const line of s.shell) {
            push(
              <p key={`sh${key}-${line}`} className="text-[12px] sm:text-[13px]" style={{ ...mono, color: CLI.dim }}>
                {line}
              </p>,
            )
          }
        } else {
          push(<Rule key={`r1${key}`} label={formatModel(s.model)} />)
          push(
            <p key={`sp${key}`} className="text-[12px] sm:text-[13px]" style={{ ...mono, color: CLI.dim }}>
              <span style={{ color: CLI.violet }}>✦</span> [{s.codename}] {s.display} · working…{' '}
              <span style={{ color: CLI.faint }}>2s</span>
            </p>,
          )
          await wait(900)
          push(
            <p key={`ok${key}`} className="text-[12px] sm:text-[13px]" style={{ ...mono, color: CLI.green }}>
              ✓ done in 2s
            </p>,
          )
          push(<Rule key={`r2${key}`} />)
        }

        step.current += 1
        await wait(1400)
        // reset after a full loop so it doesn't grow forever
        if (step.current % SESSION.length === 0) {
          await wait(600)
          if (alive) setVisible([])
        }
      }
    }
    run()
    return () => {
      alive = false
      timers.current.forEach(clearTimeout)
      timers.current = []
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <CliWindow className={className}>
      <div className="p-5 sm:p-6">
        <CliBanner compact />
        <div className="mt-3">
          <StatusLine />
        </div>
        <div className="mt-3 min-h-[168px] space-y-1">
          {visible}
          <p className="text-[12px] sm:text-[13px]" style={{ ...mono, color: CLI.text }}>
            <b>❯ </b>
            {typed}
            <Caret />
          </p>
        </div>
      </div>
    </CliWindow>
  )
}
