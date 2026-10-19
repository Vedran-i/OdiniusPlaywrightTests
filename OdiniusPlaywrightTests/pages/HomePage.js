const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');

class HomePage extends BasePage {
  constructor(page) {
    super(page);

    // Navigation labels observed on the live homepage.
    this.navLinks = [
      'Over Ons',
      'De Band',
      'Setlist',
      'Shows',
      'Muziek',
      'Reviews',
      "Foto's",
      "Video's",
      'Contact'
    ];

    // These are the main content headings visible on the page.
    this.headings = {
      band: 'De Band',
      setlist: 'Setlist',
      shows: 'Optredens',
      music: 'Muziek',
      reviews: 'Reviews',
      photos: "Foto's",
      videos: "Video's",
      contact: 'Boek Ons!'
    };
  }

  async goto() {
    await this.open('/');
    await this.expectLoaded();
  }

  async expectHomepageVisible() {
    await expect(this.page).toHaveTitle(/ODINIUS/i);
    await expect(this.page.getByRole('link', { name: 'Over Ons', exact: true }).first()).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'De Band', exact: true })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Setlist', exact: true })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: /^Optredens(?: \d{4})?$/ })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Muziek', exact: true })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Reviews', exact: true })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Boek Ons!', exact: true })).toBeVisible();
  }

  getNavigationLink(name) {
    return this.page.getByRole('link', { name, exact: true }).first();
  }

  async clickNavigationLink(name) {
    await this.getNavigationLink(name).click();
  }

  async expectSectionNavigation(name) {
    // This site is a one-page layout, so navigation generally uses in-page anchors.
    const link = this.getNavigationLink(name);
    await expect(link).toBeVisible();
    const href = await link.getAttribute('href');
    expect(href, `Expected "${name}" to have a navigation target`).toBeTruthy();

    if (href && href.startsWith('#')) {
      await expect(this.page.locator(href)).toHaveCount(1);
    }
  }

  async expectBookingEmailVisible() {
    await expect(this.page.getByText('info@odinius.nl', { exact: true })).toBeVisible();
  }
}

module.exports = { HomePage };