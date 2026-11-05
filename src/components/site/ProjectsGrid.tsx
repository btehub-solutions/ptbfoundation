'use client'

import { useState } from 'react'
import { projects, PROJECTS_PER_PAGE, type Project } from '@/data/projects'

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="all-project-card">
      <div>
        {project.image ? (
          <img src={project.image} alt={project.title} width={411} height={266} />
        ) : (
          <div
            style={{
              width: '100%',
              aspectRatio: '411 / 266',
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

export default function ProjectsGrid() {
  const [page, setPage] = useState(1)
  const totalPages = Math.ceil(projects.length / PROJECTS_PER_PAGE)
  const start = (page - 1) * PROJECTS_PER_PAGE
  const visible = projects.slice(start, start + PROJECTS_PER_PAGE)

  function goToPage(newPage: number) {
    setPage(newPage)
    const target = document.getElementById('all-projects-heading')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      window.scrollTo({ top: 400, behavior: 'smooth' })
    }
  }

  function pageNumbers(): (number | 'ellipsis')[] {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1)
    const pages: (number | 'ellipsis')[] = [1]
    if (page > 3) pages.push('ellipsis')
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
      pages.push(i)
    }
    if (page < totalPages - 2) pages.push('ellipsis')
    pages.push(totalPages)
    return pages
  }

  return (
    <>
      <div className="all-projects-grid" style={{ minHeight: '520px' }}>
        {visible.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>

      {totalPages > 1 && (
        <nav className="project-pagination" aria-label="Projects pagination">
          <button
            className="pagination-word"
            disabled={page === 1}
            onClick={() => goToPage(page - 1)}
          >
            Prev
          </button>
          {pageNumbers().map((n, i) =>
            n === 'ellipsis' ? (
              <span key={`e${i}`} className="pagination-ellipsis">
                …
              </span>
            ) : (
              <button
                key={n}
                className={`pagination-number${n === page ? ' is-current' : ''}`}
                onClick={() => goToPage(n)}
                aria-current={n === page ? 'page' : undefined}
              >
                {n}
              </button>
            ),
          )}
          <button
            className="pagination-word"
            disabled={page === totalPages}
            onClick={() => goToPage(page + 1)}
          >
            Next
          </button>
        </nav>
      )}
    </>
  )
}
