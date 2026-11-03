import type { MetadataRoute } from 'next'
import { publicRoutes, siteURL } from '@/lib/site-metadata'

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((route) => ({ url: new URL(route, siteURL).href }))
}
