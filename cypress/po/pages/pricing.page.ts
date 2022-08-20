import { TCurrencyLabel, TCurrencyOption } from 'cypress/types';
import BasePage from './base.page';

export default class PricingPage extends BasePage {
  constructor() {
    super('pricing.html');
  }

  public get rentalsInput() {
    return cy.get('#scroll-prop-plan');
  }

  public get planPrice() {
    return cy.get('.price-grid .plan-price');
  }

  public get currencySelect() {
    return cy.get('.price-currency-select');
  }

  public currencyOption = (currencyType: TCurrencyOption) => cy.get(`option[value=${currencyType}]`);

  verifyPricingOptionCurrencyChange(currencyLabel: TCurrencyLabel, currencyValues: string[]): void {
    this.currencySelect.select(currencyLabel);
    this.planPrice.each((elem, index) => {
      cy.get(elem as unknown as string).should('have.text', currencyValues[index]);
    });
  }
}
