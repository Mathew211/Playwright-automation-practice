import { test, expect, item } from "../fixtures/fixtures";

test.beforeEach(async ({ page }) => {
  await page.goto("/inventory.html");

  await expect(page.getByText("Products", { exact: true })).toBeVisible();
});

test.describe("Product Details Page", () => {
  test("Should display correct product details", async ({
    productDetailsPage,
    inventoryPage,
    page,
  }) => {
    await test.step("Open product details page", async () => {
      await inventoryPage.openProduct(item[0].name);
      await expect(page).toHaveURL("/inventory-item.html?id=4");
    });
    await test.step("Verify product details", async () => {
      await expect(productDetailsPage.productName).toHaveText(item[0].name);
      await expect(productDetailsPage.productPrice).toContainText(
        item[0].price,
      );
      await expect(productDetailsPage.productDescription).toHaveText(
        item[0].description,
      );
    });
    await test.step("Add product to cart", async () => {
      await productDetailsPage.addToCart();
    });
    await test.step("Verify shopping cart badge", async () => {
      await expect(productDetailsPage.shoppingCartBadge).toHaveText("1");
    });
  });
  test("Should return to inventory from product details", async ({
    productDetailsPage,
    inventoryPage,
    page,
  }) => {
    await test.step("Open product details page", async () => {
      await inventoryPage.openProduct(item[0].name);
      await expect(page).toHaveURL("/inventory-item.html?id=4");
    });
    await test.step("Go back to inventory", async () => {
      await productDetailsPage.backToProducts();
    });
    await test.step("Verify return to inventory", async () => {
      await expect(page).toHaveURL("/inventory.html");
      await expect(inventoryPage.inventoryTitle).toHaveText("Products");
      await expect(page.getByText(item[0].name, { exact: true })).toBeVisible();
    });
  });
});
