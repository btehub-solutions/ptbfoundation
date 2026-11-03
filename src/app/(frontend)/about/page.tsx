import { createPageMetadata } from '@/lib/site-metadata'
import AboutPageClient from '@/components/site/AboutPageClient'

export const metadata = createPageMetadata(
  '/about',
  'About Us | Path to Blessings Charity Foundation',
  'Learn about our mission, values, and the people behind Path to Blessings Charity Foundation, empowering lives through education and compassionate support.',
)

export default function AboutPage() {
  return <AboutPageClient />
}
