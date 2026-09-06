export class ProductDetailsPage {
  constructor(page) {
    this.page = page;
    this.productName = page.locator(".inventory_details_name");
    this.productPrice = page.locator(".inventory_details_price");
    this.productDescription = page.locator(
      ".inventory_details_desc.large_size",
    );
    this.shoppingCartBadge = page.locator(".shopping_cart_badge");
  }

  async addToCart() {
    await this.page.getByRole("button", { name: "Add to cart" }).click();
  }
  async backToProducts() {
    await this.page.getByRole("button", { name: "Back to products" }).click();
  }
  async getProductName(productName) {
    const product = this.productName.filter({ hasText: productName });
    return product;
  }
  async getProductPrice(productName) {
    const allPrices = this.productPrice.filter({ hasText: productName });
    return allPrices;
  }
}
