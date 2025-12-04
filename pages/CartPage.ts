import { Locator, Page } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class CartPage {
  readonly page: Page;

  readonly placeOrderButton: Locator;
  readonly placeOrderHeading : Locator;
  readonly totalTextbox : Locator;
  readonly countryTextbox : Locator;
  readonly cityTextbox : Locator;
  readonly creditCardTextbox : Locator;
  readonly monthTextbox : Locator;
  readonly yearTextbox : Locator;
  readonly purchaseButton : Locator;
  readonly thankYouHeading : Locator;
  readonly okButton : Locator;

  constructor(page: Page) {
    this.page = page;

    this.placeOrderButton = page.getByRole('button', { name: 'Place Order' });
    this.placeOrderHeading = page.getByRole('heading', { name: 'Place order' });
    this.countryTextbox = page.getByRole('textbox', { name: 'Country:' });
    this.cityTextbox = page.getByRole('textbox', { name: 'City:' });
    this.creditCardTextbox = page.getByRole('textbox', { name: 'Credit card:' });
    this.monthTextbox = page.getByRole('textbox', { name: 'Month:' });
    this.yearTextbox = page.getByRole('textbox', { name: 'Year:' });
    this.purchaseButton = page.getByRole('button', { name: 'Purchase' });
    this.totalTextbox = page.getByRole('textbox', { name: 'Total: Name:' });
    this.thankYouHeading = page.getByRole('heading', { name: 'Thank you for your purchase!' });
    this.okButton = page.getByRole('button', { name: 'OK' });

  }

  async placeOrder() {
    await this.placeOrderButton.click();
  }

  async nameTextboxFill() {
    const fakeName = faker.person.fullName();
    await this.totalTextbox.fill(fakeName);
  }

  async countryTextboxFill() {
    const fakeCountry = faker.location.country();
    await this.countryTextbox.fill(fakeCountry);
  }

  async cityTextboxFill() {
    const fakeCity = faker.location.city();
    await this.cityTextbox.fill(fakeCity);
  }

  async creditCardTextboxFill() {
    const fakeCreditCard = '4111 1111 1111 1111';
    await this.creditCardTextbox.fill(fakeCreditCard);
  }

  async monthTextboxFill() {
    const fakeMonth = faker.date.month();
    await this.monthTextbox.fill(fakeMonth);
  }

  async yearTextboxFill() {
    const fakeYear = new Date().getFullYear().toString();
    await this.yearTextbox.fill(fakeYear);
  }

  async purchaseButtonClick() {
    await this.purchaseButton.click();
  }

  async thankYouHeadingIsVisible() {
    await this.thankYouHeading.waitFor({ state: 'visible' });
  }

  async okButtonClick() {
    await this.okButton.click();
  }
}
