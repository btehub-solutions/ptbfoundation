import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

const routes = ['/', '/projects', '/volunteer', '/gallery', '/about', '/donate']

for (const route of routes) {
  test(`${route}: page, links, metadata, images, accessibility`, async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    const response = await page.goto(route, { waitUntil: 'networkidle' })
    expect(response?.status()).toBe(200)
    expect(response?.headers()['x-content-type-options']).toBe('nosniff')
    expect(response?.headers()['referrer-policy']).toBe('strict-origin-when-cross-origin')
    await page.evaluate(() => document.fonts.ready)
    await expect(page.locator('main')).toHaveCount(1)
    await expect(page.locator('h1')).toHaveCount(1)
    await expect(page.locator('#main-content')).toHaveCount(1)
    await expect(page.locator('.footer-brand > a')).toHaveAttribute('href', '/#home')
    await expect(page.locator('.site-header a[href="/donate"]')).toHaveCount(1)
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href')
    expect(new URL(canonical!).pathname).toBe(route)
    const title = await page.title()
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', title)
    await page.evaluate(async () => {
      await Promise.all(
        [...document.images].map(async (image) => {
          image.loading = 'eager'
          await image.decode()
        }),
      )
    })
    expect(
      await page.evaluate(() =>
        [...document.images].every(
          (image) => image.naturalWidth > 0 && image.clientWidth > 0 && image.clientHeight > 0,
        ),
      ),
    ).toBe(true)
    const brokenHashes = await page.locator('a[href^="#"]').evaluateAll((links) =>
      links
        .filter((link) => {
          const hash = (link as HTMLAnchorElement).hash
          return hash.length > 1 && !document.getElementById(decodeURIComponent(hash.slice(1)))
        })
        .map((link) => link.getAttribute('href')),
    )
    expect(brokenHashes).toEqual([])
    const external = await page
      .locator('a[target="_blank"]')
      .evaluateAll((links) =>
        links.every((link) => (link.getAttribute('rel') || '').includes('noopener')),
      )
    expect(external).toBe(true)
    const audit = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze()
    expect(audit.violations).toEqual([])
    expect(errors).toEqual([])
  })
}

test('all six pages fit small phones, tablets, landscape, and desktop', async ({ page }) => {
  test.setTimeout(120000)
  for (const route of routes) {
    await page.goto(route)
    for (const viewport of [
      { width: 320, height: 568 },
      { width: 375, height: 667 },
      { width: 390, height: 844 },
      { width: 768, height: 1024 },
      { width: 844, height: 390 },
      { width: 950, height: 700 },
      { width: 951, height: 700 },
      { width: 1024, height: 768 },
      { width: 1280, height: 900 },
      { width: 1920, height: 1080 },
    ]) {
      await page.setViewportSize(viewport)
      await page.evaluate(async () => {
        await document.fonts.ready
        await new Promise<void>((resolve) =>
          requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
        )
      })
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
        `${route} at ${viewport.width}`,
      ).toBe(true)
      const controlsFit = await page
        .locator('.site-header a, .site-header button')
        .evaluateAll((controls) =>
          controls.every((control) => {
            const rect = control.getBoundingClientRect()
            return rect.width === 0 || (rect.left >= 0 && rect.right <= innerWidth)
          }),
        )
      expect(controlsFit, `${route} header controls at ${viewport.width}`).toBe(true)
    }
  }
})

test('mobile menu closes on Escape, outside click, and navigation', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  const nav = page.getByRole('navigation', { name: 'Main navigation' })
  await page.getByRole('button', { name: 'Open navigation' }).click()
  await expect(nav).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(nav).not.toBeVisible()
  await expect(page.getByRole('button', { name: 'Open navigation' })).toBeFocused()
  await page.getByRole('button', { name: 'Open navigation' }).click()
  await page.mouse.click(5, 500)
  await expect(nav).not.toBeVisible()
  await page.getByRole('button', { name: 'Open navigation' }).click()
  await nav.getByRole('link', { name: 'Gallery' }).click()
  await expect(page).toHaveURL(/\/gallery$/)
  await expect(nav).not.toBeVisible()
  const box = await page.getByRole('button', { name: 'Open navigation' }).boundingBox()
  expect(box!.width).toBeGreaterThanOrEqual(44)
  expect(box!.height).toBeGreaterThanOrEqual(44)
})

test('photo viewer closes with Escape and restores focus', async ({ page }) => {
  await page.goto('/gallery')
  const opener = page.getByRole('button', { name: 'Enlarge photo: Community support' })
  await opener.click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).not.toBeVisible()
  await expect(opener).toBeFocused()
})

test('donation page shows verified transfer details and contact paths', async ({ page }) => {
  await page.goto('/donate')
  await expect(page.getByText('0019856463')).toBeVisible()
  await expect(page.getByText('0019882992')).toBeVisible()
  await expect(page.getByText('Path To Blessings Charity Foundation').first()).toBeVisible()
  await expect(
    page.getByRole('button', { name: 'Copy Nigerian Naira account number' }),
  ).toBeVisible()
  await expect(
    page.getByRole('button', { name: 'Copy British Pounds account number' }),
  ).toBeVisible()
  await expect(page.getByRole('link', { name: 'Follow up on WhatsApp' })).toHaveAttribute(
    'href',
    /^https:\/\/wa\.me\/2348086854143\?text=/,
  )
  await expect(page.getByRole('link', { name: 'Email the foundation' })).toHaveAttribute(
    'href',
    'mailto:pathtoblessingsfoundation@gmail.com?subject=Donation%20enquiry',
  )
  await expect(page.getByRole('link', { name: '0915 383 9229' })).toHaveAttribute(
    'href',
    'tel:+2349153839229',
  )
  await expect(page.getByRole('button', { name: /secure payment/i })).toHaveCount(0)
})

test('unconfigured forms are visibly unavailable before personal data is entered', async ({
  page,
}) => {
  await page.goto('/volunteer')
  const submit = page.getByRole('button', { name: 'Submit', exact: true })
  if (await submit.isDisabled()) {
    await expect(page.locator('#volunteer-form-status')).toContainText('temporarily unavailable')
    await expect(page.getByLabel('Full name', { exact: true })).toBeDisabled()
  }
  const newsletter = page.getByRole('button', { name: 'Subscribe to newsletter' })
  if (await newsletter.isDisabled()) {
    await expect(page.locator('#newsletter-status')).toContainText('unavailable')
  }
  const fonts = await page
    .locator('input,textarea,select')
    .evaluateAll((inputs) =>
      inputs
        .filter(
          (input) =>
            !(input as HTMLInputElement).disabled && (input as HTMLInputElement).name !== '_gotcha',
        )
        .map((input) => Number.parseFloat(getComputedStyle(input).fontSize)),
    )
  expect(fonts.every((size) => size >= 16)).toBe(true)
})

test('404 provides a real recovery path', async ({ page }) => {
  const response = await page.goto('/this-page-does-not-exist')
  expect(response?.status()).toBe(404)
  await expect(page.getByRole('heading', { name: 'Page not found.' })).toBeVisible()
  await page.getByRole('link', { name: 'Back to home' }).click()
  await expect(page).toHaveURL(/\/$/)
})

test('robots, sitemap and branded share assets are served', async ({ request }) => {
  for (const path of [
    '/robots.txt',
    '/sitemap.xml',
    '/favicon.png',
    '/apple-touch-icon.png',
    '/social-preview.png',
  ]) {
    const response = await request.get(path)
    expect(response.status(), path).toBe(200)
  }
  const sitemap = await request.get('/sitemap.xml')
  const body = await sitemap.text()
  for (const route of routes.slice(1)) expect(body).toContain(`${route}</loc>`)
})
