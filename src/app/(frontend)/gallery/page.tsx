import { createPageMetadata } from '@/lib/site-metadata'
import GalleryPageClient from '@/components/site/GalleryPageClient'

export const metadata = createPageMetadata(
  '/gallery',
  'Gallery | Path to Blessings Charity Foundation',
  'Photographs of our volunteers, learning activities, and community outreach at Path to Blessings Charity Foundation.',
)

export default function GalleryPage() {
  return <GalleryPageClient />
}
