import { createPageMetadata } from '@/lib/site-metadata'
import ProjectsPageClient from '@/components/site/ProjectsPageClient'

export const metadata = createPageMetadata(
  '/projects',
  'Projects | Path to Blessings Charity Foundation',
  'Discover the work of Path to Blessings and find opportunities to support education and community outreach.',
)

export default function ProjectsPage() {
  return <ProjectsPageClient />
}
