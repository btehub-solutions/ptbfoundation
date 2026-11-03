'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

export function Arrow() {
  return (
    <svg width="13" height="20" viewBox="0 0 13 20" fill="none" aria-hidden="true">
      <path d="m3 3 7 7-7 7" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

export function SiteHeader({
  active,
}: {
  active: 'home' | 'projects' | 'volunteer' | 'gallery' | 'about' | 'donate'
}) {
  const [menuOpen, setMenuOpen] = useState(false)
  const header = useRef<HTMLElement>(null)
  const toggle = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!menuOpen) return
    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        toggle.current?.focus()
      }
    }
    function handleOutside(event: PointerEvent) {
      if (!header.current?.contains(event.target as Node)) setMenuOpen(false)
    }
    function handleResize() {
      if (window.matchMedia('(min-width: 951px)').matches) setMenuOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    document.addEventListener('pointerdown', handleOutside)
    window.addEventListener('resize', handleResize)
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.removeEventListener('pointerdown', handleOutside)
      window.removeEventListener('resize', handleResize)
    }
  }, [menuOpen])

  return (
    <header
      className="site-header"
      ref={header}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setMenuOpen(false)
      }}
    >
      <Link
        className="brand"
        href="/#home"
        aria-label="Path to Blessings Charity Foundation home"
        onClick={() => setMenuOpen(false)}
      >
        <img
          src="/assets/foundation-logo.png"
          alt="Path to Blessings Charity Foundation"
          width="108"
          height="71"
        />
      </Link>

      <button
        className="menu-toggle"
        ref={toggle}
        type="button"
        aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav
        id="primary-navigation"
        className={`primary-nav ${menuOpen ? 'is-open' : ''}`}
        aria-label="Main navigation"
      >
        <Link
          className={active === 'home' ? 'active' : ''}
          href="/#home"
          aria-current={active === 'home' ? 'page' : undefined}
          onClick={() => setMenuOpen(false)}
        >
          Home
        </Link>
        <Link
          className={active === 'projects' ? 'active' : ''}
          href="/projects"
          aria-current={active === 'projects' ? 'page' : undefined}
          onClick={() => setMenuOpen(false)}
        >
          Projects
        </Link>
        <Link
          className={active === 'volunteer' ? 'active' : ''}
          href="/volunteer"
          aria-current={active === 'volunteer' ? 'page' : undefined}
          onClick={() => setMenuOpen(false)}
        >
          Volunteer
        </Link>
        <Link
          className={active === 'gallery' ? 'active' : ''}
          href="/gallery"
          aria-current={active === 'gallery' ? 'page' : undefined}
          onClick={() => setMenuOpen(false)}
        >
          Gallery
        </Link>
        <Link
          className={active === 'about' ? 'active' : ''}
          href="/about"
          aria-current={active === 'about' ? 'page' : undefined}
          onClick={() => setMenuOpen(false)}
        >
          About us
        </Link>
      </nav>

      <div className="header-actions">
        <Link className="header-volunteer" href="/volunteer" onClick={() => setMenuOpen(false)}>
          Volunteer <Arrow />
        </Link>
        <Link
          className="button button-gold"
          href="/donate"
          aria-current={active === 'donate' ? 'page' : undefined}
          onClick={() => setMenuOpen(false)}
        >
          Donate now
        </Link>
      </div>
    </header>
  )
}
