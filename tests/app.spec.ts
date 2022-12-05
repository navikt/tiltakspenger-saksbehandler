import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:2222');
    await page.locator('[placeholder="Enter any user/subject"]').fill('abc123');
    await page.getByText('Sign-in').click();
});

test('navigerer til startside', async ({ page }) => {
    await page.goto('http://localhost:2222');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Playwright/);

    // create a locator
    const getStarted = page.getByRole('link', { name: 'Get started' });

    // Expect an attribute "to be strictly equal" to the value.
    await expect(getStarted).toHaveAttribute('href', '/docs/intro');

    // Click the get started link.
    await getStarted.click();

    // Expects the URL to contain intro.
    await expect(page).toHaveURL(/.*intro/);
});
