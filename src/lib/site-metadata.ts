import type { Metadata } from 'next'
import { makeSiteSettings } from './make-site-settings'
import { publicSiteConfig } from './public-site-config'

export const siteName = 'Path to Blessings Charity Foundation'
export const publicRoutes = [
  '/',
  '/projects',
  '/volunteer',
  '/gallery',
  '/about',
  '/donate',
] as const

export const siteURL = new URL(
  publicSiteConfig.siteURL || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
)

export const defaultKeywords = [
  'Path to Blessings Charity Foundation',
  'Path to Blessings',
  'NGO Nigeria',
  'Charity Foundation Ogun State',
  'Education Charity Nigeria',
  'Special Needs Support Ogun State',
  'Public School Technology Outreach',
  'Community Food Relief Nigeria',
  'Nonprofit Organization Nigeria',
  'Youth Empowerment Ogun State',
  'Volunteer Nigeria',
  'Abeokuta Charity',
]

export function createPageMetadata(path: string, title: string, description: string): Metadata {
  const imageRelative = makeSiteSettings.openGraph?.image || '/social-preview.png'
  const imageUrl = new URL(imageRelative, siteURL).href

  return {
    title,
    description,
    keywords: defaultKeywords,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      locale: 'en_NG',
      siteName,
      url: path,
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          type: 'image/png',
          alt: `${siteName} - Merging Technology with Compassion`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    other: {
      'geo.region': 'NG-OG',
      'geo.placename': 'Abeokuta, Ogun State, Nigeria',
      'geo.position': '7.1475;3.3619',
      ICBM: '7.1475, 3.3619',
    },
  }
}
