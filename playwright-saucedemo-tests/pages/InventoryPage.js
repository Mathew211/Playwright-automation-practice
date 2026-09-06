export class InventoryPage {
  constructor(page) {
    this.page = page;
    this.item = page.locator(".inventory_item");
    this.inventoryTitle = page.locator(".title");
    this.cartCounter = page.locator(".shopping_cart_badge");
    this.cartIcon = page.locator(".shopping_cart_container");
    this.sortDropdown = page.locator(".product_sort_container");
    this.productPrices = page.locator(".inventory_item_price");
    this.productNames = page.locator(".inventory_item_name");
  }
  async addToCart(productName) {
    const inventoryItem = this.item.filter({ hasText: productName });
    await inventoryItem.getByRole("button", { name: "Add to cart" }).click();
  }
  async visitCartPage() {
    await this.cartIcon.click();
  }
  async sortProducts(sortName) {
    await this.sortDropdown.selectOption({ label: sortName });
  }
  async getPrices() {
    const allPrices = await this.productPrices.allTextContents();
    const actualPrices = allPrices.map((price) => {
      const text = price.replace("$", "");
      return Number(text);
    });
    return actualPrices;
  }
  getProductName(productName) {
    const product = this.item.filter({ hasText: productName });

    return product.locator(".inventory_item_name");
  }
  getProductPrice(productName) {
    const product = this.item.filter({ hasText: productName });
    return product.locator(".inventory_item_price");
  }
  async openProduct(productName) {
    const product = this.productNames.filter({ hasText: productName });
    await product.click();
  }
}
