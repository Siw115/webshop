describe('LoginComponent', () => {

  beforeEach(() => {
    cy.visit('/auth/login');
    cy.url().should('include', 'auth/login');
  });

  it('Should not login if email address is invalid', () => {
    cy.get('[formControlName="email"]', { timeout: 10000 }).should('be.visible').type('geenAtSign');
    cy.get('[formControlName="password"]').should('be.visible').type('TestLangGenoegWachtwoord1!');
    cy.get('button[type="submit"]').should('be.disabled');
  });

  it('Should not login if password is too short', () => {
    cy.get('[formControlName="email"]', { timeout: 10000 }).should('be.visible').type('test@test.com');
    cy.get('[formControlName="password"]').should('be.visible').type('test');
    cy.get('button[type="submit"]').should('be.disabled');
  });

  it('Should not login if invalid but validated credentials are provided', () => {
    cy.intercept('POST', 'http://localhost:8080/api/login', { fixtures: 'loginFailed.json' });

    cy.get('[formControlName="email"]', { timeout: 10000 }).should('be.visible').type('testq@account.com');
    cy.get('[formControlName="password"]').should('be.visible').type('TestLangGenoeg1!');
    cy.get('button[type="submit"]').click();

    cy.wait(500);
    cy.url().should('not.include', 'home');
  });

  it('Should login when valid and validated credentials are provided', () => {
    cy.intercept('POST', 'http://localhost:8080/api/login', { fixtures: 'loginSuccess.json' });

    cy.get('[formControlName="email"]', { timeout: 10000 }).should('be.visible').type('test@account.com');
    cy.get('[formControlName="password"]').should('be.visible').type('TestLangGenoegWachtwoord1!');
    cy.get('button[type="submit"]').click();

    cy.wait(500);

    // Increase the timeout for the URL assertion
    cy.url({ timeout: 10000 }).should('include', 'home');
    cy.get('h1').should('contain', 'Welcome to Luxury Products');
  });
});
