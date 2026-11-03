import { getFormspreeEndpoint } from './public-site-config'

const fieldLimits: Record<string, number> = {
  name: 120,
  email: 254,
  phone: 30,
  location: 160,
  message: 2000,
  _gotcha: 200,
}

/** Formspree owns storage and server-side validation. Only public form fields leave this UI. */
export async function sendFormspree(
  endpoint: string,
  fields: Readonly<Record<string, string>>,
  signal: AbortSignal,
): Promise<void> {
  const destination = getFormspreeEndpoint(endpoint)
  if (!destination) throw new Error('Invalid form destination')
  const body = new FormData()
  for (const [name, limit] of Object.entries(fieldLimits)) {
    if (!Object.hasOwn(fields, name)) continue
    const value = fields[name].trim()
    if (value.length > limit) throw new Error('Field length exceeded')
    body.set(name, value)
  }
  const response = await fetch(destination, {
    method: 'POST',
    body,
    headers: { Accept: 'application/json' },
    signal,
    credentials: 'omit',
    referrerPolicy: 'strict-origin-when-cross-origin',
  })
  if (!response.ok) throw new Error('Submission rejected')
}
