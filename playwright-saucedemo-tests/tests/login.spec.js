import { test, expect } from "../fixtures/fixtures";
import { data, user } from "../testData/data.js";

test.use({
  storageState: {
    cookies: [],
    origins: [],
  },
});

test.beforeEach(async ({ loginPage }) => {
  await loginPage.open();
});

test.describe("Login", () => {
  test("Should log in with valid credentials", async ({ page, loginPage }) => {
    await loginPage.login(user.login, user.password);

    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

    await expect(page).toHaveTitle(/Swag Labs/);

    await expect(page.getByText("Products", { exact: true })).toBeVisible();

    await loginPage.logout();

    await expect(page).toHaveURL("https://www.saucedemo.com/");
  });
});

test.describe("Login validation", () => {
  for (const testData of data) {
    test(`${testData.caseTitle} : ${testData.caseName}`, async ({
      loginPage,
    }) => {
      await loginPage.login(testData.login, testData.password);

      await expect(loginPage.errorMessage).toHaveText(testData.expectedError);
    });
  }
});
