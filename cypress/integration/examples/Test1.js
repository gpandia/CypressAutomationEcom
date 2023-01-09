describe("My First Test Suite", function () {
  it("My First Test case", function () {
    cy.visit(Cypress.env("url") + "/seleniumPractise/#/");
    cy.get(".search-keyword").type("ca");
    cy.wait(2000);
    cy.get(".product:visible").should("have.length", 4);
    //parent child chaining
    cy.get(".products").find(".product").should("have.length", 4);
    cy.get(".products").find(".product").eq(1).contains("ADD TO CART").click();
    //iterating with each

    cy.get(".products")
      .find(".product")
      .each(($el, index, $list) => {
        const textVeg = $el.find("h4.product-name").text();
        if (textVeg.includes("Cashews")) {
          cy.wrap($el).find("button").click();
        }
      });
  });
});
