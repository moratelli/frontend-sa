describe("Login", () => {
  beforeEach(() => {
    cy.visit("https://frontend-sa.netlify.app");
  });

  const validLogin = "testes@cypress.com";
  const validPassword = "123";

  it("User inserted the right login and password", () => {
    cy.get("[class=form-control]").eq(0).type(validLogin);
    cy.get("[class=form-control]").eq(1).type(validPassword);
    cy.get("[class='font-weight-bold btn btn-info btn-block']").eq(0).click();
    cy.document().should("contain.text", "Logout");
  });

  it("User inserted the right login and wrong password", () => {
    cy.get("[class=form-control]").eq(0).type(validLogin);
    cy.get("[class=form-control]").eq(1).type("000000");
    cy.get("[class='font-weight-bold btn btn-info btn-block']").eq(0).click();
    cy.document().should("contain.text", "Email e/ou senha inválido!");
  });

  it("User inserted the wrong login and right password", () => {
    cy.get("[class=form-control]").eq(0).type("testessssss@cypress.com");
    cy.get("[class=form-control]").eq(1).type(validPassword);
    cy.get("[class='font-weight-bold btn btn-info btn-block']").eq(0).click();
    cy.document().should("contain.text", "Email e/ou senha inválido!");
  });

  it("User inserted a login but didn't insert a password", () => {
    cy.get("[class=form-control]").eq(0).type(validLogin);
    cy.get("[class='font-weight-bold btn btn-info btn-block']").eq(0).click();
    cy.document().should("contain.text", "Informe um e-mail válido.");
  });

  it("User didn't insert a login but inserted a password", () => {
    cy.get("[class=form-control]").eq(0).type(validPassword);
    cy.get("[class='font-weight-bold btn btn-info btn-block']").eq(0).click();
    cy.document().should("contain.text", "Infome sua senha.");
  });
});
