
const { test, expect, devices } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');

test.describe('Playwright Viewport Scenario', () => {

    test('Test Case 01 - iPhone 17 Pro Max', async ({ browser }) => {

        // Get the iPhone device settings
        const iPhone17 = devices['iPhone 17 Pro Max'];

        // Create a browser context using those settings
        const context = await browser.newContext(iPhone17);
        const page = await context.newPage();

        // Create the Page Object and open the homepage
        const homePage = new HomePage(page);
        await homePage.goto();

        // Verify that the homepage loads
        await expect(page).toHaveTitle(/ODINIUS/i);

        // Verify that the main section is visible
        await expect(
            page.getByRole('heading', {
                name: 'De Band',
                exact: true
            })
        ).toBeVisible();

        // Verify the viewport dimensions
        expect(page.viewportSize()).toEqual(iPhone17.viewport);

        await context.close();
    });


    test('Test Case 02 - Samsung Galaxy S20', async ({ browser }) => {

        // Define custom Samsung Galaxy S20 settings
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

        // Create the Page Object and open the homepage
        const homePage = new HomePage(page);
        await homePage.goto();

        // Verify that the homepage loads
        await expect(page).toHaveTitle(/ODINIUS/i);

        // Verify that the main section is visible
        await expect(
            page.getByRole('heading', {
                name: 'De Band',
                exact: true
            })
        ).toBeVisible();

        // Verify the viewport dimensions
        expect(page.viewportSize()).toEqual({
            width: 360,
            height: 800
        });

        await context.close();
    });

});



