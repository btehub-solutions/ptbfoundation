import Link from 'next/link'

export default function ProjectsEmptyState() {
  return (
    <div className="projects-empty-state">
      <h3>Project updates are on the way.</h3>
      <p>
        We’re preparing detailed stories from our work. In the meantime, explore our gallery to see
        our community in action, or learn more about our mission.
      </p>
      <div className="projects-empty-actions">
        <Link href="/gallery" className="button button-green-outline">
          Visit the gallery
        </Link>
        <Link href="/about" className="projects-mission-link">
          Learn about our mission
        </Link>
      </div>
    </div>
  )
}
