import { recurse } from 'cypress-recurse';

import BasePage from './base.page';

export default class ContactPage extends BasePage {
  constructor() {
    super('contact.html');
  }

  public get nameInput() {
    return cy.get('[data-testid="form"] [name="name"]');
  }

  public get phoneInput() {
    return cy.get('[data-testid="phone-input"]');
  }

  public get phoneCountry() {
    return cy.get('.PhoneInputCountryIconImg');
  }

  public get emailInput() {
    return cy.get('[data-testid="form"] [name="email"]');
  }

  public get guestsInput() {
    return cy.get('[data-testid="form"] [name="guests"]');
  }

  public get datepicker() {
    return cy.get('.DayPicker');
  }

  public get datepickerArrivalInput() {
    return cy.get('input[aria-label="Arrival"]');
  }

  public get datepickerDepartureInput() {
    return cy.get('input[aria-label="Departure"]');
  }

  public get commentInput() {
    return cy.get('[data-testid="form"] textarea');
  }

  public get submitButton() {
    return cy.get('[data-testid="form"] button[type="submit"]');
  }

  private calendarVisibleMonth = (month: string) => {
    return Cypress.$(`div[data-visible = "true"] .CalendarMonth_caption:contains("${month}")`);
  };

  private get calendarNextMonthsButton() {
    return cy.get('[aria-label = "Move forward to switch to the next month."]');
  }

  private calendarAvailableDay(date: string) {
    return cy.get(`.CalendarDay[aria-disabled = "false"][aria-label*="${date}"]`);
  }

  verifyFieldErrorMessage(element: Cypress.Chainable<JQuery<any>>, message: string) {
    element.siblings('.label').should('have.text', message);
  }

  verifyMandatoryFieldErrorMessage(element: Cypress.Chainable<JQuery<any>>, message: string) {
    element.clear().blur();
    this.verifyFieldErrorMessage(element, message);
  }

  chooseDateOnDatepicker(date: string) {
    const [month] = date.split(' ');

    recurse(
      () => this.calendarNextMonthsButton.click(),
      () => Boolean(this.calendarVisibleMonth(month).length),
      {
        timeout: 30000,
        delay: 300,
      },
    );

    this.calendarAvailableDay(date).click();
  }
}
