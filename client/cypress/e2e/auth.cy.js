// client/cypress/e2e/auth.cy.js

describe("Auth flow", () => {
  it("can sign up, view profile, and sign out", () => {
    // Go to signup page
    cy.visit("/signup");

    // Make a unique email each run so it won't conflict with existing users
    const email = `test${Date.now()}@mail.com`;
    const password = "Abcdefg1";

    // Fill the form inputs safely (scoped to the form)
    cy.get("form").should("exist").within(() => {
      // These selectors assume the form has 4 inputs in order:
      // Name, Email, Password, Confirm Password
      cy.get("input").should("have.length.at.least", 4);

      cy.get("input").eq(0).clear().type("Test User");    // Name
      cy.get("input").eq(1).clear().type(email);          // Email
      cy.get("input").eq(2).clear().type(password);       // Password
      cy.get("input").eq(3).clear().type(password);       // Confirm Password

      cy.contains("button", /^sign up$/i).click();
    });

    // After signup, expect to reach profile
    cy.url().should("include", "/profile");

    // Basic check that profile content loads (loose match so it won't be brittle)
    cy.contains(/profile|welcome|account|user/i);

    // Sign out
    // Adjust if your button says "Logout" or "Sign Out"
    // Sign out
cy.contains("button", /sign out|logout/i).click()

// After sign out, either:
// (A) you are redirected away from /profile, OR
// (B) you stay on /profile but see "Please sign in first."
cy.location("pathname").then((path) => {
  if (path.includes("/profile")) {
    cy.contains(/please sign in first/i)
  } else {
    cy.url().should("not.include", "/profile")
  }
})

// Also confirm you're logged out (Sign In is visible again)
cy.contains(/sign in/i)

  });
});
