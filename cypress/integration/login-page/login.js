describe("Login", () => {
  beforeEach(() => {
    cy.visit("https://frontend-sa.netlify.app");
  });

  const validLogin = "testes@cypress.com";
  const validPassword = "123";

  it("Successful login", () => {
    cy.get("[class=form-control]").eq(0).type(validLogin);
    cy.get("[class=form-control]").eq(1).type(validPassword);
    cy.get("[id='login-button']").click();
    cy.document().should("contain.text", "Logout");
  });

  it("User inserted the right login and wrong password", () => {
    cy.get("[class=form-control]").eq(0).type(validLogin);
    cy.get("[class=form-control]").eq(1).type("000000");
    cy.get("[id='login-button']").click();
    cy.document().should("contain.text", "Email e/ou senha inválido!");
  });

  it("User inserted the wrong login and right password", () => {
    cy.get("[class=form-control]").eq(0).type("testessssss@cypress.com");
    cy.get("[class=form-control]").eq(1).type(validPassword);
    cy.get("[id='login-button']").click();
    cy.document().should("contain.text", "Email e/ou senha inválido!");
  });

  it("User inserted a login but didn't insert a password", () => {
    cy.get("[class=form-control]").eq(0).type(validLogin);
    cy.get("[id='login-button']").click();
    cy.document().should("contain.text", "Informe um e-mail válido.");
  });

  it("User didn't insert a login but inserted a password", () => {
    cy.get("[class=form-control]").eq(0).type(validPassword);
    cy.get("[id='login-button']").click();
    cy.document().should("contain.text", "Infome sua senha.");
  });
});
