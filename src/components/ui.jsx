import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Reveal } from './motion.jsx'
import { AkMark } from './Logo.jsx'

export const GITHUB_URL = 'https://github.com/saitakarcesme/akorith'
export const CLI_GITHUB_URL = 'https://github.com/saitakarcesme/AkorithCLI'

/* ---------- Claude-style spark / starburst motif ---------- */

export function Spark({ className = 'h-4 w-4', spin = false }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`${className} ${spin ? 'animate-spin-slow' : ''}`}
      aria-hidden
    >
      <path d="M12 1.5c.45 3.9 1.05 6.15 2.4 7.5l8.1 3-8.1 3c-1.35 1.35-1.95 3.6-2.4 7.5-.45-3.9-1.05-6.15-2.4-7.5l-8.1-3 8.1-3c1.35-1.35 1.95-3.6 2.4-7.5Z" />
    </svg>
  )
}

/* ---------- Buttons ---------- */

export function PrimaryButton({ to, href, children, className = '' }) {
  const cls = `group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-night transition-all duration-300 hover:bg-clay hover:text-white hover:shadow-[0_10px_34px_-8px_rgba(143,106,224,0.7)] ${className}`
  const arrow = (
    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
  )
  if (to)
    return (
      <Link to={to} className={cls}>
        {children} {arrow}
      </Link>
    )
  return (
    <a href={href} target="_blank" rel="noreferrer" className={cls}>
      {children} {arrow}
    </a>
  )
}

export function GhostButton({ to, href, children, className = '' }) {
  const cls = `inline-flex items-center gap-2 rounded-full border border-ink/25 bg-transparent px-6 py-3 text-sm font-semibold text-ink transition-all duration-300 hover:border-ink hover:bg-ink/5 ${className}`
  if (to)
    return (
      <Link to={to} className={cls}>
        {children}
      </Link>
    )
  return (
    <a href={href} target="_blank" rel="noreferrer" className={cls}>
      {children}
    </a>
  )
}

/* ---------- Section heading ---------- */

export function SectionHeading({ eyebrow, title, lead, center = false, dark = false }) {
  return (
    <div className={`max-w-3xl ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <Reveal>
          <p
            className={`mb-5 flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.22em] ${
              center ? 'justify-center' : ''
            } ${dark ? 'text-clay' : 'text-clay-deep'}`}
          >
            <Spark className="h-3.5 w-3.5" />
            {eyebrow}
          </p>
        </Reveal>
      )}
      <Reveal delay={0.08}>
        <h2
          className={`font-serif text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.9rem] lg:leading-[1.12] ${
            dark ? 'text-paper' : 'text-ink'
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {lead && (
        <Reveal delay={0.16}>
          <p className={`mt-5 text-lg leading-relaxed ${dark ? 'text-paper/70' : 'text-muted'}`}>
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  )
}

/* ---------- Dark card with cursor spotlight ---------- */

export function Card({ children, className = '' }) {
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  return (
    <div onMouseMove={onMove} className={`card ${className}`}>
      {children}
    </div>
  )
}

/* ---------- Copyable terminal code block ---------- */

export function CodeBlock({ code, prompt = '$', className = '' }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }
  return (
    <div className={`group relative min-w-0 overflow-hidden rounded-xl border border-white/[0.07] bg-night ${className}`}>
      <button
        onClick={copy}
        className="absolute right-3 top-3 rounded-md border border-white/15 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-ink/60 opacity-0 transition-opacity duration-200 hover:text-ink group-hover:opacity-100"
      >
        {copied ? '✓ copied' : 'copy'}
      </button>
      <pre className="overflow-x-auto p-5 font-mono text-sm leading-relaxed text-ink/90">
        {code.split('\n').map((line, i) => (
          <div key={i}>
            <span className="select-none text-clay">{prompt} </span>
            {line}
          </div>
        ))}
      </pre>
    </div>
  )
}

/* ---------- Marquee ---------- */

export function Marquee({ items, className = '' }) {
  const row = [...items, ...items]
  return (
    <div className={`mask-fade-x overflow-hidden ${className}`}>
      <div className="flex w-max animate-marquee gap-4 pr-4">
        {row.map((item, i) => (
          <span
            key={i}
            className="whitespace-nowrap rounded-full border border-line bg-surface px-5 py-2 font-mono text-sm text-soot"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ---------- Shared end-of-page CTA: glowing dark band ---------- */

export function CtaSection() {
  return (
    <section className="px-6 py-24 sm:py-28">
      <Reveal className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-[2rem] border border-line bg-night px-8 py-20 text-center sm:px-16">
          {/* drifting aurora glow */}
          <div
            aria-hidden
            className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-clay/25 blur-3xl animate-aurora-a"
          />
          <div
            aria-hidden
            className="absolute -bottom-28 -right-20 h-80 w-80 rounded-full bg-moss/20 blur-3xl animate-aurora-b"
          />
          {/* quiet spark constellation */}
          <Spark className="absolute left-10 top-10 h-6 w-6 text-clay/60 animate-sway" />
          <Spark className="absolute bottom-12 right-14 h-9 w-9 text-clay/40 animate-sway" />
          <Spark className="absolute right-1/4 top-8 h-4 w-4 text-ink/20" />

          <div className="relative">
            <div className="mx-auto mb-8 w-fit rounded-2xl border border-white/10 bg-white/[0.05] p-4">
              <AkMark className="h-10 w-10" tone="cream" />
            </div>
            <h2 className="mx-auto max-w-2xl font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              Put your AI workspace on <span className="accent-word">your machine.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink/65">
              Free and open source. No accounts, no API keys, no cloud middleman — just your
              existing CLIs, project context, durable goals, and local tools — orchestrated.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/download"
                className="group inline-flex items-center gap-2 rounded-full bg-clay px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-clay-deep hover:shadow-[0_10px_34px_-8px_rgba(143,106,224,0.7)]"
              >
                Get Akorith{' '}
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-ink/30 px-6 py-3 text-sm font-semibold text-ink transition-all duration-300 hover:border-ink hover:bg-ink/10"
              >
                Star on GitHub
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
