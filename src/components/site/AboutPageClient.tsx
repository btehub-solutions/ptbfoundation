'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { Footer, JoinUs } from './LandingSections'
import { SiteHeader } from './SiteChrome'

const values = ['Empowerment', 'Teamwork', 'Excellence']

const objectives = [
  'To transform lives through education, healthcare, empowerment, & compassion driven actions.',
  'To merge the power of technology with the heart of charity, creating lasting & impactful change.',
  'Offer scholarships and financial aid to deserving students',
  'Empowerment: Providing opportunities for self-sufficiency & growth.',
  'Feeding the Poor: Alleviating hunger in underserved communities.',
  'Collaborate with schools & organizations: providing students with access to technology & digital resources to enhance quality education.',
]

const trustees = [
  {
    image: 'founder',
    name: 'Ogedengbe Nimotallahi',
    role: 'FOUNDER',
    alt: 'Ogedengbe Nimotallahi smiling while working on a laptop',
  },
  {
    image: 'trustee-2',
    name: 'Board of Trustees',
    role: 'TRUSTEE',
    alt: 'A trustee smiling at a desk',
  },
  {
    image: 'trustee-3',
    name: 'Board of Trustees',
    role: 'TRUSTEE',
    alt: 'A trustee in a patterned blouse',
  },
  {
    image: 'trustee-4',
    name: 'Board of Trustees',
    role: 'TRUSTEE',
    alt: 'A trustee in a suit holding a tablet',
  },
  {
    image: 'trustee-5',
    name: 'Board of Trustees',
    role: 'TRUSTEE',
    alt: 'A trustee in a shirt and tie speaking on the phone',
  },
]

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <span className="section-label">{children}</span>
}

function CoreValues() {
  return (
    <section className="about-values" aria-labelledby="about-values-heading">
      <div className="about-container">
        <div className="section-heading">
          <SectionLabel>OUR CORE VALUES</SectionLabel>
          <h2 id="about-values-heading">What We Stand For</h2>
        </div>
        <div className="about-values-grid">
          {values.map((value, index) => (
            <figure className="about-value" key={value}>
              <Image
                src="/assets/about/core-value.webp"
                alt="A volunteer sharing support with a community member"
                width={500}
                height={373}
                sizes="(max-width: 700px) 90vw, 34vw"
              />
              <figcaption>
                <span aria-hidden="true">{index + 1}</span>
                <h3>{value}</h3>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

function OurStory() {
  return (
    <section className="about-story" aria-labelledby="about-story-heading">
      <div className="about-container about-story-grid">
        <Image
          className="about-story-art"
          src="/assets/about/story-collage.webp"
          alt="Path to Blessings volunteers supporting a community member, distributing supplies, and visiting children in a classroom"
          width={568}
          height={591}
          sizes="(max-width: 800px) 90vw, 40vw"
        />
        <div className="about-story-copy">
          <SectionLabel>ABOUT US</SectionLabel>
          <h2 id="about-story-heading">Our Story</h2>
          <p>
            A Nigeria-based Non-Governmental Organization that seeks to stand as a guiding light of
            hope in a world filled with challenges, focusing our efforts on four pillars that define
            our mission: clean water and sanitation, climate action, good health and well-being and
            the pursuit of zero poverty.
          </p>
          <p>Our motto is “After Every Hardship comes ease.”</p>
          <p className="about-story-second">
            Through dedicated initiatives, we are working to ensure that clean water is not a
            privilege but a fundamental right, that climate action is not a choice but a
            responsibility, that healthcare gaps are bridged and that the shadows of poverty are
            replaced with the light of opportunity.
          </p>
        </div>
      </div>
    </section>
  )
}

function MissionVision() {
  return (
    <section className="about-mission" aria-label="Our mission and vision">
      <div className="about-container about-mission-grid">
        <div className="about-mission-copy">
          <SectionLabel>GUIDING MISSION</SectionLabel>
          <h2>Our Mission</h2>
          <p>
            To empower public school students through innovative, tech-driven and charitable
            educational programs.
          </p>
        </div>
        <Image
          className="about-mission-art"
          src="/assets/about/mission-vision.webp"
          alt="Two Path to Blessings volunteers framed by interlocking green circles"
          width={509}
          height={450}
          sizes="(max-width: 800px) 90vw, 36vw"
        />
        <div className="about-mission-copy">
          <SectionLabel>GUIDING VISION</SectionLabel>
          <h2>Our Vision</h2>
          <p>
            To merge the power of technology with the heart of charity for sustainable educational
            impact
          </p>
        </div>
      </div>
    </section>
  )
}

function Objectives() {
  return (
    <section className="about-objectives" aria-labelledby="about-objectives-heading">
      <div className="about-container about-objectives-grid">
        <div className="about-objectives-art">
          <span className="about-objective-rule rule-left" aria-hidden="true" />
          <span className="about-objective-rule rule-right" aria-hidden="true" />
          <div className="about-ribbon about-ribbon-left">
            <Image
              src="/assets/about/volunteer-pair.webp"
              alt=""
              fill
              sizes="(max-width: 800px) 28vw, 190px"
            />
          </div>
          <div className="about-ribbon about-ribbon-center">
            <Image
              src="/assets/about/volunteer-pair.webp"
              alt="Two members of the Path to Blessings volunteer team"
              fill
              sizes="(max-width: 800px) 28vw, 190px"
            />
          </div>
          <div className="about-ribbon about-ribbon-right">
            <Image
              src="/assets/about/volunteer-pair.webp"
              alt=""
              fill
              sizes="(max-width: 800px) 28vw, 190px"
            />
          </div>
          <div className="about-objective-stat">
            <p>Our team</p>
            <span>Compassion in action</span>
          </div>
        </div>
        <div className="about-objectives-copy">
          <SectionLabel>WHY US?</SectionLabel>
          <h2 id="about-objectives-heading">Our Aim &amp; Objectives</h2>
          <ul>
            {objectives.map((objective) => (
              <li key={objective}>
                <Image src="/assets/about/objective-mark.webp" width={45} height={45} alt="" />
                <p>{objective}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function BoardOfTrustees() {
  const [active, setActive] = useState(0)
  const memberButtons = useRef<Array<HTMLButtonElement | null>>([])

  function focusMember(index: number) {
    const next = (index + trustees.length) % trustees.length
    setActive(next)
    memberButtons.current[next]?.focus()
  }

  return (
    <section className="about-board" aria-labelledby="about-board-heading">
      <div className="about-container">
        <div className="section-heading">
          <SectionLabel>THE BOARD</SectionLabel>
          <h2 id="about-board-heading">Meet The Board of Trustees</h2>
        </div>
        <div className="about-board-gallery" role="group" aria-label="Board of trustees portraits">
          {trustees.map((trustee, index) => (
            <button
              key={trustee.image}
              ref={(element) => {
                memberButtons.current[index] = element
              }}
              className={`about-trustee ${active === index ? 'is-active' : ''}`}
              aria-label={
                index === 0
                  ? 'View Ogedengbe Nimotallahi, Founder'
                  : `View trustee portrait ${index + 1}`
              }
              aria-pressed={active === index}
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              onClick={() => setActive(index)}
              onKeyDown={(event) => {
                if (event.key === 'ArrowRight') {
                  event.preventDefault()
                  focusMember(index + 1)
                }
                if (event.key === 'ArrowLeft') {
                  event.preventDefault()
                  focusMember(index - 1)
                }
                if (event.key === 'Home') {
                  event.preventDefault()
                  focusMember(0)
                }
                if (event.key === 'End') {
                  event.preventDefault()
                  focusMember(trustees.length - 1)
                }
              }}
            >
              <Image
                src={`/assets/about/${trustee.image}.webp`}
                alt={trustee.alt}
                fill
                sizes={
                  index === 0 ? '(max-width: 700px) 86vw, 40vw' : '(max-width: 700px) 86vw, 25vw'
                }
              />
              <span className="about-trustee-caption" aria-hidden={active !== index}>
                <span className="about-trustee-name">{trustee.name}</span>
                <span className="about-trustee-role">{trustee.role}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function AboutPageClient() {
  return (
    <>
      <main className="about-page landing-content" id="main-content" tabIndex={-1}>
        <section className="project-hero about-hero" aria-labelledby="about-page-title">
          <SiteHeader active="about" />
          <div className="project-hero-copy about-hero-copy">
            <h1 id="about-page-title">
              Our Mission: Empowering Lives
              <br className="about-desktop-break" /> Through Education
            </h1>
            <p>
              Learn about the passionate individuals and dedicated partners who make Path to
              <br className="about-desktop-break" /> Blessings’ work possible, and see how we’re
              making a difference
            </p>
          </div>
        </section>
        <CoreValues />
        <OurStory />
        <MissionVision />
        <Objectives />
        <BoardOfTrustees />
        <JoinUs />
      </main>
      <Footer />
    </>
  )
}
