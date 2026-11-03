/**
 * Public launch configuration only. Never put API keys or secrets here.
 * Formspree endpoints are public form destinations, not private credentials.
 */
export const publicSiteConfig = {
  siteURL: '',
  contactEmail: 'pathtoblessingsfoundation@gmail.com',
  clarificationPhone: '+2349153839229',
  clarificationPhoneDisplay: '0915 383 9229',
  volunteerFormspreeEndpoint: '',
  newsletterFormspreeEndpoint: '',
  instagramURL: '',
  facebookURL: '',
  whatsappURL: 'https://wa.me/2348086854143',
  whatsappDisplay: '0808 685 4143',
  tiktokURL: 'https://www.tiktok.com/@pathtoblessings1',
  donationAccounts: [
    { currency: 'Nigerian Naira', code: 'NGN', accountNumber: '0019856463' },
    { currency: 'British Pounds', code: 'GBP', accountNumber: '0019882992' },
  ],
  donationBankName: 'Jaiz Bank',
  donationAccountName: 'Path To Blessings Charity Foundation',
}

export function getFormspreeEndpoint(value: string): string | null {
  try {
    const url = new URL(value)
    if (
      url.protocol !== 'https:' ||
      url.hostname !== 'formspree.io' ||
      !/^\/f\/[a-zA-Z0-9]+\/?$/.test(url.pathname) ||
      url.username ||
      url.password ||
      url.search ||
      url.hash
    )
      return null
    return url.href
  } catch {
    return null
  }
}

export function getContactEmail(): string | null {
  const email = publicSiteConfig.contactEmail.trim()
  return /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email) ? email : null
}

function profileURL(value: string, hosts: string[]): string | null {
  try {
    const url = new URL(value)
    return url.protocol === 'https:' &&
      hosts.includes(url.hostname) &&
      !url.username &&
      !url.password
      ? url.href
      : null
  } catch {
    return null
  }
}

export function getSocialLinks() {
  return [
    {
      name: 'Instagram',
      image: 'instagram',
      href: profileURL(publicSiteConfig.instagramURL, ['instagram.com', 'www.instagram.com']),
    },
    {
      name: 'Facebook',
      image: 'facebook',
      href: profileURL(publicSiteConfig.facebookURL, ['facebook.com', 'www.facebook.com']),
    },
    {
      name: 'WhatsApp',
      image: 'whatsapp',
      href: profileURL(publicSiteConfig.whatsappURL, ['wa.me', 'api.whatsapp.com']),
    },
    {
      name: 'TikTok',
      image: 'tiktok',
      href: profileURL(publicSiteConfig.tiktokURL, ['tiktok.com', 'www.tiktok.com']),
    },
  ].filter((link): link is typeof link & { href: string } => Boolean(link.href))
}

export function getDonationWhatsAppURL(): string | null {
  const href = profileURL(publicSiteConfig.whatsappURL, ['wa.me', 'api.whatsapp.com'])
  if (!href) return null
  const url = new URL(href)
  url.searchParams.set(
    'text',
    'Hello Path To Blessings Charity Foundation. I would like to follow up on a bank transfer donation.',
  )
  return url.href
}
