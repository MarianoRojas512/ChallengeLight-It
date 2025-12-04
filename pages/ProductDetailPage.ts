import { Locator, Page } from '@playwright/test';

export class ProductDetailPage {
  readonly page: Page;

  readonly addToCartButton : Locator;
  readonly productName : (name: string) => Locator;

  constructor(page: Page) {
    this.page = page;

    this.productName = (name: string) => page.getByRole('heading', { name });
    this.addToCartButton = page.getByRole('link', { name: 'Add to cart' });
  }

  async addToCart() {
    await this.addToCartButton.click();
  }

  async productNameIsVisible(name: string) {
    await this.productName(name).waitFor({ state: 'visible' });
  }
}
