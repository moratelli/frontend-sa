describe("Register", () => {
  beforeEach(() => {
    cy.visit("https://frontend-sa.netlify.app");
    cy.get("a").contains("Não possui uma conta?").click();
  });

  const randomString = Math.random().toString(36).slice(2);

  const validName = "Test Subject";
  const validEmail = `${randomString}@cypress.com`;
  const validPassword = "123";

  it("Successful register", () => {
    cy.get("[class=form-control]").eq(0).type(validName);
    cy.get("[class=form-control]").eq(1).type(validEmail);
    cy.get("[class=form-control]").eq(2).type(validPassword);
    cy.get("[class=form-control]").eq(3).type(validPassword);
    cy.get("[id='register-button']").click();
    cy.document().should("contain.text", "Registro concluído com sucesso");
  });

  it("User inserted an already on use email", () => {
    cy.get("[class=form-control]").eq(0).type(validName);
    cy.get("[class=form-control]").eq(1).type("testes@cypress.com");
    cy.get("[class=form-control]").eq(2).type(validPassword);
    cy.get("[class=form-control]").eq(3).type(validPassword);
    cy.get("[id='register-button']").click();
    cy.document().should("contain.text", "O e-mail informado já está em uso!");
  });

  it("User inserted an invalid email", () => {
    cy.get("[class=form-control]").eq(0).type(validName);
    cy.get("[class=form-control]").eq(1).type("xx");
    cy.get("[class=form-control]").eq(2).type(validPassword);
    cy.get("[class=form-control]").eq(3).type(validPassword);
    cy.get("[id='register-button']").click();
    cy.document().should("contain.text", "Informe um e-mail válido.");
  });

  it("User didn't insert a name", () => {
    cy.get("[class=form-control]").eq(1).type(validEmail);
    cy.get("[class=form-control]").eq(2).type(validPassword);
    cy.get("[class=form-control]").eq(3).type(validPassword);
    cy.get("[id='register-button']").click();
    cy.document().should("contain.text", "Informe um nome.");
  });

  it("User didn't insert an email", () => {
    cy.get("[class=form-control]").eq(0).type(validName);
    cy.get("[class=form-control]").eq(2).type(validPassword);
    cy.get("[class=form-control]").eq(3).type(validPassword);
    cy.get("[id='register-button']").click();
    cy.document().should("contain.text", "Informe um nome.");
  });

  it("User didn't insert a password", () => {
    cy.get("[class=form-control]").eq(0).type(validName);
    cy.get("[class=form-control]").eq(1).type(validEmail);
    cy.get("[class=form-control]").eq(3).type(validPassword);
    cy.get("[id='register-button']").click();
    cy.document().should("contain.text", "Informe uma senha.");
  });

  it("User didn't insert a password confirmation", () => {
    cy.get("[class=form-control]").eq(0).type(validName);
    cy.get("[class=form-control]").eq(1).type(validEmail);
    cy.get("[class=form-control]").eq(2).type(validPassword);
    cy.get("[id='register-button']").click();
    cy.document().should("contain.text", "Repita a senha informada.");
  });

  /* it("User didn't insert a valid password confirmation", () => {
    cy.get("[class=form-control]").eq(0).type(validName);
    cy.get("[class=form-control]").eq(1).type(validEmail);
    cy.get("[class=form-control]").eq(2).type(validPassword);
    cy.get("[class=form-control]").eq(3).type(randomString);
    cy.get("[id='register-button']").click();
    cy.document().should("contain.text", "As senhas não são iguais.");
  }); */
});
