/// <reference types="Cypress" />
/// <reference types="cypress-iframe" />
import "cypress-iframe";
import HomePage from "../pageObjects/HomePage";
import ProductPage from "../pageObjects/ProductPage";
import ShopPage from "../pageObjects/ShopPage";
describe("My Nineth Test Suite", function () {
  before(() => {
    // root-level hook
    // runs once before all tests
    cy.fixture("example").then(function (data) {
      this.data = data;
    });
  });
  it("My Nine Test case", function () {
    const homePage = new HomePage();
    const productPage = new ProductPage();
    const shopPage = new ShopPage();

    cy.visit(Cypress.env("url") + "/angularpractice/");
    homePage.getEditBox().type(this.data.name);
    homePage.getGender().select(this.data.gender);

    // Verify if the same data is typed
    homePage.getTwoWayBinding().should("have.value", this.data.name);
    homePage.getEditBox().should("have.attr", "minlength", "2");
    homePage.getEntrepreneur().should("be.disabled");
    homePage.getShop().click();
    this.data.productName.forEach(function (element) {
      cy.selectProduct(element);
    });
    productPage.checkOut().click();
    var sum = 0;
    cy.get("tr td:nth-child(4) strong")
      .each(($el, index, $list) => {
        const amount = $el.text();
        var res = amount.split(" ");
        res = res[1].trim();
        sum = Number(sum) + Number(res);
      })
      .then(function () {
        cy.log(Number(sum));
      });
    cy.get("h3 strong").then(function (element) {
      var totalText = element.text();
      var Total = totalText.split(" ");
      Total = Total[1].trim();
      expect(Number(Total)).to.equal(Number(sum));
    });
    productPage.finalCheck().click();
    productPage.getCountry().type("India");
    Cypress.config("defaultCommandTimeout", 8000);
    productPage.getSuggestions().click();
    shopPage.checkBox().click({ force: true });
    shopPage.submitBox().click();
    shopPage.alertMsg().then(function (element) {
      const actualText = element.text();
      expect(actualText.includes("Success")).to.be.true;
    });
  });
});
