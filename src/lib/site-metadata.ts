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

export function createPageMetadata(path: string, title: string, description: string): Metadata {
  const image = makeSiteSettings.openGraph?.image || '/social-preview.png'
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      locale: 'en_NG',
      siteName,
      url: path,
      title,
      description,
      images: [{ url: image, alt: siteName }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  }
}
