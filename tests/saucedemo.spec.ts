import { test } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { ProductsPage } from '../pages/productsPage';
import { CartPage } from '../pages/cartPage';
import { CheckoutPage } from '../pages/checkoutPage';
import { OverviewPage } from '../pages/overviewPage';
import { CompletePage } from '../pages/completePage';

test('Sauce Demo Purchase Flow', async ({ page }) => {
  const login = new LoginPage(page);
  const products = new ProductsPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);
  const overview = new OverviewPage(page);
  const complete = new CompletePage(page);

  await login.goto();
  await login.login('error_user', 'secret_sauce');
  await login.verifyLogin();

  await products.sortLowToHigh();
  await products.addCheapestTwo();
  await products.validateCartCount('2');
  await products.openCart();

  await cart.verifyProducts();
  await cart.removeOne();
  await cart.checkout();

  await checkout.enterCustomerInfo('Hemanth', 'Kumar', '13579');
  await overview.validateSummary();
  await overview.finishOrder();

  await complete.validateSuccess();
  await complete.logout();
});
