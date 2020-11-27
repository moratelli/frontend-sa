describe("Change password", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("#user-email").type("cypress@testes.com");
    cy.get("#user-password").type("123");
    cy.get("#login-button").click();
    cy.get(".nav-link").contains("Perfil").click();
  });

  it("Sucessful password change", () => {
    cy.get("#senha").type("321");
    cy.get("#confirmar-senha").type("321");
    cy.get("#save-button").click();
    cy.get(".nav-link").contains("Logout").click();
    cy.get("#user-email").type("cypress@testes.com");
    cy.get("#user-password").type("321");
    cy.get("#login-button").click();
    cy.document().should("contain.text", "Cypress");

    //  clean up
    cy.get(".nav-link").contains("Perfil").click();
    cy.get("#senha").type("123");
    cy.get("#confirmar-senha").type("123");
    cy.get("#save-button").click();
  });

  it("User didn't insert the same password", () => {
    cy.get("#senha").type("321");
    cy.get("#confirmar-senha").type("123");
    cy.get("#save-button").click();
    cy.document().should("contain.text", "As duas senhas devem ser iguais!");
  });
});
