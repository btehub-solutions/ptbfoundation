'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { getDonationWhatsAppURL, publicSiteConfig } from '@/lib/public-site-config'
import { Footer } from './LandingSections'
import { Arrow, SiteHeader } from './SiteChrome'

type CopyKey = 'bank' | 'name' | string

function CopyIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="8" y="8" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  )
}

export default function DonatePageClient() {
  const [copied, setCopied] = useState<CopyKey | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const whatsAppURL = getDonationWhatsAppURL()

  useEffect(() => () => clearTimeout(timer.current), [])

  async function copy(value: string, key: CopyKey) {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(key)
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setCopied(null), 2200)
    } catch {
      setCopied(null)
    }
  }

  return (
    <>
      <main className="donate-page" id="main-content" tabIndex={-1}>
        <section className="project-hero" aria-labelledby="donate-title">
          <SiteHeader active="donate" />
          <div className="project-hero-copy donate-hero-copy">
            <h1 id="donate-title">
              Give Hope.
              <br />
              Make a Difference.
            </h1>
            <p>
              Support education, community outreach,
              <br className="donate-desktop-break" /> and compassionate care through a direct bank
              transfer.
            </p>
          </div>
        </section>

        <section className="donation-section" aria-labelledby="donation-heading">
          <div className="donation-container">
            <div className="donation-introduction">
              <span className="section-label">DONATE DIRECTLY</span>
              <h2 id="donation-heading">
                Your generosity,
                <br />a lasting blessing.
              </h2>
              <p>
                Choose the account that matches your transfer currency. Before sending, confirm that
                your banking app displays the account name shown on this page.
              </p>
              <ul className="donation-purpose-list">
                <li>Education and learning</li>
                <li>Community outreach and support</li>
                <li>Essential supplies for people in need</li>
              </ul>
              <Link href="/projects" className="donation-work-link">
                Learn about our work <Arrow />
              </Link>
            </div>

            <div className="bank-transfer-panel" aria-labelledby="bank-transfer-heading">
              <div className="bank-transfer-heading">
                <p>DIRECT BANK TRANSFER</p>
                <h3 id="bank-transfer-heading">Donation accounts</h3>
                <span>Jaiz Bank · Nigeria</span>
              </div>

              <div className="bank-identity">
                <div>
                  <span>Account name</span>
                  <strong>{publicSiteConfig.donationAccountName}</strong>
                </div>
                <button
                  type="button"
                  aria-label="Copy account name"
                  onClick={() => copy(publicSiteConfig.donationAccountName, 'name')}
                >
                  <CopyIcon />
                  {copied === 'name' ? 'Copied' : 'Copy'}
                </button>
              </div>

              <div className="bank-account-list">
                {publicSiteConfig.donationAccounts.map((account) => (
                  <article className="bank-account-card" key={account.code}>
                    <div className="bank-account-meta">
                      <span>{account.code}</span>
                      <p>{account.currency} account</p>
                    </div>
                    <div className="bank-account-number">
                      <span>Account number</span>
                      <strong>{account.accountNumber}</strong>
                    </div>
                    <button
                      type="button"
                      aria-label={`Copy ${account.currency} account number`}
                      onClick={() => copy(account.accountNumber, account.code)}
                    >
                      <CopyIcon />
                      {copied === account.code ? 'Copied' : 'Copy number'}
                    </button>
                  </article>
                ))}
              </div>

              <div className="transfer-safety-note">
                <strong>Before you transfer</strong>
                <p>
                  Confirm the recipient is “{publicSiteConfig.donationAccountName}”. Your bank
                  provides the final transfer confirmation; this website does not collect card or
                  banking credentials.
                </p>
              </div>

              <div className="donation-contact-actions">
                {whatsAppURL && (
                  <a href={whatsAppURL} target="_blank" rel="noopener noreferrer">
                    <img src="/assets/whatsapp.png" alt="" width="24" height="23" />
                    Follow up on WhatsApp
                  </a>
                )}
                <a href={`mailto:${publicSiteConfig.contactEmail}?subject=Donation%20enquiry`}>
                  <img src="/assets/email.png" alt="" width="24" height="23" />
                  Email the foundation
                </a>
              </div>
              <p className="donation-contact-note">
                For clarification, call{' '}
                <a href={`tel:${publicSiteConfig.clarificationPhone}`}>
                  {publicSiteConfig.clarificationPhoneDisplay}
                </a>{' '}
                or WhatsApp {publicSiteConfig.whatsappDisplay}.
              </p>
              <p className="copy-announcement" role="status" aria-live="polite">
                {copied ? 'Copied to clipboard.' : ''}
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
