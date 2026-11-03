'use client'

import Image from 'next/image'
import { FormEvent } from 'react'
import { getFormspreeEndpoint, publicSiteConfig } from '@/lib/public-site-config'
import { Footer } from './LandingSections'
import { SiteHeader } from './SiteChrome'
import { useFormspree } from './useFormspree'

export default function VolunteerPageClient() {
  const endpoint = getFormspreeEndpoint(publicSiteConfig.volunteerFormspreeEndpoint)
  const { state, message, submit } = useFormspree()

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!endpoint) return
    const form = event.currentTarget
    if (!form.reportValidity()) return
    const data = new FormData(form)
    const sent = await submit(endpoint, {
      name: String(data.get('name') ?? '').trim(),
      email: String(data.get('email') ?? '').trim(),
      phone: String(data.get('phone') ?? '').trim(),
      location: String(data.get('location') ?? '').trim(),
      message: String(data.get('message') ?? '').trim(),
      _gotcha: String(data.get('_gotcha') ?? ''),
    })
    if (sent) form.reset()
  }

  return (
    <>
      <main className="volunteer-page" id="main-content" tabIndex={-1}>
        <section className="volunteer-hero" aria-labelledby="volunteer-page-title">
          <SiteHeader active="volunteer" />
          <div className="volunteer-hero-copy">
            <h1 id="volunteer-page-title">
              Join Our Community
              <br />
              of Blessings
            </h1>
            <p>
              Become part of a passionate network of volunteers dedicated to empowering lives
              <br className="volunteer-desktop-break" /> through education and compassionate
              support.
            </p>
          </div>
        </section>

        <section className="volunteer-application" aria-labelledby="volunteer-form-title">
          <div className="volunteer-application-inner">
            <div className="volunteer-art">
              <Image
                src="/assets/volunteer-collage.webp"
                alt="Path to Blessings volunteers distributing supplies, supporting a community member, and visiting a classroom"
                width={585}
                height={630}
                priority
              />
            </div>

            <div className="volunteer-form-column">
              <span className="volunteer-label">VOLUNTEER WITH US</span>
              <h2 id="volunteer-form-title">Become a Blessing Today</h2>
              <form
                className="volunteer-form"
                onSubmit={handleSubmit}
                aria-busy={state === 'sending'}
                aria-describedby="volunteer-form-status"
              >
                <p
                  className="volunteer-form-notice"
                  id="volunteer-form-status"
                  role={state === 'error' ? 'alert' : 'status'}
                >
                  {!endpoint
                    ? 'Volunteer applications are temporarily unavailable. Please check back soon.'
                    : state === 'success'
                      ? 'Thank you. Your volunteer application has been sent.'
                      : message || 'Your contact details and message will be sent to Formspree.'}
                </p>
                <fieldset className="volunteer-fields" disabled={!endpoint || state === 'sending'}>
                  <legend className="sr-only">Volunteer application</legend>
                  <div className="volunteer-field">
                    <label htmlFor="volunteer-name">Full name</label>
                    <input
                      id="volunteer-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="e.g. John doe"
                      required
                      minLength={2}
                      maxLength={120}
                    />
                  </div>
                  <div className="volunteer-field">
                    <label htmlFor="volunteer-email">Email address</label>
                    <input
                      id="volunteer-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      inputMode="email"
                      placeholder="e.g. johndoes@gmail.com"
                      required
                      maxLength={254}
                    />
                  </div>
                  <div className="volunteer-field">
                    <label htmlFor="volunteer-phone">Phone number</label>
                    <input
                      id="volunteer-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      inputMode="tel"
                      placeholder="e.g. +234 000 000 000"
                      required
                      maxLength={30}
                    />
                  </div>
                  <div className="volunteer-field">
                    <label htmlFor="volunteer-location">Location (State, Country)</label>
                    <input
                      id="volunteer-location"
                      name="location"
                      type="text"
                      autoComplete="address-level1"
                      placeholder="Enter your State and Country"
                      required
                      maxLength={160}
                    />
                  </div>
                  <div className="volunteer-field">
                    <label htmlFor="volunteer-message">How would you like to volunteer?</label>
                    <textarea
                      id="volunteer-message"
                      name="message"
                      placeholder="Start typing!..."
                      required
                      minLength={10}
                      maxLength={2000}
                    />
                  </div>
                  <div className="form-honeypot" aria-hidden="true">
                    <label>
                      Leave this field empty
                      <input name="_gotcha" tabIndex={-1} autoComplete="off" />
                    </label>
                  </div>
                  <button
                    className="volunteer-submit"
                    type="submit"
                    aria-describedby="volunteer-form-status"
                  >
                    {state === 'sending' ? 'Sending…' : 'Submit'}
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
