describe("My Fourth Test Suite", function () {
  it("My Fourth Test case", function () {
    cy.visit(Cypress.env("url") + "/AutomationPractice/");
    cy.get("#alertbtn").click();
    cy.get("input[value='Confirm']").click();

    // Mocha alerts
    cy.on("window:alert", (str) => {
      expect(str).to.equal(
        "Hello , share this practice page and share your knowledge"
      );
    });
    cy.on("window:confirm", (str) => {
      expect(str).to.equal("Hello , Are you sure you want to confirm?");
    });
    cy.get("#opentab").invoke("removeAttr", "target").click();
    cy.url().should("include", "rahulshettyacademy");
    cy.go("back");
  });
});
