describe("Create a new transaction", () => {
  beforeEach(() => {
    cy.visit("https://frontend-sa.netlify.app");
    cy.get("[class=form-control]").eq(0).type("testes@cypress.com");
    cy.get("[class=form-control]").eq(1).type("123");
    cy.get("[id='login-button']").click();
    cy.get("[class='nav-link']").contains("Criar").click();
  });

  const randomAmount = () => Math.floor(100000 + Math.random() * 900000);
  const randomText = () => Math.random().toString(36).slice(2);

  it("Successfully created a new transaction (in)", () => {
    const amount = randomAmount();
    const text = randomText();

    cy.get("[id='transaction']").type(amount);
    cy.get("[id='entrada']").check();
    cy.get("select").select("Salário");
    cy.get("textarea").type(text);
    cy.get("[type='submit']").click();
    cy.document().should("contain.text", amount);
    cy.document().should("contain.text", "SALARIO");
    cy.document().should("contain.text", text);
    cy.document().should("contain.text", "IN");
  });

  it("Successfully created a new transaction (out)", () => {
    const amount = randomAmount();
    const text = randomText();

    cy.get("[id='transaction']").type(amount);
    cy.get("[id='saida']").check();
    cy.get("select").select("Comida");
    cy.get("textarea").type(text);
    cy.get("[type='submit']").click();
    cy.document().should("contain.text", amount);
    cy.document().should("contain.text", "COMIDA");
    cy.document().should("contain.text", text);
    cy.document().should("contain.text", "OUT");
  });

  it("User didn't input an amount", () => {
    const text = randomText();

    cy.get("[id='entrada']").check();
    cy.get("select").select("Salário");
    cy.get("textarea").type(text);
    cy.get("[type='submit']").click();
    cy.document().should(
      "contain.text",
      "Preencha todos os campos para continuar!"
    );
  });

  it("User didn't input a description", () => {
    const amount = randomAmount();

    cy.get("[id='transaction']").type(amount);
    cy.get("[id='entrada']").check();
    cy.get("select").select("Salário");
    cy.get("[type='submit']").click();
    cy.document().should(
      "contain.text",
      "Preencha todos os campos para continuar!"
    );
  });

  it("User didn't input a valid amount", () => {
    const text = randomText();

    cy.get("[id='transaction']").type("abc");
    cy.get("[id='entrada']").check();
    cy.get("select").select("Salário");
    cy.get("textarea").type(text);
    cy.get("[type='submit']").click();
    cy.document().should("contain.text", "Please enter a number");
  });
});
