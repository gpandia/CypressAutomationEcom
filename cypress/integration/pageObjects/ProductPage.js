class ProductPage {
  checkOut() {
    return cy.get("a.nav-link.btn");
  }
  finalCheck() {
    return cy.get("button.btn-success");
  }
  getCountry() {
    return cy.get("#country");
  }
  getSuggestions() {
    return cy.get(".suggestions");
  }
}

export default ProductPage;
