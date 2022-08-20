import { PricingPage } from '../po/pages';
import { TRentalPricing } from '../types';

context('Lodgify Pricing', () => {
  const pricingPage = new PricingPage();

  beforeEach(() => {
    pricingPage.open();
  });

  it('Verify that "Yearly" plan with 50 rentals displays the correspondent prices for Starter, Professional and Ultimate plans', () => {
    cy.fixture('vacation.rental.pricing').then((prices: TRentalPricing) => {
      pricingPage.rentalsInput.clear().type('50');
      pricingPage.planPrice.each((elem, index) => {
        cy.get(elem as unknown as string).should('have.text', prices.Yearly[50].USD[index]);
      });
    });
  });

  it('Verify that the change of currency properly changes the currency of the pricing options', () => {
    cy.fixture('vacation.rental.pricing').then((prices: TRentalPricing) => {
      pricingPage.rentalsInput.clear().type('50');
      pricingPage.verifyPricingOptionCurrencyChange('£ GBP', prices.Yearly[50].GBP);
      pricingPage.verifyPricingOptionCurrencyChange('€ EUR', prices.Yearly[50].EUR);
    });
  });
});
