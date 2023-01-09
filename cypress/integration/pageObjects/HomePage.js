class HomePage {
  getEditBox() {
    return cy.get("input[name='name']:nth-child(2)");
  }
  getTwoWayBinding() {
    return cy.get("input[name='name']:nth-child(1)");
  }
  getGender() {
    return cy.get("select");
  }
  getEntrepreneur() {
    return cy.get("#inlineRadio3");
  }
  getShop() {
    return cy.get(".nav-item:nth-child(2)");
  }
}

export default HomePage;
