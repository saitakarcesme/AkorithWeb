/* Sidebar icons traced 1:1 from the real Akorith app (Lucide set,
   24×24, 2px stroke, round caps). Used by AppDemo so the demo's nav
   matches the desktop app exactly. */

function Svg({ children, className = 'h-4 w-4' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {children}
    </svg>
  )
}

/* + New chat */
export function IconPlus(p) {
  return (
    <Svg {...p}>
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </Svg>
  )
}

/* Workspace — Columns3 (panel with two dividers) */
export function IconWorkspace(p) {
  return (
    <Svg {...p}>
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M9 3v18" />
      <path d="M15 3v18" />
    </Svg>
  )
}

/* Loop — RefreshCw */
export function IconLoop(p) {
  return (
    <Svg {...p}>
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M8 16H3v5" />
    </Svg>
  )
}

/* Research — BookOpen + search spark */
export function IconResearch(p) {
  return (
    <Svg {...p}>
      <path d="M2 4.5A2.5 2.5 0 0 1 4.5 2H11v18H4.5A2.5 2.5 0 0 0 2 22.5z" />
      <path d="M22 4.5A2.5 2.5 0 0 0 19.5 2H13v18h2" />
      <circle cx="18" cy="17" r="3" />
      <path d="m20.2 19.2 1.8 1.8" />
    </Svg>
  )
}

/* Dashboard — bar chart */
export function IconDashboard(p) {
  return (
    <Svg {...p}>
      <path d="M3 3v16a2 2 0 0 0 2 2h16" />
      <path d="M7 16v-3" />
      <path d="M11 16v-6" />
      <path d="M15 16v-4" />
      <path d="M19 16v-8" />
    </Svg>
  )
}

/* Test — FlaskConical */
export function IconTest(p) {
  return (
    <Svg {...p}>
      <path d="M14 2v6a2 2 0 0 0 .245.96l5.51 10.04A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.04A2 2 0 0 0 10 8V2" />
      <path d="M8.5 2h7" />
      <path d="M7 16h10" />
    </Svg>
  )
}

/* Plugins — Puzzle */
export function IconPlugins(p) {
  return (
    <Svg {...p}>
      <path d="M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 15.39a1 1 0 0 1-1.68-.474 2.5 2.5 0 1 0-3.014 3.015 1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0L8.61 19.61a1 1 0 0 0-1.68.474 2.5 2.5 0 1 1-3.014-3.015 1 1 0 0 0 .474-1.68l-1.683-1.682a2.414 2.414 0 0 1 0-3.414L4.39 8.61a1 1 0 0 1 1.68.474 2.5 2.5 0 1 0 3.014-3.015 1 1 0 0 1-.474-1.68l1.683-1.682a2.414 2.414 0 0 1 3.414 0z" />
    </Svg>
  )
}

/* Companions — person with a spark dot (UserRound + dot) */
export function IconCompanions(p) {
  return (
    <Svg {...p}>
      <circle cx="10" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 12.5-6.6" />
      <circle cx="18" cy="7" r="1.4" fill="currentColor" stroke="none" />
    </Svg>
  )
}

/* Agents — node fork (top node splitting to two below) */
export function IconAgents(p) {
  return (
    <Svg {...p}>
      <circle cx="12" cy="5" r="2.4" />
      <circle cx="5" cy="18" r="2.4" />
      <circle cx="19" cy="18" r="2.4" />
      <path d="M10.5 6.9 6.5 16" />
      <path d="M13.5 6.9 17.5 16" />
      <path d="M7.4 18h9.2" />
    </Svg>
  )
}

/* Settings — gear */
export function IconSettings(p) {
  return (
    <Svg {...p}>
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </Svg>
  )
}

/* Activity spark (header button) */
export function IconSpark(p) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={p.className || 'h-3.5 w-3.5'} aria-hidden>
      <path d="M12 1.5c.45 3.9 1.05 6.15 2.4 7.5l8.1 3-8.1 3c-1.35 1.35-1.95 3.6-2.4 7.5-.45-3.9-1.05-6.15-2.4-7.5l-8.1-3 8.1-3c1.35-1.35 1.95-3.6 2.4-7.5Z" />
    </svg>
  )
}
