import { Footer } from './LandingSections'
import ProjectsEmptyState from './ProjectsEmptyState'
import { SiteHeader } from './SiteChrome'

export default function ProjectsPage() {
  return (
    <>
      <main className="project-page" id="main-content" tabIndex={-1}>
        <section className="project-hero" aria-labelledby="project-page-title">
          <SiteHeader active="projects" />
          <div className="project-hero-copy">
            <h1 id="project-page-title">
              Our Work in Action:
              <br />
              See the Results
            </h1>
            <p>
              Discover the diverse projects at Path to Blessings and find opportunities to get
              involved
              <br className="project-desktop-break" /> and make a difference in the lives of others.
            </p>
          </div>
        </section>
        <section className="all-projects" aria-labelledby="all-projects-heading">
          <div className="projects-page-container">
            <div className="all-projects-heading">
              <span>OUR PROJECTS</span>
              <h2 id="all-projects-heading">Our Work in Action</h2>
            </div>
            <ProjectsEmptyState />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
