
import { test, expect, devices } from '@playwright/test';

test.describe('Playwright Viewport Scenario', () => {

    test('Test Case 01 - iPhone 17 Pro Max', async ({ page }) => {
        const iPhone17 = devices['iPhone 17 Pro Max'];

        await page.setViewportSize(iPhone17.viewport);

        await page.goto('https://odinius.nl/');

        // Verify that the homepage loads
        await expect(page).toHaveTitle(/ODINIUS/i);

        // Verify that the main section is visible
        await expect(
            page.getByRole('heading', { name: 'De Band', exact: true })
        ).toBeVisible();

        // Verify the viewport dimensions
        expect(page.viewportSize()).toEqual(iPhone17.viewport);
    });


    test('Test Case 02 - Samsung Galaxy S20', async ({ browser }) => {

        // Define a custom Samsung Galaxy S20 configuration
        const samsungS20 = {
            viewport: { width: 360, height: 800 },
            deviceScaleFactor: 3,
            isMobile: true,
            hasTouch: true,
            userAgent:
                'Mozilla/5.0 (Linux; Android 10; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36'
        };

        // Create a browser context using the device settings
        const context = await browser.newContext(samsungS20);
        const page = await context.newPage();

        await page.goto('https://odinius.nl/');

        // Verify the homepage loads
        await expect(page).toHaveTitle(/ODINIUS/i);

        // Verify the main section is visible
        await expect(
            page.getByRole('heading', { name: 'De Band', exact: true })
        ).toBeVisible();

        // Verify viewport dimensions
        expect(page.viewportSize()).toEqual({
            width: 360,
            height: 800
        });

        await context.close();
    });

});




