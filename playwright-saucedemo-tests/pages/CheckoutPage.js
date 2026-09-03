export class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.checkoutUrl = "https://www.saucedemo.com/checkout-step-two.html";
    this.orderFinisMessage = page.locator(".complete-header");
    this.productPrice = page.locator(".inventory_item_price");
    this.customerErrorMessage = page.locator(".error-message-container");
  }

  async pressCheckoutButton() {
    await this.page.getByRole("button", { name: "Checkout" }).click();
  }
  async fillCheckoutForm(customer) {
    await this.page
      .getByRole("textbox", { name: "First Name" })
      .fill(customer.name);
    await this.page
      .getByRole("textbox", { name: "Last Name" })
      .fill(customer.surname);
    await this.page
      .getByRole("textbox", { name: "Zip/Postal Code" })
      .fill(customer.postalCode);
  }
  async pressContinueButton() {
    await this.page.getByRole("button", { name: "Continue" }).click();
  }
  async pressFinishButton() {
    await this.page.getByRole("button", { name: "Finish" }).click();
  }
}
