import { test, expect } from '@playwright/test';

test('Sauce Demo Purchase Flow', async ({ page }) => {

  await page.goto('https://www.saucedemo.com/', { waitUntil: 'domcontentloaded' });

  await page.locator('//input[@id="user-name"]').fill('standard_user');
  await page.locator('//input[@id="password"]').fill('secret_sauce');
  await page.locator('//input[@id="login-button"]').click();

  await expect(page.locator('//span[text()="Products"]')).toBeVisible();

  const sortDropdown = page.locator('select[data-test="product-sort-container"]');
  await sortDropdown.waitFor({ state: 'attached' });
  await sortDropdown.selectOption('lohi');

  const addButtons = page.locator('//button[text()="Add to cart"]');
  await addButtons.nth(0).click();
  await addButtons.nth(1).click();

  await expect(page.locator('//span[@class="shopping_cart_badge"]')).toHaveText('2');

  await page.locator('//a[@class="shopping_cart_link"]').click();
  const cartItems = page.locator('//div[@class="inventory_item_name"]');
  await expect(cartItems).toHaveCount(2);

  await page.locator('//button[text()="Remove"]').first().click();
  await expect(page.locator('//div[@class="inventory_item_name"]')).toHaveCount(1);

  await page.locator('//button[@id="checkout"]').click();

  await page.locator('//input[@id="first-name"]').fill('Hemanth');
  await page.locator('//input[@id="last-name"]').fill('Kumar');
  await page.locator('//input[@id="postal-code"]').fill('13579');
  await page.locator('//input[@id="continue"]').click();

  await expect(page.locator('//span[text()="Checkout: Overview"]')).toBeVisible();

  const productName = await page.locator('//div[@class="inventory_item_name"]').textContent();
  const productPrice = await page.locator('//div[@class="inventory_item_price"]').textContent();
  const subtotal = await page.locator('//div[@class="summary_subtotal_label"]').textContent();
  const total = await page.locator('//div[@class="summary_total_label"]').textContent();
  console.log(`Product: ${productName}, Price: ${productPrice}, Subtotal: ${subtotal}, Total: ${total}`);

  await page.locator('//button[@id="finish"]').click();

  await expect(page.locator('//h2[text()="Thank you for your order!"]')).toBeVisible();

  await page.locator('//button[@id="react-burger-menu-btn"]').click();
  await page.locator('//a[@id="logout_sidebar_link"]').click();
  await expect(page.locator('//input[@id="login-button"]')).toBeVisible();
});
