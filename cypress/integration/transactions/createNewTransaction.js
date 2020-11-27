describe("Create a new transaction", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("[id=user-email]").type("cypress@testes.com");
    cy.get("[id=user-password]").type("123");
    cy.get("[id=login-button]").click();
    cy.get("[class=nav-link]").contains("Criar").click();
  });

  const randomAmount = () => Math.floor(100000 + Math.random() * 900000);
  const randomText = () => Math.random().toString(36).slice(2);

  it("Successfully create a new transaction (in)", () => {
    const amount = randomAmount();
    const text = randomText();

    cy.get("[id=valor]").type(amount);
    cy.get("[id=entrada]").check();
    cy.get("select").select("Salário");
    cy.get("[id=descricao]").type(text);
    cy.get("[id=create-button]").click();
    cy.document().should("contain.text", amount);
    cy.document().should("contain.text", "SALARIO");
    cy.document().should("contain.text", text);
  });

  it("Successfully create a new transaction (out)", () => {
    const amount = randomAmount();
    const text = randomText();

    cy.get("[id=valor]").type(amount);
    cy.get("[id=saida]").check();
    cy.get("select").select("Alimentação");
    cy.get("[id=descricao]").type(text);
    cy.get("[id=create-button]").click();
    cy.document().should("contain.text", amount);
    cy.document().should("contain.text", "ALIMENTACAO");
    cy.document().should("contain.text", text);
  });

  it("User didn't input an amount", () => {
    const text = randomText();

    cy.get("[id=entrada]").check();
    cy.get("select").select("Salário");
    cy.get("[id=descricao]").type(text);
    cy.get("[id=create-button]").click();
    cy.document().should(
      "contain.text",
      "Preencha todos os campos para continuar!"
    );
  });

  it("User didn't input a description", () => {
    const amount = randomAmount();

    cy.get("[id=valor]").type(amount);
    cy.get("[id=entrada]").check();
    cy.get("select").select("Salário");
    cy.get("[id=create-button]").click();
    cy.document().should(
      "contain.text",
      "Preencha todos os campos para continuar!"
    );
  });

  it("User didn't input a valid amount", () => {
    const text = randomText();

    cy.get("[id=valor]").type("abc");
    cy.get("[id=entrada]").check();
    cy.get("select").select("Salário");
    cy.get("[id=descricao]").type(text);
    cy.get("[id=create-button]").click();
    cy.document().should(
      "contain.text",
      "Preencha todos os campos para continuar!"
    );
  });
});
