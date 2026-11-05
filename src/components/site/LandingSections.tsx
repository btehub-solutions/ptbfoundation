import Link from 'next/link'
import { getContactEmail, getSocialLinks } from '@/lib/public-site-config'
import NewsletterForm from './NewsletterForm'
import FeaturedProjectsCarousel from './FeaturedProjectsCarousel'

export function Chevron() {
  return (
    <svg width="13" height="20" viewBox="0 0 13 20" fill="none" aria-hidden="true">
      <path d="m3 3 7 7-7 7" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function SectionHeading({ label, title, id }: { label: string; title: string; id: string }) {
  return (
    <div className="section-heading">
      <span className="section-label">{label}</span>
      <h2 id={id}>{title}</h2>
    </div>
  )
}

const pillars = [
  {
    icon: 'outreach',
    title: 'Outreach & support',
    description: [
      'Transform lives through education,',
      'healthcare, empowerment, & compassion',
      'driven action',
    ],
  },
  {
    icon: 'innovation',
    title: 'Innovation',
    description: [
      'Merge the power of technology with',
      'the heart of charity, creating lasting &',
      'impactful change',
    ],
  },
  {
    icon: 'education',
    title: 'Educational empowerment',
    description: ['Offer scholarships &', 'financial aid to deserving students'],
  },
]

function WhoWeAre() {
  return (
    <section className="who-section" aria-labelledby="who-heading">
      <div className="page-container">
        <SectionHeading label="WHO WE ARE" title="Learn about who we are" id="who-heading" />
        <div className="pillar-grid">
          {pillars.map((pillar) => (
            <article
              className={`pillar-card pillar-${pillar.icon}`}
              key={pillar.icon}
              tabIndex={0}
            >
              <img
                src={`/assets/${pillar.icon}-icon.webp`}
                alt=""
                width="139"
                height="139"
                loading="lazy"
              />
              <h3>{pillar.title}</h3>
              <p>
                {pillar.description.map((line, index) => (
                  <span key={line}>
                    {index > 0 && ' '}
                    {line}
                  </span>
                ))}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function OurStory() {
  return (
    <section className="story-section" id="about" aria-labelledby="story-heading">
      <div className="page-container story-grid">
        <img
          className="story-art"
          src="/assets/our-story.webp"
          width="560"
          height="592"
          alt="Our volunteers distributing supplies, supporting a man with crutches, and visiting children in a classroom"
          loading="lazy"
        />
        <div className="story-copy">
          <span className="section-label">ABOUT US</span>
          <h2 id="story-heading">Our Story</h2>
          <p>
            A Nigeria-based Non-Governmental Organization that seeks to stand as a guiding light of
            hope in a world filled with challenges, focusing our efforts on four pillars that define
            our mission: clean water and sanitation, climate action, good health and well-being and
            the pursuit of zero poverty.
          </p>
          <p>
            Through dedicated initiatives, we are working to ensure that clean water is not a
            privilege but a fundamental right, that climate action is not a choice but a
            responsibility, that healthcare gaps are bridged and that the shadows of poverty are
            replaced with the light of opportunity.
          </p>
          <Link className="button button-outline" href="/about">
            Learn more <Chevron />
          </Link>
        </div>
      </div>
    </section>
  )
}

function FeaturedProjects() {
  return (
    <section className="projects-section" id="projects" aria-labelledby="projects-heading">
      <div className="page-container">
        <div className="projects-heading">
          <h2 id="projects-heading">Featured projects</h2>
          <Link className="button button-green-outline" href="/projects">
            See all projects <Chevron />
          </Link>
        </div>
        <FeaturedProjectsCarousel />
      </div>
    </section>
  )
}

function CommunityCommitment() {
  return (
    <section className="testimonials-section" id="community" aria-labelledby="community-heading">
      <div className="page-container">
        <SectionHeading
          label="OUR COMMITMENT"
          title="Putting people at the heart of our work"
          id="community-heading"
        />
        <div className="testimonial-frame">
          <img
            className="testimonial-scribble"
            src="/assets/testimonial-scribble.webp"
            width="108"
            height="186"
            alt=""
            loading="lazy"
          />
          <img
            className="testimonial-flourish"
            src="/assets/testimonial-flourish.webp"
            width="195"
            height="126"
            alt=""
            loading="lazy"
          />
          <div className="testimonial-card">
            <img
              className="testimonial-portrait"
              src="/assets/gallery/community-smile.webp"
              width="378"
              height="588"
              alt="A community member smiling outside her home"
              loading="lazy"
            />
            <div className="testimonial-copy">
              <p className="commitment-message">
                We bring technology and compassion together to support education, health, and
                stronger communities.
              </p>
              <div className="commitment-signature">
                <strong>Path to Blessings Charity Foundation</strong>
                <span>Education. Compassion. Opportunity.</span>
              </div>
              <Link className="button button-outline" href="/about">
                Our mission <Chevron />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FAQs() {
  const questions = [
    {
      question: 'What does Path to Blessings Charity Foundation do?',
      answer:
        'We are a Nigeria-based non-governmental organization focused on clean water and sanitation, climate action, good health and well-being, and the pursuit of zero poverty.',
      href: '/about',
      action: 'Learn about our mission',
    },
    {
      question: 'Who does the foundation support?',
      answer:
        'Our work supports public school students and communities through education, community outreach, and compassionate support.',
      href: '/projects',
      action: 'Explore our work',
    },
    {
      question: 'How can I volunteer?',
      answer:
        'Visit our volunteer page to learn how to take part. The page will show when applications are open.',
      href: '/volunteer',
      action: 'Volunteer with us',
    },
    {
      question: 'How do I donate?',
      answer:
        'Visit the donation page to choose an amount and currency. Online payments remain unavailable until our payment provider is connected.',
      href: '/donate',
      action: 'Explore donations',
    },
    {
      question: 'Can organizations get involved?',
      answer:
        'Our mission includes collaboration with schools and organizations to improve access to technology and educational resources.',
      href: '/about',
      action: 'Read our aims and objectives',
    },
    {
      question: 'Where can I see the community in action?',
      answer:
        'Our gallery shares photographs of volunteers, learning activities, and community outreach.',
      href: '/gallery',
      action: 'Visit the gallery',
    },
  ]
  return (
    <section className="faq-section" id="faqs" aria-labelledby="faq-heading">
      <div className="page-container">
        <SectionHeading label="FAQS" title="Frequently Asked Questions" id="faq-heading" />
        <div className="faq-list">
          {questions.map((item) => (
            <details className="faq-item" name="landing-faq" key={item.question}>
              <summary>
                {item.question}
                <span className="faq-chevron">
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="m5 8 5 5 5-5" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </span>
              </summary>
              <div className="faq-answer">
                <p>{item.answer}</p>
                <Link className="faq-action" href={item.href}>
                  {item.action} <Chevron />
                </Link>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

export function JoinUs() {
  const email = getContactEmail()
  return (
    <section className="join-section" aria-labelledby="join-heading">
      <div className="page-container join-card">
        <h2 id="join-heading">Join Us in Making a Difference</h2>
        <div className="join-actions">
          <Link className="button button-outline" href="/donate">
            Donate <Chevron />
          </Link>
          <Link className="button button-outline" href="/volunteer">
            Volunteer with us <Chevron />
          </Link>
          {email && (
            <a
              className="button button-outline"
              href={`mailto:${email}?subject=Partnership%20enquiry`}
            >
              Partner with us <Chevron />
            </a>
          )}
        </div>
      </div>
    </section>
  )
}

export function LandingSections() {
  return (
    <div className="landing-content">
      <WhoWeAre />
      <OurStory />
      <FeaturedProjects />
      <CommunityCommitment />
      <FAQs />
      <JoinUs />
    </div>
  )
}

export function Footer() {
  const email = getContactEmail()
  const socials = getSocialLinks()
  return (
    <footer className="site-footer">
      <img
        className="footer-ornament"
        src="/assets/footer-ornament.png"
        width="111"
        height="90"
        alt=""
        loading="lazy"
      />
      <div className="page-container footer-grid">
        <div className="footer-brand">
          <Link href="/#home" aria-label="Path to Blessings home">
            <img
              src="/assets/footer-logo.png"
              alt="Path to Blessings Charity Foundation"
              width="181"
              height="120"
              loading="lazy"
            />
          </Link>
          {(email || socials.length > 0) && (
            <div className="footer-socials">
              {socials.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  aria-label={`${link.name} (opens in a new tab)`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={`/assets/${link.image}.png`}
                    width="27"
                    height="25"
                    alt=""
                    loading="lazy"
                  />
                </a>
              ))}
              {email && (
                <a href={`mailto:${email}`} aria-label="Email Path to Blessings">
                  <img src="/assets/email.png" width="27" height="25" alt="" loading="lazy" />
                </a>
              )}
            </div>
          )}
        </div>
        <nav className="footer-nav" aria-label="Footer navigation">
          <Link href="/projects">Projects</Link>
          <Link href="/volunteer">Volunteer</Link>
          <Link href="/gallery">Gallery</Link>
          <Link href="/about">About us</Link>
        </nav>
        <div className="newsletter">
          <h2>Stay up to date</h2>
          <p>Stay informed on how you can make a difference.</p>
          <NewsletterForm />
        </div>
      </div>
      <p className="footer-copyright">
        © {new Date().getFullYear()} Path to Blessings Charity Foundation
      </p>
    </footer>
  )
}
