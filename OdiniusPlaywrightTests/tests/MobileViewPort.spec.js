
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

});

