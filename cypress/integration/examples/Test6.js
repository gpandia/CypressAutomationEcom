describe("My Fifth Test Suite", function () {
  it("My Fifth Test case", function () {
    cy.visit(Cypress.env("url") + "/AutomationPractice/");

    // Mouse Hover
    // cy.get(".mouse-hover-content").invoke("show");
    cy.contains("Top").click({ force: true });
    cy.url().should("include", "top");
  });
});
