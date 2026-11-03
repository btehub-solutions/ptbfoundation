import { createPageMetadata } from '@/lib/site-metadata'
import VolunteerPageClient from '@/components/site/VolunteerPageClient'

export const metadata = createPageMetadata(
  '/volunteer',
  'Volunteer | Path to Blessings Charity Foundation',
  'Join our community of volunteers dedicated to empowering lives through education and compassionate support.',
)

export default function VolunteerPage() {
  return <VolunteerPageClient />
}
