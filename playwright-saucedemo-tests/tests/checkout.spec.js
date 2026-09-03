import { test, expect, user, item } from "../fixtures/fixtures";
import { customer } from "../testData/data";

test.beforeEach(async ({ loginPage, page }) => {
  await loginPage.open();
  await loginPage.login(user.login, user.password);

  await expect(page.getByText("Products", { exact: true })).toBeVisible();
});

test.describe("User can complete an order", () => {
  test("should verify the order summary and complete the order", async ({
    inventoryPage,
    cartPage,
    checkoutPage,
    page,
  }) => {
    await test.step("Add product to the cart", async () => {
      await inventoryPage.addToCart(item[0]);
    });
    await test.step("Visit the cart", async () => {
      await inventoryPage.visitCartPage();
    });
    await test.step("Press the checkout", async () => {
      await checkoutPage.pressCheckoutButton();
    });
    await test.step("Fill the checkout form", async () => {
      await checkoutPage.fillCheckoutForm(customer);
    });
    await test.step("Press the continue button ", async () => {
      await checkoutPage.pressContinueButton();
    });
    await test.step("Check the summary", async () => {
      await expect(page).toHaveURL(
        "https://www.saucedemo.com/checkout-step-two.html",
      );
      await expect(cartPage.productNames).toHaveText(item[0]);
      await expect(checkoutPage.productPrice).toBeVisible();
    });
    await test.step("Press the finish button ", async () => {
      await checkoutPage.pressFinishButton();
      await expect(checkoutPage.orderFinisMessage).toHaveText(
        "Thank you for your order!",
      );
    });
  });
});
