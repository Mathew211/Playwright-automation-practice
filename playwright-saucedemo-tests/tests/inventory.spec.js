import { test, expect, user, item } from "../fixtures/fixtures";
import { sortedProductsBy } from "../testData/data";

test.beforeEach(async ({ loginPage, page }) => {
  await loginPage.open();
  await loginPage.login(user.login, user.password);

  await expect(page.getByText("Products", { exact: true })).toBeVisible();
});

test.describe("Inventory", () => {
  test("Should add a product to the cart", async ({ page, inventoryPage }) => {
    await inventoryPage.addToCart(item[0]);

    await expect(inventoryPage.cartCounter).toHaveText("1");

    await inventoryPage.visitCartPage();

    await expect(page.getByText(item[0], { exact: true })).toBeVisible();
  });
});

test.describe("Cart", () => {
  test("Should display all added products", async ({
    inventoryPage,
    cartPage,
  }) => {
    await inventoryPage.addToCart(item[0]);
    await inventoryPage.addToCart(item[1]);

    await expect(inventoryPage.cartCounter).toHaveText("2");

    await inventoryPage.visitCartPage();

    const products = await cartPage.getProductNames();

    expect(products).toEqual(item);
    await expect(cartPage.productNames).toHaveCount(item.length);
  });
  test("Should remove a selected product", async ({
    page,
    inventoryPage,
    cartPage,
  }) => {
    await inventoryPage.addToCart(item[0]);
    await inventoryPage.addToCart(item[1]);

    await expect(inventoryPage.cartCounter).toHaveText("2");

    await inventoryPage.visitCartPage();

    await expect(page.getByText(item[0], { exact: true })).toBeVisible();
    await expect(page.getByText(item[1], { exact: true })).toBeVisible();

    await cartPage.removeFromCart(item[0]);

    await expect(page.getByText(item[0], { exact: true })).toBeHidden();
    await expect(page.getByText(item[1], { exact: true })).toBeVisible();

    await expect(inventoryPage.cartCounter).toHaveText("1");
  });
});

test.describe("Product sorting", () => {
  for (const sortData of sortedProductsBy) {
    test(`Sort products: ${sortData.sortName}`, async ({ inventoryPage }) => {
      await inventoryPage.sortProducts(sortData.sortName);

      const actualPrices = await inventoryPage.getPrices();
      const expectedPrices = [...actualPrices].sort(sortData.sortFunction);

      expect(actualPrices).toEqual(expectedPrices);
    });
  }
});

test.describe("Shopping flow", () => {
  test("Should add and remove products from the cart", async ({
    page,
    inventoryPage,
    cartPage,
  }) => {
    await test.step("Add products to cart", async () => {
      await inventoryPage.addToCart(item[0]);
      await inventoryPage.addToCart(item[1]);
    });
    await test.step("Verify cart", async () => {
      await inventoryPage.visitCartPage();
      const products = await cartPage.getProductNames();
      expect(products).toEqual(item);
      await expect(page.getByText(item[0], { exact: true })).toBeVisible();
      await expect(page.getByText(item[1], { exact: true })).toBeVisible();
    });
    await test.step("Remove product", async () => {
      await cartPage.removeFromCart(item[0]);
    });
    await test.step("Verify cart after removing the product", async () => {
      await expect(page.getByText(item[0], { exact: true })).toBeHidden();
      await expect(page.getByText(item[1], { exact: true })).toBeVisible();
      await expect(inventoryPage.cartCounter).toHaveText("1");
      await expect(cartPage.productNames).toHaveCount(item.length - 1);
    });
  });
});
