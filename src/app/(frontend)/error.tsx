'use client'

import Link from 'next/link'

export default function ErrorPage({
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  return (
    <main id="main-content" tabIndex={-1} className="site-recovery-page">
      <h1>Something went wrong.</h1>
      <p>We couldn’t load this page. Please try again or return to the home page.</p>
      <div className="site-recovery-actions">
        <button className="button button-gold" onClick={() => unstable_retry()}>
          Try again
        </button>
        <Link className="button button-green-outline" href="/">
          Back to home
        </Link>
      </div>
    </main>
  )
}
