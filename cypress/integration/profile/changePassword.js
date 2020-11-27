describe("Change password", () => {
  const initialEmail = "cypress@testes.com";
  const intialPassword = "123";
  const newPassword = "abc";

  beforeEach(() => {
    cy.visit("/");
    cy.get("#user-email").type(initialEmail);
    cy.get("#user-password").type(intialPassword);
    cy.get("#login-button").click();
    cy.get(".nav-link").contains("Perfil").click();
  });

  it("Successful password change", () => {
    cy.get("#senha").type(newPassword);
    cy.get("#confirmar-senha").type(newPassword);
    cy.get("#save-button").click();
    cy.get(".nav-link").contains("Logout").click();
    cy.get("#user-email").type(initialEmail);
    cy.get("#user-password").type(newPassword);
    cy.get("#login-button").click();
    cy.document().should("contain.text", "Cypress");

    //  clean up
    cy.get(".nav-link").contains("Perfil").click();
    cy.get("#senha").type(intialPassword);
    cy.get("#confirmar-senha").type(intialPassword);
    cy.get("#save-button").click();
  });

  it("User didn't insert the same password", () => {
    cy.get("#senha").type(newPassword);
    cy.get("#confirmar-senha").type(intialPassword);
    cy.get("#save-button").click();
    cy.document().should("contain.text", "As duas senhas devem ser iguais!");
  });
});
