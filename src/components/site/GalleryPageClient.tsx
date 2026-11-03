'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Footer } from './LandingSections'
import { SiteHeader } from './SiteChrome'

const photographs = [
  {
    id: 'support',
    src: '/assets/gallery/community-care.webp',
    title: 'Community support',
    alt: 'A Path to Blessings volunteer beside a community member with crutches and bags of supplies',
  },
  {
    id: 'learning',
    src: '/assets/gallery/classroom.webp',
    title: 'Learning together',
    alt: 'A volunteer sharing learning activities with children around a classroom table',
  },
  {
    id: 'outreach',
    src: '/assets/gallery/outreach.webp',
    title: 'Sharing essential supplies',
    alt: 'A volunteer in a green cap handing a bag of essential supplies to a woman',
  },
  {
    id: 'visit',
    src: '/assets/gallery/community-smile.webp',
    title: 'A community visit',
    alt: 'A smiling woman in a green patterned dress standing outside her home',
  },
  {
    id: 'radio',
    src: '/assets/gallery/radio-visit.webp',
    title: 'Radio outreach',
    alt: 'The Path to Blessings team sitting around microphones in a radio studio',
  },
]

export default function GalleryPageClient() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const viewer = useRef<HTMLDialogElement>(null)
  const swipeStart = useRef<number | null>(null)
  const reducedMotion = useReducedMotion()
  const selected = photographs.find((photo) => photo.id === selectedId)
  const selectedIndex = photographs.findIndex((photo) => photo.id === selectedId)

  function movePhoto(direction: number) {
    setSelectedId((current) => {
      const index = photographs.findIndex((photo) => photo.id === current)
      return photographs[(index + direction + photographs.length) % photographs.length].id
    })
  }

  useEffect(() => {
    if (selectedId) viewer.current?.showModal()
    else viewer.current?.close()
  }, [selectedId])

  useEffect(() => {
    if (!selectedId) return
    function handleKey(event: KeyboardEvent) {
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault()
        movePhoto(event.key === 'ArrowRight' ? 1 : -1)
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [selectedId])

  useEffect(() => {
    if (!selectedId) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [selectedId])

  return (
    <>
      <main className="gallery-page" id="main-content" tabIndex={-1}>
        <section className="project-hero" aria-labelledby="gallery-title">
          <SiteHeader active="gallery" />
          <div className="project-hero-copy gallery-hero-copy">
            <h1 id="gallery-title">
              Our Community
              <br />
              in Pictures
            </h1>
            <p>
              A look at our volunteers, our community,
              <br className="gallery-desktop-break" /> and the work we do together.
            </p>
          </div>
        </section>

        <section className="gallery-collection" aria-labelledby="gallery-collection-title">
          <div className="gallery-container">
            <h2 id="gallery-collection-title">Our Gallery</h2>
            <div className="gallery-photo-grid">
              {photographs.map((photo) => (
                <figure className="gallery-photo" key={photo.id}>
                  <button
                    className="gallery-photo-button"
                    aria-label={`Enlarge photo: ${photo.title}`}
                    onClick={() => setSelectedId(photo.id)}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 600px) 90vw, (max-width: 1000px) 44vw, 30vw"
                    />
                  </button>
                  <figcaption>{photo.title}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <dialog
        ref={viewer}
        className="gallery-photo-dialog"
        aria-labelledby="gallery-photo-title"
        onCancel={() => setSelectedId(null)}
        onClose={() => setSelectedId(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setSelectedId(null)
        }}
      >
        {selected && (
          <div className="gallery-photo-dialog-inner">
            <div className="gallery-photo-dialog-heading">
              <h2 id="gallery-photo-title" aria-live="polite">
                {selected.title}
              </h2>
              <button aria-label="Close photo" onClick={() => setSelectedId(null)}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
            </div>
            <motion.div
              key={selected.id}
              className="gallery-enlarged-photo touch-pan-y"
              initial={reducedMotion ? false : { opacity: 0.6 }}
              animate={{ opacity: 1 }}
              transition={{ duration: reducedMotion ? 0 : 0.2 }}
              onPointerDown={(event) => {
                swipeStart.current = event.pointerType === 'touch' ? event.clientX : null
              }}
              onPointerUp={(event) => {
                if (swipeStart.current !== null) {
                  const distance = event.clientX - swipeStart.current
                  if (Math.abs(distance) > 60) movePhoto(distance < 0 ? 1 : -1)
                }
                swipeStart.current = null
              }}
              onPointerCancel={() => {
                swipeStart.current = null
              }}
            >
              <Image
                src={selected.src}
                alt={selected.alt}
                fill
                sizes="(max-width: 800px) 90vw, 850px"
              />
            </motion.div>
            <div className="mt-4 flex items-center justify-between gap-4">
              <button
                type="button"
                className="min-h-11 rounded-full border border-gallery-line px-4 text-sm hover:bg-gallery-mint active:bg-gallery-mint"
                aria-label="Previous photo"
                onClick={() => movePhoto(-1)}
              >
                Previous
              </button>
              <span className="text-sm text-gallery-muted" aria-live="polite">
                {selectedIndex + 1} / {photographs.length}
              </span>
              <button
                type="button"
                className="min-h-11 rounded-full border border-gallery-line px-4 text-sm hover:bg-gallery-mint active:bg-gallery-mint"
                aria-label="Next photo"
                onClick={() => movePhoto(1)}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </dialog>
    </>
  )
}
