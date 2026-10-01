import { test } from '@playwright/test';
import { SaucedemoPage } from '../pages/SaucedemoPage';

test('Sauce Demo E2E Purchase', async ({ page }) => {
  const sauceDemo = new SaucedemoPage(page);

  await sauceDemo.goto();
  await sauceDemo.login('standard_user', 'secret_sauce');
  await sauceDemo.sortLowToHigh();
  await sauceDemo.addCheapestTwo();
  await sauceDemo.validateCartCount("2");
  await sauceDemo.openCart();
  await sauceDemo.verifyCartItems(['Sauce Labs Onesie', 'Sauce Labs Bike Light']);
  await sauceDemo.removeOne();
  await sauceDemo.verifyCartItems(['Sauce Labs Bike Light']);
  await sauceDemo.validateCartCount('1');
  await sauceDemo.proceedToCheckout();
  await sauceDemo.enterCustomerInfo("Hemanth", "Kumar", "51236");
  await sauceDemo.validateSummary();
  await sauceDemo.completeOrder();
  await sauceDemo.validateSuccess();
  await sauceDemo.logoutButton();

  
});

/////  Only Check SaucedemoPage.ts and saucedemoE2EFlow.spec.ts /////