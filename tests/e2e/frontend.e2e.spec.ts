import { expect, test } from '@playwright/test'

const baseUrl = 'http://localhost:3000'

test.describe('Frontend', () => {
  test('redirects / to /en', async ({ page }) => {
    await page.goto(`${baseUrl}/`)

    await expect(page).toHaveURL(`${baseUrl}/en`)
  })

  test('renders the English editorial shell at /en', async ({ page }) => {
    await page.goto(`${baseUrl}/en`)

    await expect(page).toHaveURL(`${baseUrl}/en`)
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
    await expect(page.getByRole('link', { name: 'Books' })).toBeVisible()
    await expect(page.getByRole('banner')).toBeVisible()
    await expect(page.getByLabel('Language switcher')).toBeVisible()
    await expect(page.getByLabel('Shopping cart')).toBeVisible()
    await expect(page.locator('main')).toBeVisible()
    await expect(page.getByRole('contentinfo')).toBeVisible()
  })

  test('renders the French editorial shell at /fr', async ({ page }) => {
    await page.goto(`${baseUrl}/fr`)

    await expect(page).toHaveURL(`${baseUrl}/fr`)
    await expect(page.locator('html')).toHaveAttribute('lang', 'fr')
    await expect(page.getByRole('link', { name: 'Books' })).toBeVisible()
    await expect(page.getByLabel('Language switcher')).toBeVisible()
    await expect(page.getByLabel('Panier')).toBeVisible()
  })

  test('falls back invalid public locale paths to /en', async ({ page }) => {
    await page.goto(`${baseUrl}/de`)

    await expect(page).toHaveURL(`${baseUrl}/en`)
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  })

  test('keeps /admin at /admin', async ({ page }) => {
    await page.goto(`${baseUrl}/admin`)

    await expect(page).toHaveURL(`${baseUrl}/admin`)
  })

  test('renders the English bookstore catalog with URL filter state', async ({ page }) => {
    await page.goto(`${baseUrl}/en/books?search=atelier&format=ebook`)

    await expect(page).toHaveURL(`${baseUrl}/en/books?search=atelier&format=ebook`)
    await expect(page.getByRole('heading', { name: 'Book catalog' })).toBeVisible()
    await expect(page.getByRole('searchbox', { name: 'Search books' })).toHaveValue('atelier')
    await expect(page.getByRole('link', { name: 'E-book' })).toHaveAttribute('aria-current', 'true')
    await expect(page.getByText('No books match the current filters.')).toBeVisible()
  })

  test('renders the French bookstore catalog shell', async ({ page }) => {
    await page.goto(`${baseUrl}/fr/books`)

    await expect(page).toHaveURL(`${baseUrl}/fr/books`)
    await expect(page.locator('html')).toHaveAttribute('lang', 'fr')
    await expect(page.getByRole('heading', { name: 'Catalogue de livres' })).toBeVisible()
    await expect(page.getByRole('searchbox', { name: 'Rechercher des livres' })).toBeVisible()
    await expect(page.getByRole('navigation', { name: 'Formats' })).toBeVisible()
  })
})
