# Playwright Automation Practice

A collection of test automation projects and practical exercises created while developing my skills in **JavaScript** and **Playwright**.

The repository contains different testing scenarios and applications. Each project is organized separately and focuses on practicing test automation concepts, code organization, and maintainable test design.

## 🛠 Tech Stack

- JavaScript
- Playwright
- Node.js
- npm

## 📚 What I Practice

- End-to-End (E2E) testing
- Page Object Model (POM)
- Custom Playwright fixtures
- Playwright locators
- Web-first assertions
- Data-driven and parameterized testing
- Positive and negative test scenarios
- Test organization with `test.describe()`
- Test steps with `test.step()`
- Form and checkout validation
- URL validation
- Working with dropdowns
- Dynamic data validation
- JavaScript arrays, objects, spread syntax, and callbacks

## 📂 Projects

### 01 — SauceDemo

Automated tests for the SauceDemo e-commerce demo application.

Current test coverage includes:

- Valid user login
- Invalid login scenarios
- Adding products to the cart
- Removing products from the cart
- Cart content validation
- Product price sorting
- Product details validation
- Product name, price, and description verification
- Adding a product to the cart from the product details page
- Complete checkout flow
- Order summary validation
- Successful order completion
- Checkout form validation
- Parameterized checkout validation
- User shopping flow

The project uses:

- Page Object Model (POM)
- Custom Playwright fixtures
- Test data separated from test logic
- Playwright locators and web-first assertions
- Data-driven and parameterized tests
- `test.describe()` for test organization
- `test.step()` for organizing larger test scenarios
- Positive and negative test scenarios

More scenarios will be added as the project develops.

## 📁 Repository Structure

```text
playwright-automation-practice/
├── tests/
├── pages/
│   ├── LoginPage.js
│   ├── InventoryPage.js
│   ├── CartPage.js
│   ├── CheckoutPage.js
│   └── ProductDetailsPage.js
├── fixtures/
├── testData/
├── playwright.config.js
└── package.json
```

Each application or testing area can be maintained as a separate project inside the repository.

## ▶️ Running the Tests

### 1. Clone the repository

```bash
git clone https://github.com/Mathew211/Playwright-automation-practice.git
```

### 2. Open the selected project

For example:

```bash
cd playwright-automation-practice/saucedemo
```

### 3. Install dependencies

```bash
npm install
```

### 4. Install Playwright browsers

```bash
npx playwright install
```

### 5. Run all tests

```bash
npx playwright test
```

### Run tests in headed mode

```bash
npx playwright test --headed
```

### Run tests using Playwright UI Mode

```bash
npx playwright test --ui
```

### Open the HTML report

```bash
npx playwright show-report
```

## 🎯 Purpose

The main purpose of this repository is to document and demonstrate my progress in test automation using JavaScript and Playwright.

The projects are gradually expanded with new scenarios and automation concepts as I continue developing my QA automation skills.

## 📖 Documentation

The tests are developed primarily using the
[official Playwright documentation](https://playwright.dev/docs/writing-tests).
