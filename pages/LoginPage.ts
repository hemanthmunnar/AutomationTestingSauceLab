import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(username: string, password: string) {
    await this.page.fill('//input[@id="user-name"]', username);
    await this.page.fill('//input[@id="password"]', password);
    await this.page.click('//input[@id="login-button"]');
  }

  async verifyLogin() {
    await this.page.waitForSelector('//span[text()="Products"]');
  }
}
