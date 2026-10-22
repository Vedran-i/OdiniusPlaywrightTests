const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');

test('video 1 embeds the correct YouTube video', async ({ page }) => {
  const home = new HomePage(page);
  await home.goto();
  await home.expectHomepageVisible();

  const iframe = page.locator('iframe[title="Odinius video 1"]');
  await iframe.scrollIntoViewIfNeeded(); // in case the site sets src lazily on scroll
  await expect(iframe).toHaveAttribute('src', /youtube(-nocookie)?\.com\/embed\/bpsk7DrC39k/);
});