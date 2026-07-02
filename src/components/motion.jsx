import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
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
export function SplitWords({ text, className = '', delay = 0 }) {
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
            className="inline-block"
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
