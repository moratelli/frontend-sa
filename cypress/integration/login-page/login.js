describe("Login", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  const validLogin = "cypress@testes.com";
  const validPassword = "123";

  it("Successful login", () => {
    cy.get("[id=user-email]").type(validLogin);
    cy.get("[id=user-password]").type(validPassword);
    cy.get("[id=login-button]").click();
    cy.document().should("contain.text", "Logout");
  });

  it("User inserted the right login and wrong password", () => {
    cy.get("[id=user-email]").type(validLogin);
    cy.get("[id=user-password]").type("000000");
    cy.get("[id=login-button]").click();
    cy.document().should("contain.text", "Email e/ou senha inválido!");
  });

  it("User inserted the wrong login and right password", () => {
    cy.get("[id=user-email]").type("testessssss@cypress.com");
    cy.get("[id=user-password]").type(validPassword);
    cy.get("[id=login-button]").click();
    cy.document().should("contain.text", "Email e/ou senha inválido!");
  });

  it("User inserted a login but didn't insert a password", () => {
    cy.get("[id=user-email]").type(validLogin);
    cy.get("[id=login-button]").click();
    cy.document().should("contain.text", "Informe um e-mail válido.");
  });

  it("User didn't insert a login but inserted a password", () => {
    cy.get("[id=user-password]").type(validPassword);
    cy.get("[id=login-button]").click();
    cy.document().should("contain.text", "Infome sua senha.");
  });
});
