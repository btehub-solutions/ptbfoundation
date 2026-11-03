import type { Metadata } from 'next'
import NotFound from './(frontend)/not-found'
import './(frontend)/styles.css'

export const metadata: Metadata = {
  title: 'Page Not Found | Path to Blessings Charity Foundation',
  description: 'The page you are looking for does not exist.',
  robots: { index: false, follow: true },
}

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body>
        <NotFound />
      </body>
    </html>
  )
}
