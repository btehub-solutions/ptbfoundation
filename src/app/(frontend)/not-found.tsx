import Link from 'next/link'

export default function NotFound() {
  return (
    <main id="main-content" tabIndex={-1} className="site-recovery-page">
      <p className="site-recovery-code">404</p>
      <h1>Page not found.</h1>
      <p>The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
      <div className="site-recovery-actions">
        <Link className="button button-gold" href="/">
          Back to home
        </Link>
        <Link className="button button-green-outline" href="/gallery">
          Visit the gallery
        </Link>
      </div>
    </main>
  )
}
