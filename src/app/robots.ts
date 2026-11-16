import type { MetadataRoute } from 'next'
import { makeSiteSettings } from '@/lib/make-site-settings'
import { siteURL } from '@/lib/site-metadata'

export default function robots(): MetadataRoute.Robots {
  return {
    rules:
      makeSiteSettings.robots?.index === false
        ? { userAgent: '*', disallow: '/' }
        : [
            {
              userAgent: '*',
              allow: '/',
              disallow: ['/admin', '/api/', '/.figma/'],
            },
            {
              userAgent: [
                'GPTBot',
                'ChatGPT-User',
                'ClaudeBot',
                'PerplexityBot',
                'Google-Extended',
                'Applebot-Extended',
              ],
              allow: '/',
              disallow: ['/admin', '/api/', '/.figma/'],
            },
          ],
    sitemap: new URL('/sitemap.xml', siteURL).href,
    host: siteURL.origin,
  }
}
