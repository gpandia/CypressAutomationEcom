describe("My Fifth Test Suite", function () {
  it("My Fifth Test case", function () {
    cy.visit(Cypress.env("url")+"/AutomationPractice/");
    cy.get("#opentab").then(function (ele) {
      const url = ele.prop("href");
      cy.visit(url);
    });
  });
});
