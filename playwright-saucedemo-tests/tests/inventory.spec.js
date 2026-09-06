import { test, expect, item } from "../fixtures/fixtures";
import { sortedProductsBy } from "../testData/data";

test.beforeEach(async ({ page }) => {
  await page.goto("/inventory.html");

  await expect(page.getByText("Products", { exact: true })).toBeVisible();
});

test.describe("Inventory", () => {
  test("Should add a product to the cart", async ({ page, inventoryPage }) => {
    await inventoryPage.addToCart(item[0].name);

    await expect(inventoryPage.cartCounter).toHaveText("1");

    await inventoryPage.visitCartPage();

    await expect(page.getByText(item[0].name, { exact: true })).toBeVisible();
  });
});

test.describe("Cart", () => {
  test("Should display all added products", async ({
    inventoryPage,
    cartPage,
  }) => {
    await inventoryPage.addToCart(item[0].name);
    await inventoryPage.addToCart(item[1].name);

    await expect(inventoryPage.cartCounter).toHaveText("2");

    await inventoryPage.visitCartPage();

    const products = await cartPage.getProductNames();

    expect(products).toEqual([item[0].name, item[1].name]);
    await expect(cartPage.productNames).toHaveCount(item.length - 4);
  });
  test("Should remove a selected product", async ({
    page,
    inventoryPage,
    cartPage,
  }) => {
    await inventoryPage.addToCart(item[0].name);
    await inventoryPage.addToCart(item[1].name);

    await expect(inventoryPage.cartCounter).toHaveText("2");

    await inventoryPage.visitCartPage();

    await expect(page.getByText(item[0].name, { exact: true })).toBeVisible();
    await expect(page.getByText(item[1].name, { exact: true })).toBeVisible();

    await cartPage.removeFromCart(item[0].name);

    await expect(page.getByText(item[0].name, { exact: true })).toBeHidden();
    await expect(page.getByText(item[1].name, { exact: true })).toBeVisible();

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
      await inventoryPage.addToCart(item[0].name);
      await inventoryPage.addToCart(item[1].name);
    });
    await test.step("Verify cart", async () => {
      await inventoryPage.visitCartPage();
      const products = await cartPage.getProductNames();
      expect(products).toEqual([item[0].name, item[1].name]);
      await expect(page.getByText(item[0].name, { exact: true })).toBeVisible();
      await expect(page.getByText(item[1].name, { exact: true })).toBeVisible();
    });
    await test.step("Remove product", async () => {
      await cartPage.removeFromCart(item[0].name);
    });
    await test.step("Verify cart after removing the product", async () => {
      await expect(page.getByText(item[0].name, { exact: true })).toBeHidden();
      await expect(page.getByText(item[1].name, { exact: true })).toBeVisible();
      await expect(inventoryPage.cartCounter).toHaveText("1");
      await expect(cartPage.productNames).toHaveCount(item.length - 5);
    });
  });
});
