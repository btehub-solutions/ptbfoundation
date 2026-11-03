import { createPageMetadata } from '@/lib/site-metadata'
import HomePageClient from '@/components/site/HomePageClient'

export const metadata = createPageMetadata(
  '/',
  'Path to Blessings Charity Foundation',
  'Merging technology with compassion to transform lives through education and support.',
)

export default function HomePage() {
  return <HomePageClient />
}
