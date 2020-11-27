describe("Change name", () => {
  const initialName = "Cypress";
  const newName = "Pedro";

  beforeEach(() => {
    cy.visit("/");
    cy.get("#user-email").type("cypress@testes.com");
    cy.get("#user-password").type("123");
    cy.get("#login-button").click();
    cy.get(".nav-link").contains("Perfil").click();
  });

  it("Successful name change", () => {
    cy.get("#nome").clear().type(newName);
    cy.get("#save-button").click();
    cy.get(".nav-link").contains("Home").click();
    cy.document().should("contain.text", newName);
    cy.get(".nav-link").contains("Perfil").click();
    cy.get("#nome").clear().type(initialName);
    cy.get("#save-button").click();
    cy.document().should("contain.text", initialName);
  });

  it("User didn't insert a name", () => {
    cy.get("#nome").clear();
    cy.get("#save-button").click();
    cy.document().should(
      "contain.text",
      "Preencha todos os campos para continuar!"
    );
  });
});
