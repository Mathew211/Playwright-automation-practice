export class LoginPage {
  constructor(page) {
    this.page = page;

    this.loginInput = page.locator("#user-name");
    this.passwordInput = page.locator("#password");
    this.loginButton = page.locator("#login-button");
    this.logoutButton = page.locator("#logout_sidebar_link");
    this.hamburgerMenuButton = page.locator(".bm-burger-button");
    this.errorMessage = page.locator(".error-message-container");
  }

  async open() {
    await this.page.goto("/");
  }

  async login(username, password) {
    await this.loginInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async logout() {
    await this.hamburgerMenuButton.click();
    await this.logoutButton.click();
  }
}
