export class InventoryPage {
  constructor(page) {
    this.page = page;
    this.cartCounter = page.locator(".shopping_cart_badge");
    this.cartIcon = page.locator(".shopping_cart_container");
    this.sortDropdown = page.locator(".product_sort_container");
    this.productPrices = page.locator(".inventory_item_price");
  }
  async addToCart(productName) {
    const inventoryItem = this.page
      .locator(".inventory_item")
      .filter({ hasText: productName });
    await inventoryItem.getByText("Add to cart").click();
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
}
