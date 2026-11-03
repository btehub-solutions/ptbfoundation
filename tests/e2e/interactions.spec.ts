import { expect, test } from '@playwright/test'

test('scroll enhancement respects touch and changing reduced-motion preferences', async ({
  page,
}, testInfo) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/')
  if (testInfo.project.name === 'desktop') {
    await expect(page.locator('html')).toHaveClass(/lenis/)
  } else {
    await expect(page.locator('html')).not.toHaveClass(/lenis/)
  }
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(page.locator('html')).not.toHaveClass(/lenis/)
  expect(await page.locator('html').evaluate((el) => getComputedStyle(el).scrollBehavior)).toBe(
    'auto',
  )
  await page.locator('#faqs').scrollIntoViewIfNeeded()
  const question = page.locator('.faq-item summary').first()
  await question.focus()
  await page.keyboard.press('Enter')
  await expect(page.locator('.faq-item').first()).toHaveAttribute('open', '')
  await expect(page.getByRole('button', { name: 'Back to top' })).toBeVisible()
  await page.getByRole('button', { name: 'Back to top' }).click()
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(0)
  await expect(page.locator('#main-content')).toBeFocused()
})

test('gallery supports buttons, keyboard, and touch swipes while retaining modal focus', async ({
  page,
}, testInfo) => {
  await page.goto('/gallery')
  const opener = page.getByRole('button', { name: 'Enlarge photo: Community support' })
  await opener.click()
  const dialog = page.getByRole('dialog')
  await expect(dialog).toBeVisible()
  await page.getByRole('button', { name: 'Next photo' }).click()
  await expect(dialog.getByRole('heading')).toHaveText('Learning together')
  await page.keyboard.press('ArrowRight')
  await expect(dialog.getByRole('heading')).toHaveText('Sharing essential supplies')
  await page.getByRole('button', { name: 'Previous photo' }).click()
  await expect(dialog.getByRole('heading')).toHaveText('Learning together')
  if (testInfo.project.name === 'mobile') {
    const photo = dialog.locator('.gallery-enlarged-photo')
    await photo.dispatchEvent('pointerdown', { pointerType: 'touch', clientX: 250 })
    await photo.dispatchEvent('pointerup', { pointerType: 'touch', clientX: 100 })
    await expect(dialog.getByRole('heading')).toHaveText('Sharing essential supplies')
  }
  await page.keyboard.press('Escape')
  await expect(dialog).not.toBeVisible()
  await expect(opener).toBeFocused()
  if (testInfo.project.name === 'desktop') {
    await expect(page.locator('html')).not.toHaveClass(/lenis-stopped/)
  }
})
