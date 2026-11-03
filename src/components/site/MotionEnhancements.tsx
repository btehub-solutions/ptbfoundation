'use client'

import {
  animate,
  inView,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

// Opt in existing content groups without turning static pages into Client Components.
const revealTargets = [
  '.hero-copy',
  '.hero-visual',
  '.project-hero-copy',
  '.volunteer-hero-copy',
  'main section > .page-container',
  'main section > .about-container',
  '.volunteer-application-inner',
  '.gallery-container',
  '.donation-container',
  '.projects-page-container',
  '.impact-inner',
].join(', ')

export default function MotionEnhancements() {
  const pathname = usePathname()
  const reducedMotion = useReducedMotion()
  const { scrollY } = useScroll()
  const [showTop, setShowTop] = useState(false)

  useMotionValueEvent(scrollY, 'change', (position) => {
    setShowTop(position > 800)
  })

  useEffect(() => {
    if (reducedMotion !== false) return
    const animations: ReturnType<typeof animate>[] = []
    const stopObserving = inView(
      revealTargets,
      (element) => {
        // Content is visible in server HTML and remains usable without JavaScript.
        animations.push(
          animate(
            element,
            { opacity: [0.7, 1], y: [14, 0] },
            { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
          ),
        )
      },
      { margin: '0px 0px -24px 0px' },
    )
    return () => {
      stopObserving()
      animations.forEach((animation) => animation.stop())
      document.querySelectorAll<HTMLElement>(revealTargets).forEach((element) => {
        element.style.removeProperty('transform')
        element.style.removeProperty('opacity')
      })
    }
  }, [pathname, reducedMotion])

  useEffect(() => {
    const desktop = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let dispose: (() => void) | undefined
    let generation = 0

    async function configureScroll() {
      const current = ++generation
      dispose?.()
      dispose = undefined
      // Preserve native momentum and browser gestures on touch devices.
      if (!desktop.matches || reduced.matches) return
      const { default: Lenis } = await import('lenis')
      if (current !== generation) return
      const lenis = new Lenis({
        autoRaf: true,
        duration: 0.85,
        smoothWheel: true,
        syncTouch: false,
        anchors: false,
        prevent: (node) =>
          Boolean(node.closest('dialog, .primary-nav, textarea, select, [data-lenis-prevent]')),
      })
      // Native modal dialogs lock the page; their own content must remain scrollable.
      const syncModal = () => {
        if (document.querySelector('dialog[open]')) lenis.stop()
        else lenis.start()
      }
      const observer = new MutationObserver(syncModal)
      observer.observe(document.body, {
        subtree: true,
        attributes: true,
        attributeFilter: ['open'],
      })
      syncModal()
      dispose = () => {
        observer.disconnect()
        lenis.destroy()
      }
    }

    void configureScroll()
    desktop.addEventListener('change', configureScroll)
    reduced.addEventListener('change', configureScroll)
    return () => {
      generation++
      desktop.removeEventListener('change', configureScroll)
      reduced.removeEventListener('change', configureScroll)
      dispose?.()
    }
  }, [])

  if (!showTop) return null

  return (
    <motion.button
      type="button"
      aria-label="Back to top"
      className="fixed right-5 bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-30 grid size-12 place-items-center rounded-full border border-foundation-green bg-gallery-paper text-foundation-green shadow-lg"
      initial={false}
      whileHover={reducedMotion ? undefined : { y: -3 }}
      whileTap={reducedMotion ? undefined : { scale: 0.94 }}
      onClick={() => {
        document.getElementById('main-content')?.focus({ preventScroll: true })
        window.scrollTo({ top: 0, behavior: reducedMotion ? 'instant' : 'smooth' })
      }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="m5 12 7-7 7 7M12 5v15" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    </motion.button>
  )
}
