import { Locator, Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;

  readonly homeIcon: Locator;
  readonly cartMenu: Locator;
  readonly phonesCategory: Locator;
  readonly laptopsCategory: Locator;
  readonly monitorsCategory: Locator;
  readonly carouselFirstSlide: Locator;
  readonly carouselNextButton: Locator;
  readonly carouselPreviousButton: Locator;
  readonly productsList: (name: string) => Locator;

  constructor(page: Page) {
    this.page = page;

    this.homeIcon = page.getByRole('link', { name: 'PRODUCT STORE' });
    this.cartMenu = page.getByRole('link', { name: 'Cart', exact: true });
    this.phonesCategory = page.getByRole('link', { name: 'Phones' });
    this.laptopsCategory = page.getByRole('link', { name: 'Laptops' });
    this.monitorsCategory = page.getByRole('link', { name: 'Monitors' });
    this.carouselFirstSlide = page.getByRole('img', { name: 'First slide' });
    this.carouselNextButton = page.locator('#carouselExampleIndicators').getByRole('button', { name: 'Next' });
    this.carouselPreviousButton = page.locator('#carouselExampleIndicators').getByRole('button', { name: 'Previous' });
    this.productsList = (name: string) => page.getByRole('link').filter({ hasText: name });
  }

  async gotoHome() {
    await this.homeIcon.click();
  }

  async gotoCart() {
    await this.cartMenu.click();
  }

  async gotoCategory(category: 'Phones' | 'Laptops' | 'Monitors') {
    switch (category) {
      case 'Phones':
        await this.phonesCategory.click();
        break;
      case 'Laptops':
        await this.laptopsCategory.click();
        break;
      case 'Monitors':
        await this.monitorsCategory.click();
        break;
      default:
        throw new Error(`Unknown category: ${category}`);
    }
  }

  async carouselFirstSlideIsVisible() {
    await this.carouselFirstSlide.waitFor({ state: 'visible' });
  }

  async carouselNextButtonClick() {
    await this.carouselNextButton.click();
  }

  async carouselPreviousButtonClick() {
    await this.carouselPreviousButton.click();
  }

  async gotoProductDetails(name: string) {
    await this.productsList(name).click();
  }
}