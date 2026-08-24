import { Page } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  async verifyProducts() {
    await this.page.waitForSelector('//div[@class="cart_item"]');
  }

  async removeOne() {
    await this.page.click('(//button[text()="Remove"])[1]');
  }

  async checkout() {
    await this.page.click('//button[@id="checkout"]');
  }
}
