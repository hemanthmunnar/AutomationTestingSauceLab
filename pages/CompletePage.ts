import { Page } from '@playwright/test';

export class CompletePage {
  constructor(private page: Page) {}

  async validateSuccess() {
    await this.page.waitForSelector('//h2[text()="Thank you for your order!"]');
  }

  async logout() {
    await this.page.click('//button[@id="react-burger-menu-btn"]');
    await this.page.click('//a[@id="logout_sidebar_link"]');
  }
}
