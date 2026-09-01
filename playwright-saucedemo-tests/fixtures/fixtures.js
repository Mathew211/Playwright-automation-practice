import { test as base, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";

/**
 * @typedef {Object} MyFixtures
 * @property {LoginPage} loginPage
 * @property {InventoryPage} inventoryPage
 * @property {CartPage} cartPage
 */

/** @type {import('@playwright/test').TestType<MyFixtures, {}>} */
export const test = base.extend({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  inventoryPage: async ({ page }, use) => {
    const inventoryPage = new InventoryPage(page);
    await use(inventoryPage);
  },

  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },
});
export const user = {
  login: "standard_user",
  password: "secret_sauce",
  wrongPassword: "wrong_password",
};
export const item = ["Sauce Labs Backpack", "Sauce Labs Bike Light"];
export { expect };
