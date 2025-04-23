describe('RegisterComponent', () => {

    beforeEach(() => {
        // Visit the registration page before each test
        cy.visit('/auth/register');
        cy.location('pathname', { timeout: 10000 }).should('include', 'auth/register');
    });

    it('Should not register if email address is invalid', () => {
        // Check if the email input is present and type into it
        cy.get('[formControlName="email"]', { timeout: 10000 }).should('be.visible').type('geenAtSign');
        cy.get('[formControlName="password"]').should('be.visible').type('TestLangGenoegWachtwoord1!');
        cy.get('button[type="submit"]').should('be.disabled');
    });

    it('Should not register if password is too short', () => {
        // Check if the email and password inputs are present and type into them
        cy.get('[formControlName="email"]', { timeout: 10000 }).should('be.visible').type('test@test.com');
        cy.get('[formControlName="password"]').should('be.visible').type('test');
        cy.get('button[type="submit"]').should('be.disabled');
    });

    it('Should not register if invalid but validated credentials are provided', () => {
        // Intercept the register request with a failure response
        cy.intercept('POST', '**/auth/register', {
            statusCode: 400,
            body: { error: 'Registration failed' }
        }).as('registerRequest');

        // Check if the email and password inputs are present and type into them
        cy.get('[formControlName="email"]', { timeout: 10000 }).should('be.visible').type('test@account');
        cy.get('[formControlName="password"]').should('be.visible').type('TestLangGenoeg1!');
        cy.get('button[type="submit"]').click();

        // Wait for the intercepted request
        cy.wait('@registerRequest');

        // Ensure the URL does not change to 'home'
        cy.location('pathname').should('include', 'auth/register');

        // Check for the error message
        cy.get('.login-error').should('be.visible').and('contain', 'Register failed. Please check your credentials and try again.');
    });

    it('Should register when valid and validated credentials are provided', () => {
        // Intercept the register request with a success response
        cy.intercept('POST', '**/auth/register', { fixtures: 'registerSuccess.json' }).as('registerRequest');

        // Check if the email and password inputs are present and type into them
        cy.get('[formControlName="email"]', { timeout: 10000 }).should('be.visible').type('test1@account.com');
        cy.get('[formControlName="password"]').should('be.visible').type('TestLangGenoeg1!');
        cy.get('button[type="submit"]').click();

        // Wait for the intercepted request
        cy.wait('@registerRequest');

        // Check if the home URL and header are correct
        cy.location('pathname', { timeout: 10000 }).should('include', 'home');
        cy.get('h1').should('contain', 'Welcome to Luxury Products');
    });
});
