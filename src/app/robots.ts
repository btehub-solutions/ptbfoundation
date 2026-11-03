import type { MetadataRoute } from 'next'
import { makeSiteSettings } from '@/lib/make-site-settings'
import { siteURL } from '@/lib/site-metadata'

export default function robots(): MetadataRoute.Robots {
  return {
    rules:
      makeSiteSettings.robots?.index === false
        ? { userAgent: '*', disallow: '/' }
        : { userAgent: '*', allow: '/', disallow: ['/admin', '/api/', '/.figma/'] },
    sitemap: new URL('/sitemap.xml', siteURL).href,
  }
}
