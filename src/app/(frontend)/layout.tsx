import React from 'react'
import type { Metadata } from 'next'
import Script from 'next/script'
import { BodyCustomCode, renderHeadCustomCode } from '@/lib/make-custom-code'
import { makeSiteSettings, sanitizeHtmlAttribute } from '@/lib/make-site-settings'
import { createPageMetadata, siteName, siteURL } from '@/lib/site-metadata'
import MotionEnhancements from '@/components/site/MotionEnhancements'
import './styles.css'

const defaultTitle = siteName
const title = makeSiteSettings.title ?? defaultTitle
const description =
  makeSiteSettings.description ??
  'Merging technology with compassion to transform lives through education and support.'
const favicon = makeSiteSettings.icons?.icon
const googleAnalyticsId = sanitizeHtmlAttribute(makeSiteSettings.analytics?.googleAnalyticsId)

export const metadata: Metadata = {
  ...createPageMetadata('/', title, description),
  metadataBase: siteURL,
  robots: makeSiteSettings.robots?.index === false ? { follow: false, index: false } : undefined,
  icons: { icon: favicon || '/favicon.png', apple: '/apple-touch-icon.png' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const language = sanitizeHtmlAttribute(makeSiteSettings.language) || 'en'
  const customScripts = makeSiteSettings.customScripts

  return (
    <html lang={language}>
      <head>
        <link
          rel="preload"
          href="/fonts/syne-400.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/syne-500.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/fraunces-900.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        {renderHeadCustomCode(customScripts?.headStart, 'head-start')}
        {renderHeadCustomCode(customScripts?.headEnd, 'head-end')}
      </head>
      <body className="min-h-screen bg-white text-zinc-950 antialiased">
        <BodyCustomCode html={customScripts?.bodyStart} />
        <a className="figma-bypass-link" href="#main-content">
          Skip to content
        </a>
        <div id="root" tabIndex={-1}>
          {children}
        </div>
        <MotionEnhancements />
        {googleAnalyticsId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
              strategy="afterInteractive"
            />
            <Script id="figma-google-analytics" strategy="afterInteractive">
              {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', ${JSON.stringify(googleAnalyticsId)});
`}
            </Script>
          </>
        )}
        <BodyCustomCode html={customScripts?.bodyEnd} />
      </body>
    </html>
  )
}
