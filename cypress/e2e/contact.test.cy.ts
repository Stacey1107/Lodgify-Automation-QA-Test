import { ContactPage } from '../po/pages';

context('Lodgify Contact', () => {
  const contactPage = new ContactPage();

  beforeEach(() => {
    contactPage.open();
  });

  it('Verify that Name, Phone, Email and Comment fields are mandatory to fill', () => {
    cy.fixture('validation.messages').then((messages: Record<string, string>) => {
      contactPage.verifyMandatoryFieldErrorMessage(contactPage.nameInput, messages.MandatoryName);
      contactPage.verifyMandatoryFieldErrorMessage(contactPage.phoneInput, messages.MandatoryPhone);
      contactPage.verifyMandatoryFieldErrorMessage(contactPage.emailInput, messages.MandatoryEmail);
      contactPage.verifyMandatoryFieldErrorMessage(contactPage.commentInput, messages.MandatoryComment);
      contactPage.submitButton.should('be.disabled');
    });
  });

  it('Verify that email field should have valid email', () => {
    cy.fixture('validation.messages').then((messages: Record<string, string>) => {
      cy.fixture('contact').then((contactData: Record<string, string>) => {
        contactPage.emailInput.clear().type(contactData.NonValidEmail).blur();
        contactPage.verifyFieldErrorMessage(contactPage.emailInput, messages.NonValidEmail);
        contactPage.emailInput.clear().type(contactData.Email).blur();
        contactPage.emailInput.siblings().should('have.length', 0);
      });
    });
  });

  it('Verify that needed date range can be chosen', () => {
    cy.fixture('contact').then((contactData: Record<string, string>) => {
      contactPage.datepickerArrivalInput.click({
        force: true,
      });
      contactPage.datepicker.should('be.visible');
      contactPage.chooseDateOnDatepicker(contactData.ArrivalDate);
      contactPage.chooseDateOnDatepicker(contactData.DepartureDate);
      contactPage.datepickerArrivalInput.invoke('val').should('include', contactData.ArrivalDateInNumbers);
      contactPage.datepickerDepartureInput.invoke('val').should('include', contactData.DepartureDateInNumbers);
    });
  });

  it('Verify that submit button is enabled when all mandatory fields are filled', () => {
    cy.fixture('contact').then((contactData: Record<string, string>) => {
      contactPage.nameInput.clear().type(contactData.Name).blur();
      contactPage.phoneInput.clear().type(contactData.Phone).blur();
      contactPage.emailInput.clear().type(contactData.Email).blur();
      contactPage.commentInput.clear().type(contactData.Comment).blur();
      contactPage.submitButton.should('be.enabled');
    });
  });

  it('Verify that number country is identified and proper flag is shown', () => {
    cy.fixture('contact').then((contactData: Record<string, string>) => {
      contactPage.phoneInput.clear().type(contactData.Phone).blur();
      contactPage.phoneCountry.invoke('attr', 'alt').should('be.equal', contactData.Country);
    });
  });
});
