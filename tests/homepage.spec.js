const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');

test.describe('Odinius homepage', () => {
  let homePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test('loads the homepage and displays the main sections', async () => {
    await homePage.expectHomepageVisible();
  });

  test('shows the booking contact email', async () => {
    await homePage.expectBookingEmailVisible();
  });

  test('has a meaningful document title', async ({ page }) => {
    await expect(page).toHaveTitle(/ODINIUS/i);
  });
});