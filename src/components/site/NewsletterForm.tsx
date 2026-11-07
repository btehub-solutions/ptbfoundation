'use client'

import { FormEvent } from 'react'
import { getFormspreeEndpoint, publicSiteConfig } from '@/lib/public-site-config'
import { useFormspree } from './useFormspree'

export default function NewsletterForm() {
  const endpoint = getFormspreeEndpoint(publicSiteConfig.newsletterFormspreeEndpoint)
  const { state, message, submit } = useFormspree()

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!endpoint) return
    const form = event.currentTarget
    if (!form.reportValidity()) return
    const data = new FormData(form)
    const sent = await submit(endpoint, {
      _subject: 'New Newsletter Subscriber - Path to Blessings',
      form_type: 'Newsletter Subscription (Footer)',
      subscriber_email: String(data.get('email') ?? '').trim(),
      email: String(data.get('email') ?? '').trim(),
      subscribed_at: new Date().toISOString(),
      _gotcha: String(data.get('_gotcha') ?? ''),
    })
    if (sent) form.reset()
  }

  return (
    <form onSubmit={handleSubmit} aria-busy={state === 'sending'}>
      <fieldset disabled={!endpoint || state === 'sending'}>
        <legend className="sr-only">Request email updates</legend>
        <label className="sr-only" htmlFor="newsletter-email">
          Your email address
        </label>
        <div className="newsletter-input">
          <input
            id="newsletter-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Your email address"
            required
            maxLength={254}
            aria-describedby="newsletter-status"
          />
          <button
            type="submit"
            aria-label={state === 'sending' ? 'Sending signup request' : 'Subscribe to newsletter'}
          >
            <svg width="29" height="29" viewBox="0 0 28 28" fill="none" aria-hidden="true">
              <path d="m5 5 19 9L5 23v-7l12-2L5 12V5Z" fill="currentColor" />
            </svg>
          </button>
        </div>
        <div className="form-honeypot" aria-hidden="true">
          <label>
            Leave this field empty
            <input name="_gotcha" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
      </fieldset>
      <p
        className="newsletter-notice"
        id="newsletter-status"
        role={state === 'error' ? 'alert' : 'status'}
      >
        {!endpoint
          ? 'Email signup is currently unavailable.'
          : state === 'success'
            ? 'Thank you. Your request for updates has been sent.'
            : message || 'Your email will be sent to Formspree to request updates.'}
      </p>
    </form>
  )
}
