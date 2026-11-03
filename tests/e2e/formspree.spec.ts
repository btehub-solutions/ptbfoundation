import { expect, test } from '@playwright/test'
import { sendFormspree } from '../../src/lib/formspree'
import { getFormspreeEndpoint } from '../../src/lib/public-site-config'

test('form destination is limited to HTTPS Formspree form IDs', () => {
  expect(getFormspreeEndpoint('https://formspree.io/f/example')).toBe(
    'https://formspree.io/f/example',
  )
  for (const endpoint of [
    '',
    'http://formspree.io/f/example',
    'https://evil.example/f/example',
    'https://formspree.io/f/example?x=1',
    'https://user:pass@formspree.io/f/example',
    'javascript:alert(1)',
  ]) {
    expect(getFormspreeEndpoint(endpoint)).toBeNull()
  }
})

test('only allowlisted public fields are submitted, without browser credentials', async () => {
  const original = globalThis.fetch
  const received: Array<{
    url: string
    data: FormData
    credentials: RequestCredentials | undefined
  }> = []
  globalThis.fetch = async (url, options) => {
    received.push({
      url: String(url),
      data: options!.body as FormData,
      credentials: options!.credentials,
    })
    return new Response('{}', { status: 200 })
  }
  try {
    await sendFormspree(
      'https://formspree.io/f/example',
      { email: ' test@example.com ', message: 'Hello', unapproved: 'must not be sent' },
      new AbortController().signal,
    )
    expect(received).toHaveLength(1)
    expect(received[0].data.get('email')).toBe('test@example.com')
    expect(received[0].data.get('unapproved')).toBeNull()
    expect(received[0].credentials).toBe('omit')
  } finally {
    globalThis.fetch = original
  }
})

test('rejected submissions are failures, not false success', async () => {
  const original = globalThis.fetch
  globalThis.fetch = async () => new Response('{}', { status: 422 })
  try {
    await expect(
      sendFormspree(
        'https://formspree.io/f/example',
        { email: 'test@example.com' },
        new AbortController().signal,
      ),
    ).rejects.toThrow('Submission rejected')
  } finally {
    globalThis.fetch = original
  }
})
