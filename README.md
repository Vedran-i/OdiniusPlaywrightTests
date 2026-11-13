# Odinius Playwright POM tests

End-to-end tests for https://odinius.nl/, built with Playwright and JavaScript using the Page Object Model (POM). GitHub Actions runs the suite on pushes and pull requests to `main`, and on a daily schedule.

## Requirements

- Node.js (current LTS recommended)
- Visual Studio Code

## Setup in VS Code

Open this project folder in VS Code, then open **Terminal → New Terminal** and run:

```bash
npm install
npx playwright install
```

## Run the tests

```bash
npm test
```

Run with a visible browser:

```bash
npm run test:headed
```

Open Playwright's HTML report after a run:

```bash
npm run test:report
```

## Project structure

- `pages/BasePage.js`: shared page functionality
- `pages/HomePage.js`: locators and actions for the Odinius homepage
- `tests/homepage.spec.js`: homepage smoke tests
- `tests/navigation.spec.js`: navigation checks
- `playwright.config.js`: browser and reporting configuration
- `.github/workflows/playwright.yml`: GitHub Actions workflow

## Test coverage

The suite checks homepage loading and content, navigation and links, external YouTube links, and responsive mobile layouts. The tests do not submit forms or click external booking or social links.

## Important notes

The live site is a single-page band website. The navigation checks verify that the menu links are visible and have targets. For in-page links, they also verify that the referenced anchor exists. This does not yet prove every link scrolls correctly or that every external destination is healthy.

Before relying on this in CI, run the suite locally and adjust selectors if the website changes. Prefer accessible locators such as `getByRole` and `getByText`; avoid brittle CSS classes where possible.
