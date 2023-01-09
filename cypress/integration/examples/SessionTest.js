const neatCSV = require("neat-csv");
let productName;

describe("first session suite", () => {
  it("first session test save token to local storage", () => {
    cy.LoginAPI().then(function () {
      cy.visit("https://rahulshettyacademy.com/client", {
        onBeforeLoad: function (window) {
          window.localStorage.setItem("token", Cypress.env("token"));
        },
      });
    });
    cy.get(".card-body b")
      .eq(1)
      .then(function (ele) {
        productName = ele.text();
      });
    cy.get(".card-body button:last-of-type").eq(1).click();
    cy.get("button[routerlink*='cart']").click();
    cy.get(".subtotal .btn").click();
    cy.get("input[placeholder*='Country']").type("ind");
    cy.get(".ta-results button").each(($el, index, $list) => {
      if ($el.text() === " India") {
        cy.wrap($el).click();
      }
    });
    cy.get(".action__submit").click({ force: true });
    cy.wait(2000);
    cy.get("tbody tr button.btn").click();
    cy.readFile(
      Cypress.config("fileServerFolder") +
        "/cypress/downloads/order-invoice_sample321.csv"
    ).then(async (text) => {
      const csv = await neatCSV(text);
      console.log(csv);
      const actualProductCSV = csv[0]["Product Name"];
      expect(actualProductCSV).to.equal(productName);
    });
  });
});
