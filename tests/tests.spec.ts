import { test, expect } from '@playwright/test';

import { HomePage } from '../pages/HomePage';
import { ProductDetailPage } from '../pages/ProductDetailPage';
import { CartPage } from '../pages/CartPage';

test.describe('Light Challenge', () => {
  let homePage: HomePage;
  let productDetailPage: ProductDetailPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    homePage = new HomePage(page);
    productDetailPage = new ProductDetailPage(page);
    cartPage = new CartPage(page);
  });

  test('Add Product to Cart + Complete Purchase (Happy Path)', async ({ page }) => {

    await test.step('Go to Laptops category', async () => {
      await homePage.gotoCategory('Laptops');
    });

    await test.step('Select a laptop product and go to its details', async () => {
      await homePage.gotoProductDetails('Sony vaio i5');
    });

    await test.step('Add the laptop to the cart', async () => {
      await productDetailPage.addToCart();
      await page.waitForEvent('dialog').then(dialog => dialog.accept());
    });

    await test.step('Navigate to the cart page', async () => {
      await homePage.gotoCart();
    });

    await test.step('Open the Place Order modal', async () => {
      await cartPage.placeOrder();
      await expect(cartPage.placeOrderHeading).toBeVisible();
    });

    await test.step('Fill out customer and payment information', async () => {
      await cartPage.nameTextboxFill();
      await cartPage.countryTextboxFill();
      await cartPage.cityTextboxFill();
      await cartPage.creditCardTextboxFill();
      await cartPage.monthTextboxFill();
      await cartPage.yearTextboxFill();
    });

    await test.step('Complete the purchase', async () => {
      await cartPage.purchaseButtonClick();
      await cartPage.thankYouHeadingIsVisible();
      await cartPage.okButtonClick();
    });
  });
});