import { Page } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {}

  async enterCustomerInfo(first: string, last: string, zip: string) {
    await this.page.fill('//input[@id="first-name"]', first);
    await this.page.fill('//input[@id="last-name"]', last);
    await this.page.fill('//input[@id="postal-code"]', zip);
    await this.page.click('//input[@id="continue"]');
  }
}
