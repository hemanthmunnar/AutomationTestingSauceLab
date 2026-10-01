import { Page, Locator, expect } from '@playwright/test';

export class SaucedemoPage {
  readonly page: Page;
  usernameInput: Locator;
  passwordInput: Locator;
  loginButton: Locator;
  titleProducts: Locator;
  sortDropdown: Locator;
  addToCartButtons: Locator;
  cartBadge: Locator;
  cartIcon: Locator;
  cartItems: Locator;
  cartItemNames: Locator;
  removeButton: Locator;
  checkoutButton: Locator;
  firstName: Locator;
  lastName: Locator;
  postalCode: Locator;
  continueButton: Locator;
  overviewTitle: Locator;
  subtotal: Locator;
  total: Locator;
  finishButton: Locator;
  successMessage: Locator;
  menuButton: Locator;
  logout: Locator;


  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator("//input[@id='user-name']");
    this.passwordInput = page.locator("//input[@id='password']");
    this.loginButton = page.locator("//input[@id='login-button']");
    this.titleProducts = page.locator("//span[@class='title']");
    this.sortDropdown = page.getByRole('combobox', { name: 'Sort products' });
    this.addToCartButtons = page.locator("//button[contains(@id,'add-to-cart')]");
    this.cartBadge = page.locator("//span[@class='shopping_cart_badge']");
    this.cartIcon = page.locator("//a[@class='shopping_cart_link']");
    this.cartItems = page.locator("//div[@class='cart_item']");
    this.cartItemNames = page.locator("//div[@class='inventory_item_name']");
     this.removeButton = page.locator("//button[contains(@id,'remove')]");
    this.checkoutButton = page.locator("//button[@id='checkout']");
    this.firstName = page.locator("//input[@id='first-name']");
    this.lastName = page.locator("//input[@id='last-name']");
    this.postalCode = page.locator("//input[@id='postal-code']");
    this.continueButton = page.locator("//input[@id='continue']");
    this.overviewTitle = page.locator("//span[@class='title']");
    this.subtotal = page.locator("//div[@class='summary_subtotal_label']");
    this.total = page.locator("//div[@class='summary_total_label']");
    this.finishButton = page.locator("//button[@id='finish']");
    this.successMessage = page.locator("//h2[@class='complete-header']");
    this.menuButton = page.locator("//button[@id='react-burger-menu-btn']");
    this.logout = page.locator("//a[@id='logout_sidebar_link']");
    


  }

  
  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await expect(this.titleProducts).toHaveText('Products');
  }

  async sortLowToHigh() {
    await this.sortDropdown.selectOption('lohi');
    await expect(this.sortDropdown).toHaveValue('lohi');
  }

  async addCheapestTwo() {
    await this.addToCartButtons.first().click();
    await this.addToCartButtons.first().click();
  }

  async validateCartCount(expected: string) {
    await expect(this.cartBadge).toHaveText(expected);
  }

  async openCart() {
    await this.cartIcon.click();
  }

  async verifyCartItems(expectedNames: string[]) {
    await expect(this.cartItems).toHaveCount(expectedNames.length);
    await expect(this.cartItemNames).toHaveText(expectedNames);
  }

  async removeOne() {
    await this.removeButton.first().click();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async enterCustomerInfo(fname: string, lname: string, zip: string) {
    await this.firstName.fill(fname);
    await this.lastName.fill(lname);
    await this.postalCode.fill(zip);
    await this.continueButton.click();
    await expect(this.overviewTitle).toHaveText('Checkout: Overview');
  }

  async validateSummary() {
    await expect(this.cartItemNames).toHaveText(['Sauce Labs Bike Light']);
    await expect(this.page.locator("//div[@class='inventory_item_price']")).toHaveText('$9.99');
    await expect(this.subtotal).toHaveText('Item total: $9.99');
    await expect(this.total).toHaveText('Total: $10.79');
  }

  async completeOrder() {
    await this.finishButton.click();
  }

  async validateSuccess() {
    await expect(this.successMessage).toHaveText('Thank you for your order!');
  }

  async logoutButton() {
    await this.menuButton.click();
    await this.logout.click();
    
    
  }

  
}
