import { Footer, LandingSections } from './LandingSections'
import { Arrow, SiteHeader } from './SiteChrome'

const impact = [
  { image: 'volunteers', number: '30', label: 'Volunteers' },
  { image: 'empowerment', number: '2k', label: 'Empowerment programs' },
  { image: 'countries', number: '2', label: 'Countries reached' },
]

export default function App() {
  return (
    <>
      <main id="main-content" tabIndex={-1}>
        <section className="hero" id="home" aria-labelledby="hero-title">
          <SiteHeader active="home" />

          <div className="hero-layout">
            <div className="hero-copy">
              <h1 id="hero-title">
                <span className="heading-first">
                  <span className="highlight">Building Futures,</span>
                  <span>One</span>
                </span>
                <span className="heading-second">Blessing at a Time</span>
              </h1>
              <p className="hero-description">
                Path to Blessings Charity Foundation: Merging Technology with Compassion to
                <br className="desktop-break" /> Transform Lives Through Education and Support.
              </p>
              <div className="hero-actions">
                <a className="button button-white" href="/donate">
                  Donate now
                </a>
                <a className="button button-outline" href="/volunteer">
                  Volunteer <Arrow />
                </a>
              </div>
            </div>
            <div className="hero-visual">
              <img
                src="/assets/community-collage.webp"
                alt="Path to Blessings volunteers supporting their community, visiting a radio station, and distributing essential supplies"
                width="557"
                height="478"
                fetchPriority="high"
              />
            </div>
          </div>
        </section>

        <section className="impact" id="impact" aria-label="Our impact">
          <div className="impact-inner">
            {impact.map((item) => (
              <div className={`impact-item impact-${item.image}`} key={item.image}>
                <img src={`/assets/${item.image}.webp`} width="134" height="134" alt="" />
                <div>
                  <p className="impact-number">
                    {item.number}
                    <span>+</span>
                  </p>
                  <p className="impact-label">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <LandingSections />
      </main>
      <Footer />
    </>
  )
}
