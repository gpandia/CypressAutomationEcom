import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import ProductPage from "../../../pageObjects/ProductPage";
import HomePage from "../../../pageObjects/HomePage";
import ShopPage from "../../../pageObjects/ShopPage";

const homePage = new HomePage();
const productPage = new ProductPage();
const shopPage = new ShopPage();
let name;

Given("Opening Ecommerce Page", () => {
  cy.visit(Cypress.env("url") + "/angularpractice/");
});

When("Add Items to Cart", function () {
  homePage.getShop().click();
  this.data.productName.forEach(function (element) {
    cy.selectProduct(element);
  });
  productPage.checkOut().click();
});

When("Validate the total prices", () => {
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
});

Then("Select the country and verify Success message", () => {
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

When("I Fill the form Details", function (dataTable) {
  name = dataTable.rawTable[1][0];
  homePage.getEditBox().type(name);
  homePage.getGender().select(dataTable.rawTable[1][1]);
});

Then("Validate the entries", function () {
  homePage.getTwoWayBinding().should("have.value", name);
  homePage.getEditBox().should("have.attr", "minlength", "2");
  homePage.getEntrepreneur().should("be.disabled");
});

Then("Click the shop Tab", function () {
  homePage.getShop().click();
});
