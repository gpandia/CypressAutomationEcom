describe("My Second intercept suite", () => {
  it("My Second Intercept case", () => {
    cy.visit("https://rahulshettyacademy.com/angularAppdemo/");
    cy.intercept(
      "GET",
      "https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty",
      (req) => {
        req.url =
          "https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=malhotra";
        req.continue((res) => {
          // expect(res.statusCode).to.equal(403);
        });
      }
    ).as("dummyurl");
    cy.get("button[class='btn btn-primary']").click();
    cy.wait("@dummyurl");
  });
});
