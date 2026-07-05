import { motion, useInView, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'

const EASE = [0.21, 0.47, 0.32, 0.98]

/** Fade-and-rise reveal when scrolled into view. */
export function Reveal({ children, delay = 0, y = 30, className = '', ...rest }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.75, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

/** Parent that staggers its <StaggerItem> children as they enter the viewport. */
export function Stagger({ children, className = '', delay = 0, gap = 0.09 }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-70px' }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: gap, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className = '', y = 26 }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  )
}

/** Per-word staggered headline reveal. */
export function SplitWords({ text, className = '', delay = 0, gradient = false }) {
  const words = text.split(' ')
  return (
    <motion.span
      className={className}
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: delay } } }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
          <motion.span
            className={`inline-block ${gradient ? 'accent-word' : ''}`}
            variants={{
              hidden: { y: '110%', opacity: 0 },
              show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: EASE } },
            }}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}

/** Animated counter that runs when it scrolls into view. */
export function CountUp({ to, suffix = '', decimals = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const value = useMotionValue(0)
  const spring = useSpring(value, { duration: 1.8, bounce: 0 })

  useEffect(() => {
    if (inView) value.set(to)
  }, [inView, to, value])

  useEffect(() => {
    const unsub = spring.on('change', (v) => {
      if (ref.current) ref.current.textContent = v.toFixed(decimals) + suffix
    })
    return unsub
  }, [spring, decimals, suffix])

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  )
}

/** Thin gradient bar at the very top that fills as the page scrolls. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 })
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2.5px] origin-left bg-gradient-to-r from-clay via-clay-deep to-moss"
    />
  )
}

/** Wraps children so they gently follow the cursor while hovered. */
export function Magnetic({ children, strength = 0.3, className = '' }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 })

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  )
}

/** Perspective tilt that follows the cursor — for screenshots and big cards. */
export function TiltCard({ children, max = 7, className = '' }) {
  const ref = useRef(null)
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 180, damping: 20 })
  const sry = useSpring(ry, { stiffness: 180, damping: 20 })

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    ry.set(px * max * 2)
    rx.set(-py * max * 2)
  }
  const onLeave = () => {
    rx.set(0)
    ry.set(0)
  }

  return (
    <div style={{ perspective: 1200 }} className={className}>
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX: srx, rotateY: sry, transformStyle: 'preserve-3d' }}
      >
        {children}
      </motion.div>
    </div>
  )
}

/** Vertical parallax drift driven by scroll position of the wrapped block. */
export function Parallax({ children, distance = 60, className = '' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance])
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}

/** Route-level page transition wrapper. */
export function Page({ children }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.45, ease: EASE }}
    >
      {children}
    </motion.main>
  )
}
