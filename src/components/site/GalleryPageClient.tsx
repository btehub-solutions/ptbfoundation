'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Footer } from './LandingSections'
import { SiteHeader } from './SiteChrome'

interface Photo {
  id: string
  src: string
  title: string
  alt: string
}

interface Category {
  id: string
  label: string
  cover: string
  photos: Photo[]
}

const categories: Category[] = [
  {
    id: 'radio',
    label: 'Radio Outreach',
    cover: '/assets/gallery/radio/radio-studio.jpg',
    photos: [
      {
        id: 'radio-1',
        src: '/assets/gallery/radio/radio-studio.jpg',
        title: 'Splash FM radio interview',
        alt: 'The Path to Blessings team sitting around microphones in a Splash FM radio studio',
      },
    ],
  },
  {
    id: 'education',
    label: 'Education',
    cover: '/assets/gallery/education/children-table.jpg',
    photos: [
      {
        id: 'edu-1',
        src: '/assets/gallery/education/whiteboard.jpg',
        title: 'Classroom whiteboard lesson',
        alt: 'A school whiteboard with Yoruba language lesson notes dated Monday 11th November 2024',
      },
      {
        id: 'edu-2',
        src: '/assets/gallery/education/students-devices.jpg',
        title: 'Students learning with devices',
        alt: 'Students gathered around desks using phones and a laptop during a digital learning session',
      },
      {
        id: 'edu-3',
        src: '/assets/gallery/education/children-table.jpg',
        title: 'Young learners at work',
        alt: 'Young children in school uniforms writing and drawing at a green classroom table',
      },
      {
        id: 'edu-4',
        src: '/assets/gallery/education/teaching-session.jpg',
        title: 'Interactive teaching session',
        alt: 'A volunteer presenting with a laptop to a group of attentive students in an outdoor classroom',
      },
      {
        id: 'edu-5',
        src: '/assets/gallery/education/outdoor-teaching.jpg',
        title: 'Outdoor teaching',
        alt: 'A volunteer in a red hijab leading an outdoor teaching session with children',
      },
    ],
  },
  {
    id: 'launch',
    label: 'Official Launch',
    cover: '/assets/gallery/launch/stage-speaker.jpg',
    photos: [
      {
        id: 'launch-1',
        src: '/assets/gallery/launch/stage-speaker.jpg',
        title: 'Official launch speech',
        alt: 'A speaker on stage at the official launch of Path to Blessings Charity Foundation on 19th March 2025',
      },
      {
        id: 'launch-2',
        src: '/assets/gallery/launch/launch-duo.jpg',
        title: 'Launch attendees',
        alt: 'Two attendees standing in front of the Path to Blessings official launch banner',
      },
    ],
  },
  {
    id: 'outreach',
    label: 'Community Outreach',
    cover: '/assets/gallery/outreach/village-delivery.jpg',
    photos: [
      {
        id: 'out-1',
        src: '/assets/gallery/outreach/outreach-speaker.jpg',
        title: 'Community awareness',
        alt: 'A volunteer in a red hijab speaking to children beside a Path to Blessings banner',
      },
      {
        id: 'out-2',
        src: '/assets/gallery/outreach/ogun-state-visit.jpg',
        title: 'Ogun State courtesy visit',
        alt: 'Path to Blessings team presenting a branded gift box to an Ogun State official',
      },
      {
        id: 'out-3',
        src: '/assets/gallery/outreach/village-delivery.jpg',
        title: 'Village food delivery',
        alt: 'Two volunteers delivering food supplies to an elderly woman in a rural community',
      },
      {
        id: 'out-4',
        src: '/assets/gallery/outreach/home-visit.jpg',
        title: 'Home visit',
        alt: 'Volunteers visiting a family at their home to deliver supplies and offer support',
      },
    ],
  },
  {
    id: 'special-people',
    label: 'Special People Support',
    cover: '/assets/gallery/special-people/volunteers-special-needs.jpg',
    photos: [
      {
        id: 'sp-1',
        src: '/assets/gallery/special-people/splash-fm-support.jpg',
        title: 'Splash FM support distribution',
        alt: 'Path to Blessings volunteers with community members receiving food packages at Splash FM station',
      },
      {
        id: 'sp-2',
        src: '/assets/gallery/special-people/group-support.jpg',
        title: 'Group support session',
        alt: 'A large group of special needs individuals and volunteers gathered at Splash FM for a feeding outreach',
      },
      {
        id: 'sp-3',
        src: '/assets/gallery/special-people/volunteers-special-needs.jpg',
        title: 'Volunteers with special needs community',
        alt: 'Path to Blessings volunteers standing with individuals with disabilities including a wheelchair user',
      },
      {
        id: 'sp-4',
        src: '/assets/gallery/special-people/group-feeding.jpg',
        title: 'Group feeding event',
        alt: 'Volunteers distributing food packages to special needs individuals at a community gathering',
      },
    ],
  },
  {
    id: 'skills',
    label: 'Skills Acquisition',
    cover: '/assets/gallery/skills/yali-group-photo.jpg',
    photos: [
      {
        id: 'sk-1',
        src: '/assets/gallery/skills/yali-session.jpg',
        title: 'YALI training session',
        alt: 'A volunteer with a YALI Network banner instructing students during a skills acquisition session',
      },
      {
        id: 'sk-2',
        src: '/assets/gallery/skills/yali-group-photo.jpg',
        title: 'YALI program group photo',
        alt: 'Group photo of students and organisers at the YALI skills acquisition program at Brace-Up The Young College',
      },
    ],
  },
]

export default function GalleryPageClient() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const viewer = useRef<HTMLDialogElement>(null)
  const swipeStart = useRef<number | null>(null)
  const reducedMotion = useReducedMotion()

  const activePhotos = activeCategory
    ? categories.find((c) => c.id === activeCategory)?.photos ?? []
    : []

  const selected = activePhotos.find((p) => p.id === selectedId)
  const selectedIndex = activePhotos.findIndex((p) => p.id === selectedId)

  function openCategory(categoryId: string) {
    setActiveCategory(categoryId)
    setSelectedId(null)
  }

  function backToCategories() {
    setActiveCategory(null)
    setSelectedId(null)
  }

  function openPhoto(photoId: string) {
    setSelectedId(photoId)
  }

  function movePhoto(direction: number) {
    setSelectedId((current) => {
      const index = activePhotos.findIndex((p) => p.id === current)
      return activePhotos[(index + direction + activePhotos.length) % activePhotos.length].id
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
  }, [selectedId, activePhotos])

  useEffect(() => {
    if (!selectedId) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
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
            {!activeCategory ? (
              <>
                <div className="gallery-header-row">
                  <h2 id="gallery-collection-title">Our Gallery</h2>
                  <a
                    href="https://drive.google.com/drive/folders/1_ik3ohifz_KfYGOkByaWPpDUzA8dZAaM"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button button-green-outline gallery-drive-btn"
                    aria-label="View full media archive on Google Drive (opens in new tab)"
                  >
                    <span>Full Media Archive</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                </div>
                <div className="gallery-photo-grid">
                  {categories.map((cat) => (
                    <figure className="gallery-photo" key={cat.id}>
                      <button
                        className="gallery-photo-button"
                        aria-label={`View ${cat.label} gallery (${cat.photos.length} photos)`}
                        onClick={() => openCategory(cat.id)}
                      >
                        <Image
                          src={cat.cover}
                          alt={cat.label}
                          fill
                          sizes="(max-width: 600px) 90vw, (max-width: 1000px) 44vw, 30vw"
                        />
                      </button>
                      <figcaption>{cat.label}</figcaption>
                    </figure>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="gallery-category-header">
                  <button
                    className="gallery-back-button"
                    onClick={backToCategories}
                    aria-label="Back to all categories"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                    All Categories
                  </button>
                  <h2 id="gallery-collection-title">
                    {categories.find((c) => c.id === activeCategory)?.label}
                  </h2>
                </div>
                <div className="gallery-photo-grid">
                  {activePhotos.map((photo) => (
                    <figure className="gallery-photo" key={photo.id}>
                      <button
                        className="gallery-photo-button"
                        aria-label={`Enlarge photo: ${photo.title}`}
                        onClick={() => openPhoto(photo.id)}
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
              </>
            )}
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
                {selectedIndex + 1} / {activePhotos.length}
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
