import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto(
        'http://host.docker.internal:6969/azure/authorize?client_id=tiltakspenger-vedtak&code_challenge=6TIOqdNAqpF-2XwU-13wpv3g_vhPFzVjCaM7LnZcVAc&code_challenge_method=S256&nonce=Nl2Kg_vRBoyfW_ezyCcq2J6vYxXn2yryN_D5pdBMXvg&redirect_uri=http%3A%2F%2Flocalhost%3A2222%2Foauth2%2Fcallback&response_mode=query&response_type=code&scope=openid&state=Cjh_NQqpys7ODzdDTCwWePzAR9i8Yct2wiMJ_L9gKtE'
    );
    await page.getByPlaceholder('Enter any user/subject').click();
    await page.getByPlaceholder('Enter any user/subject').fill('abc123');
    await page.getByRole('button', { name: 'Sign-in' }).click();
});

test('navigerer til startside', async ({ page }) => {
    await page.goto('http://localhost:2222');

    // Expect a title "to contain" a substring.
    const headerTitle = page.getByText('NAV Tiltakspenger');

    await expect(headerTitle).toBeUndefined;

    // // create a locator
    // const getStarted = page.getByRole('link', { name: 'Get started' });

    // // Expect an attribute "to be strictly equal" to the value.
    // await expect(getStarted).toHaveAttribute('href', '/docs/intro');

    // // Click the get started link.
    // await getStarted.click();

    // Expects the URL to contain intro.
});
