/**
 * The "Ak" letterform extracted directly from the Akorith app icon
 * (public/logo-mark.png, white glyph on transparent). Rendered through a CSS
 * mask so the exact original shape can be tinted ink, clay, or cream.
 */
export function AkMark({ className = 'h-8 w-8', tone = 'ink' }) {
  return (
    <span
      role="img"
      aria-label="Akorith"
      className={`ak-mark ak-mark-${tone} ${className}`}
    />
  )
}

export function Wordmark({ className = '', tone = 'ink' }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <AkMark className="h-7 w-7" tone={tone} />
      <span className={`font-serif text-xl font-semibold tracking-tight ${tone === 'cream' ? 'text-paper' : 'text-ink'}`}>
        Akorith
      </span>
    </span>
  )
}
