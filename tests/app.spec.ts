import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:2222');
    await page.getByPlaceholder('Enter any user/subject').click();
    await page.getByPlaceholder('Enter any user/subject').fill('abc123');
    await page.getByRole('button', { name: 'Sign-in' }).click();
});

test('navigerer til startside', async ({ page }) => {
    await page.goto('http://localhost:2222');

    await expect(page.getByText('NAV Tiltakspenger')).toBeVisible();
});
