export default class BasePage {
  private path: string;

  constructor(path: string = '') {
    this.path = path;
  }

  public open() {
    return cy.visit(this.path);
  }
}
