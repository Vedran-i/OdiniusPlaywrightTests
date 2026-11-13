const { test } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');

test.describe('Odinius homepage navigation', () => {
  let homePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  for (const label of ['Over Ons', 'De Band', 'Setlist', 'Shows', 'Muziek', 'Reviews', "Foto's", "Video's", 'Contact']) {
    test(`navigation link "${label}" is visible and has a target`, async () => {
      await homePage.expectSectionNavigation(label);
    });
  }
});