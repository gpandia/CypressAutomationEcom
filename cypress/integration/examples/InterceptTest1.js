describe("My First intercept suite", () => {
  it("My First Intercept case", () => {
    cy.visit("https://rahulshettyacademy.com/angularAppdemo/");
    cy.intercept(
      {
        method: "GET",
        url: "https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty",
      },
      {
        statusCode: 200,
        body: [
          {
            book_name: "RobotFramework",
            isbn: "984353",
            aisle: "982053",
          },
        ],
      }
    ).as("bookretrivals");
    cy.get("button[class='btn btn-primary']").click();
    cy.wait("@bookretrivals").then(({ request, response }) => {
      cy.get("tr").should("have.length", response.body.length + 1);
    });
    cy.get("p").should("have.text", "Oops only 1 Book available");
  });
});
