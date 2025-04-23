describe('Product Ordering and Cart Functionality', () => {
    beforeEach(() => {
        // Perform login
        cy.visit('/auth/login');
        cy.get('[formControlName="email"]').type('test@account.com'); // Use a valid test user
        cy.get('[formControlName="password"]').type('TestLangGenoegWachtwoord1!'); // Use a valid password
        cy.get('button[type="submit"]').click();

        // Verify successful login by checking the URL or a specific element
        cy.url().should('include', '/home'); // Adjust the URL based on your app's routing after login

        // Visit the products page before each test
        cy.visit('/products');
        cy.url().should('include', '/products');
    });

    it('Should add a product to the cart, display the correct details in the cart, fill in address if necessary, and place an order', () => {
        // Add a product to the cart
        cy.get('app-product-thumbnail').first().within(() => {
            cy.get('select').select(1); // Select the first variant
            cy.get('button').contains('Add to cart').click();
        });

        // Verify the notification and navigate to the cart
        cy.get('.alert-success.notification', { timeout: 10000 }).should('be.visible').within(() => {
            cy.contains('Product added to cart!');
            cy.get('button.view-cart-btn').click();
        });

        // Verify the product is in the cart
        cy.url().should('include', '/cart');
        cy.get('h3').should('contain', 'Checkout');

        // Ensure that the product details are correctly displayed in the cart
        cy.get('div[style*="display: flex; align-items: center;"]').within(() => {
            cy.get('strong').first().should('contain', 'Patek Philippe Grandmaster Chime');
        });

        // Check if the address form is present and fill it out
        cy.get('body').then(($body) => {
            if ($body.find('app-new-address').length > 0) {
                cy.get('app-new-address', { timeout: 10000 }).within(() => {
                    cy.get('[formControlName="street"]').type('123 Main St');
                    cy.get('[formControlName="city"]').type('Test City');
                    cy.get('[formControlName="state"]').type('Test State');
                    cy.get('[formControlName="postalCode"]').type('12345');
                    cy.get('[formControlName="country"]').select('Netherlands');
                    cy.get('button[type="submit"]').click();
                });
            }
        });

        // Ensure the checkout button is available and click it
        cy.get('.btn-success', { timeout: 10000 }).should('be.visible').click(); // Click the checkout button

    });
});
