import { expect, test } from '@playwright/test'

const baseUrl = 'http://localhost:3000'

test.describe('Frontend', () => {
  test('redirects / to /en', async ({ page }) => {
    await page.goto(`${baseUrl}/`)

    await expect(page).toHaveURL(`${baseUrl}/en`)
  })

  test('renders the English foundation UI at /en', async ({ page }) => {
    await page.goto(`${baseUrl}/en`)

    await expect(page).toHaveURL(`${baseUrl}/en`)
    await expect(page.getByRole('heading', { name: 'English foundation UI' })).toBeVisible()
  })

  test('renders the French foundation UI at /fr', async ({ page }) => {
    await page.goto(`${baseUrl}/fr`)

    await expect(page).toHaveURL(`${baseUrl}/fr`)
    await expect(page.getByRole('heading', { name: 'French foundation UI' })).toBeVisible()
  })

  test('falls back invalid public locale paths to /en', async ({ page }) => {
    await page.goto(`${baseUrl}/de`)

    await expect(page).toHaveURL(`${baseUrl}/en`)
    await expect(page.getByRole('heading', { name: 'English foundation UI' })).toBeVisible()
  })

  test('keeps /admin at /admin', async ({ page }) => {
    await page.goto(`${baseUrl}/admin`)

    await expect(page).toHaveURL(`${baseUrl}/admin`)
  })
})
