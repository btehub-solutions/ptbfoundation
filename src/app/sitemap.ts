import type { MetadataRoute } from 'next'
import { publicRoutes, siteURL } from '@/lib/site-metadata'

export default function sitemap(): MetadataRoute.Sitemap {
  const priorities: Record<string, number> = {
    '/': 1.0,
    '/projects': 0.9,
    '/donate': 0.9,
    '/about': 0.8,
    '/volunteer': 0.8,
    '/gallery': 0.8,
  }

  const changeFrequencies: Record<string, 'daily' | 'weekly' | 'monthly'> = {
    '/': 'weekly',
    '/projects': 'weekly',
    '/gallery': 'weekly',
    '/donate': 'monthly',
    '/about': 'monthly',
    '/volunteer': 'monthly',
  }

  const now = new Date()

  return publicRoutes.map((route) => ({
    url: new URL(route, siteURL).href,
    lastModified: now,
    changeFrequency: changeFrequencies[route] || 'monthly',
    priority: priorities[route] ?? 0.7,
  }))
}
