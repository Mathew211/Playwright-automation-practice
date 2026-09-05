import { test as setup, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { user } from "../testData/data.js";
import path from "path";

const authFile = path.join(__dirname, "../.auth/user.json");

setup("Authenticate standard user", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login(user.login, user.password);
  await expect(page.getByText("Products", { exact: true })).toBeVisible();

  await page.context().storageState({ path: authFile });
});
