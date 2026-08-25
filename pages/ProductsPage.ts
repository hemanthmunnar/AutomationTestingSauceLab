import { Page } from '@playwright/test';

export class ProductsPage {
  constructor(private page: Page) {}

  async sortLowToHigh() {
    await this.page.selectOption('select[data-test="product-sort-container"]', 'lohi');
  }

  async addCheapestTwo() {
    const addButtons = await this.page.$$('//button[contains(text(),"Add to cart")]');
      await addButtons[0].click(); 
      await addButtons[1].click();
    
  }

  async validateCartCount(expected: string) {
    const count = await this.page.textContent('//span[@class="shopping_cart_badge"]');
    if (count !== expected) throw new Error(`Cart count mismatch: ${count}`);
  }

  async openCart() {
    await this.page.click('//a[@class="shopping_cart_link"]');
  }
}
