describe("Register New Account", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("a").contains("Não possui uma conta?").click();
  });

  const randomString = Math.random().toString(36).slice(2);
  const validName = "Test Subject";
  const validEmail = `${randomString}@cypress.com`;
  const validPassword = "123";

  it("Successful register", () => {
    cy.get("[id=nome]").type(validName);
    cy.get("[id=email]").type(validEmail);
    cy.get("[id=senha]").type(validPassword);
    cy.get("[id=confirmar-senha]").type(validPassword);
    cy.get("[id=register-button]").click();
    cy.document().should("contain.text", "Registro concluído com sucesso");
  });

  it("User inserted an already on use email", () => {
    cy.get("[id=nome]").type(validName);
    cy.get("[id=email]").type("cypress@testes.com");
    cy.get("[id=senha]").type(validPassword);
    cy.get("[id=confirmar-senha]").type(validPassword);
    cy.get("[id=register-button]").click();
    cy.document().should("contain.text", "O e-mail informado já está em uso!");
  });

  it("User inserted an invalid email", () => {
    cy.get("[class=form-control]").eq(0).type(validName);
    cy.get("[id=email]").type("xx");
    cy.get("[id=senha]").type(validPassword);
    cy.get("[id=confirmar-senha]").type(validPassword);
    cy.get("[id=register-button]").click();
    cy.document().should("contain.text", "Informe um e-mail válido.");
  });

  it("User didn't insert a name", () => {
    cy.get("[id=email]").type(validEmail);
    cy.get("[id=senha]").type(validPassword);
    cy.get("[id=confirmar-senha]").type(validPassword);
    cy.get("[id=register-button]").click();
    cy.document().should("contain.text", "Informe um nome.");
  });

  it("User didn't insert an email", () => {
    cy.get("[class=form-control]").eq(0).type(validName);
    cy.get("[id=senha]").type(validPassword);
    cy.get("[id=confirmar-senha]").type(validPassword);
    cy.get("[id=register-button]").click();
    cy.document().should("contain.text", "Informe um nome.");
  });

  it("User didn't insert a password", () => {
    cy.get("[class=form-control]").eq(0).type(validName);
    cy.get("[id=email]").type(validEmail);
    cy.get("[id=confirmar-senha]").type(validPassword);
    cy.get("[id=register-button]").click();
    cy.document().should("contain.text", "Informe uma senha.");
  });

  it("User didn't insert a password confirmation", () => {
    cy.get("[class=form-control]").eq(0).type(validName);
    cy.get("[id=email]").type(validEmail);
    cy.get("[id=senha]").type(validPassword);
    cy.get("[id=register-button]").click();
    cy.document().should("contain.text", "Repita a senha informada.");
  });

  it("User didn't insert a valid password confirmation", () => {
    cy.get("[class=form-control]").eq(0).type(validName);
    cy.get("[class=form-control]").eq(1).type(validEmail);
    cy.get("[id=senha]").type(validPassword);
    cy.get("[id=confirmar-senha]").type(randomString);
    cy.get("[id=register-button]").click();
    cy.document().should("contain.text", "As duas senhas devem ser iguais!");
  });
});
