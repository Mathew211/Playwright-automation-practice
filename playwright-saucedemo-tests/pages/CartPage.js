export class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItems = page.locator(".cart_item_label");
    this.productNames = page.locator(".inventory_item_name");
  }
  async removeFromCart(productName) {
    const cartItem = this.cartItems.filter({ hasText: productName });
    await cartItem.getByRole("button", { name: "Remove" }).click();
  }
  async getProductNames() {
    const products = await this.productNames.allTextContents();
    return products;
  }
}
