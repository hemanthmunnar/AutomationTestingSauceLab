import { Page } from '@playwright/test';

export class OverviewPage {
  constructor(private page: Page) {}

  async validateSummary() {
    await this.page.waitForSelector('//div[@class="summary_info"]');
  }

  async finishOrder() {
    await this.page.click('//button[@id="finish"]');
  }
}
