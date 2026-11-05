'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import { projects, getDateGroups, type Project } from '@/data/projects'

const dateGroups = getDateGroups()

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="project-card" data-date={`${project.year} - ${project.month}`}>
      <div>
        {project.image ? (
          <img src={project.image} alt={project.title} width={416} height={266} />
        ) : (
          <div
            style={{
              width: '100%',
              height: 266,
              borderRadius: 12,
              background: '#f0f0f0',
              display: 'grid',
              placeItems: 'center',
              color: '#aaa',
              fontSize: 14,
            }}
          >
            Image coming soon
          </div>
        )}
        <h3>{project.title}</h3>
        <p>{project.description}</p>
      </div>
    </div>
  )
}

export default function FeaturedProjectsCarousel() {
  const [activeGroup, setActiveGroup] = useState(0)
  const [activeDot, setActiveDot] = useState(0)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)
  const viewportRef = useRef<HTMLDivElement>(null)

  // 3 dots as in the Figma design representing pages across the 10 projects
  const TOTAL_DOTS = 3

  const updateScrollState = useCallback(() => {
    const el = viewportRef.current
    if (!el) return

    const { scrollLeft, scrollWidth, clientWidth } = el
    const maxScroll = Math.max(0, scrollWidth - clientWidth)

    setCanPrev(scrollLeft > 10)
    setCanNext(scrollLeft < maxScroll - 10)

    // Calculate current dot index (0, 1, or 2)
    if (maxScroll > 0) {
      const progress = scrollLeft / maxScroll
      const dot = Math.min(TOTAL_DOTS - 1, Math.round(progress * (TOTAL_DOTS - 1)))
      setActiveDot(dot)
    }

    // Identify which date group is at the front of the viewport
    const cards = Array.from(el.querySelectorAll('.project-card')) as HTMLElement[]
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i]
      const cardLeft = card.offsetLeft - el.offsetLeft
      if (cardLeft >= scrollLeft - 50) {
        const cardDate = card.getAttribute('data-date')
        const groupIdx = dateGroups.findIndex((g) => g.label === cardDate)
        if (groupIdx !== -1) {
          setActiveGroup(groupIdx)
        }
        break
      }
    }
  }, [])

  useEffect(() => {
    const el = viewportRef.current
    if (!el) return
    updateScrollState()
    el.addEventListener('scroll', updateScrollState, { passive: true })
    window.addEventListener('resize', updateScrollState)
    return () => {
      el.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [updateScrollState])

  const scrollByDirection = (direction: 'prev' | 'next') => {
    const el = viewportRef.current
    if (!el) return
    const card = el.querySelector('.project-card') as HTMLElement | null
    const cardWidth = card ? card.offsetWidth + 32 : 480
    const scrollAmount = direction === 'next' ? cardWidth : -cardWidth
    el.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }

  const scrollToDot = (dotIdx: number) => {
    const el = viewportRef.current
    if (!el) return
    const maxScroll = Math.max(0, el.scrollWidth - el.clientWidth)
    const targetScroll = (dotIdx / (TOTAL_DOTS - 1)) * maxScroll
    el.scrollTo({ left: targetScroll, behavior: 'smooth' })
    setActiveDot(dotIdx)
  }

  const scrollToDateGroup = (groupIdx: number) => {
    setActiveGroup(groupIdx)
    const el = viewportRef.current
    if (!el) return
    const targetDate = dateGroups[groupIdx]?.label
    if (!targetDate) return

    const targetCard = el.querySelector(`[data-date="${targetDate}"]`) as HTMLElement | null
    if (targetCard) {
      el.scrollTo({ left: targetCard.offsetLeft - el.offsetLeft, behavior: 'smooth' })
    }
  }

  return (
    <div className="projects-layout">
      <nav className="project-dates" aria-label="Filter projects by date">
        {dateGroups.map((g, i) => (
          <button
            key={g.label}
            className={i === activeGroup ? 'is-current' : undefined}
            onClick={() => scrollToDateGroup(i)}
          >
            {g.label}
          </button>
        ))}
      </nav>

      <div className="projects-main">
        <div
          className="project-viewport"
          ref={viewportRef}
          tabIndex={0}
          role="region"
          aria-label="Project cards"
        >
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>

        <div className="carousel-controls">
          <div className="carousel-dots" role="tablist" aria-label="Carousel pages">
            {Array.from({ length: TOTAL_DOTS }, (_, i) => (
              <button
                key={i}
                className={i === activeDot ? 'is-current' : undefined}
                onClick={() => scrollToDot(i)}
                role="tab"
                aria-selected={i === activeDot}
                aria-label={`Page ${i + 1}`}
              />
            ))}
          </div>
          <div className="carousel-arrows">
            <button
              className="carousel-arrow"
              disabled={!canPrev}
              onClick={() => scrollByDirection('prev')}
              aria-label="Previous projects"
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                <path d="M14 4 7 11l7 7" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
            <button
              className="carousel-arrow"
              disabled={!canNext}
              onClick={() => scrollByDirection('next')}
              aria-label="Next projects"
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                <path d="m8 4 7 7-7 7" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
