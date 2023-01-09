class ShopPage {
  submitBox() {
    return cy.get('input[type="submit"]');
  }
  checkBox() {
    return cy.get("label[for='checkbox2']");
  }
  alertMsg() {
    return cy.get(".alert");
  }
}

export default ShopPage;
