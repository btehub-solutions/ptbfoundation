import { createPageMetadata } from '@/lib/site-metadata'
import DonatePageClient from '@/components/site/DonatePageClient'

export const metadata = createPageMetadata(
  '/donate',
  'Donate | Path to Blessings Charity Foundation',
  'Support the education, community outreach, and compassionate care work of Path to Blessings Charity Foundation.',
)

export default function DonatePage() {
  return <DonatePageClient />
}
