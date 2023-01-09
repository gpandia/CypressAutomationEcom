describe("first api suite", () => {
  it("first api test", () => {
    cy.request("POST", "http://216.10.245.166/Library/Addbook.php", {
      name: "Learn Appium Automation with Java",
      isbn: "bcder",
      aisle: "227",
      author: "John foe",
    }).then((response) => {
      expect(response.body).to.have.property("Msg", "successfully added");
    });
  });
});
