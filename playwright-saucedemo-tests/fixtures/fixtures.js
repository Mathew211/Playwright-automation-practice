import { test as base, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { ProductDetailsPage } from "../pages/ProductDetailsPage";
/**
 * @typedef {Object} MyFixtures
 * @property {LoginPage} loginPage
 * @property {InventoryPage} inventoryPage
 * @property {CartPage} cartPage
 * @property {CheckoutPage} checkoutPage
 * @property {ProductDetailsPage} productDetailsPage
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
  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },
  productDetailsPage: async ({ page }, use) => {
    const productDetailsPage = new ProductDetailsPage(page);
    await use(productDetailsPage);
  },
});

export const item = [
  {
    name: "Sauce Labs Backpack",
    price: "$29.99",
    description:
      "carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.",
  },
  {
    name: "Sauce Labs Bike Light",
    price: "$9.99",
    description: "A red light for your bike.",
  },
  {
    name: "Sauce Labs Bolt T-Shirt",
    price: "$15.99",
    description: "Get your testing engine running with this sleek t-shirt.",
  },
  {
    name: "Sauce Labs Fleece Jacket",
    price: "$49.99",
    description: "It's not just a jacket, it's a fleece.",
  },
  {
    name: "Sauce Labs Onesie",
    price: "$7.99",
    description: "A cute onesie for your baby.",
  },
  {
    name: "Test.allTheThings() T-Shirt (Red)",
    price: "$15.99",
    description:
      "This classic Sauce Labs t-shirt is perfect to wear when cozying up to your favorite testing framework.",
  },
];
export { expect };
