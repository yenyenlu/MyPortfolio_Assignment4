describe("Auth flow", () => {
  it("can sign up, view profile, and sign out", () => {
    const email = `test${Date.now()}@example.com`;
    const password = "Password1";

    cy.visit("/signup");

    cy.contains("Name").parent().find("input").type("Test User");
    cy.contains("Email").parent().find("input").type(email);
    cy.contains("Password").parent().find("input").type(password);
    cy.contains("Confirm Password").parent().find("input").type(password);

    cy.contains("Sign Up").click();

    cy.url().should("include", "/profile");
    cy.contains("Welcome").should("exist");
    cy.contains(email).should("exist");

    cy.contains("Sign Out").click();
    cy.contains("Sign In").should("exist");
  });
});