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

  test('Cart Total Calculation', async ({ page }) => {
    const productPrices: Record<string, number> = {
      'Sony vaio i5': 790,
      'Samsung galaxy s6': 360,
    };

    await test.step('Go to Phones category', async () => {
      await homePage.gotoCategory('Phones');
    });

    await test.step('Select a phone product and go to its details', async () => {
      await homePage.gotoProductDetails('Samsung galaxy s6');
    });

    await test.step('Add the phone to the cart', async () => {
      await productDetailPage.addToCart();
      await page.waitForEvent('dialog').then(dialog => dialog.accept());
    });

    await test.step('Go to home page', async () => {
      await homePage.gotoHome();
    });

    await test.step('Go to laptop category', async () => {
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

    await test.step('Verify the cart total matches the expected total', async () => {
      await cartPage.verifyTotal(productPrices);
    });
  });

  // This test is intentionally expected to fail, because there is a known bug in the app:
  // The purchase order modal does NOT properly validate that mandatory fields are filled out.
  // Ideally, submitting the form with blank fields should NOT complete the purchase, but due to the bug,
  // the purchase can still go through and the success ("Thank you") modal appears.
  // The assertion at the end demonstrates the expected (but currently broken) behaviour.
  test('Purchase Modal Field validations (expect failing due to missing mandatory validation)', async ({ page }) => {

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

    await test.step('Fill out the form with blanks', async () => {
      await cartPage.fillPurchaseModalWithBlanks();
    });

    await test.step('Click the Purchase button with blanks', async () => {
      await cartPage.purchaseButtonClick();
      // This should fail: The thank you heading should NOT be visible if the app validated fields.
      // However, due to the bug, the modal still appears, so this negative assertion will fail.
      await expect(cartPage.thankYouHeading).not.toBeVisible();
    });
  });
});