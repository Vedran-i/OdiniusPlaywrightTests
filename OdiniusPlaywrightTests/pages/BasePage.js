class BasePage {
  constructor(page) {
    this.page = page;
  }

  async open(path = '/') {
    await this.page.goto(path);
  }

  async expectLoaded() {
    await this.page.waitForLoadState('domcontentloaded');
  }
}

module.exports = { BasePage };