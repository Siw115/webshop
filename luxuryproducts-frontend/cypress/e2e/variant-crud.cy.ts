describe('Variant CRUD Operations', () => {
    beforeEach(() => {
        // Visit the variants list page before each test
        cy.visit('/dashboard/variants');
        cy.url().should('include', 'dashboard/variants');
    });

    it('Should display a list of variants', () => {
        // Increase timeout and check if the table rows are present
        cy.get('tbody tr', { timeout: 10000 }).should('have.length.greaterThan', 0);
    });

    it('Should create a new variant', () => {
        // Intercept the API call for creating a variant
        cy.intercept('POST', '**/variant', { statusCode: 201, fixture: 'variant.json' }).as('createVariant');

        // Visit the new variant page
        cy.visit('/variants/new');

        // Fill in the form
        cy.get('[formControlName="color"]').type('Green');
        cy.get('[formControlName="size"]').type('L');
        cy.get('[formControlName="additionalPrice"]').type('20');
        cy.get('[formControlName="stock"]').type('50');
        cy.get('[formControlName="productId"]').type('2');

        // Submit the form
        cy.get('button[type="submit"]').click();

        // Wait for the API call to complete
        cy.wait('@createVariant');

        // Verify that the user is redirected to the variant list page
        cy.url().should('include', '/dashboard/variants');
    });

    it('Should update an existing variant', () => {
        // Intercept the API call for fetching and updating a variant
        cy.intercept('GET', '**/variant/1', { fixture: 'variant.json' }).as('getVariant');
        cy.intercept('PUT', '**/variant/1', { statusCode: 200, fixture: 'variant.json' }).as('updateVariant');

        // Visit the edit variant page
        cy.visit('/variants/1/edit');

        // Wait for the API call to complete
        cy.wait('@getVariant');

        // Update the form
        cy.get('[formControlName="color"]').clear().type('Blue');
        cy.get('[formControlName="size"]').clear().type('XL');
        cy.get('[formControlName="additionalPrice"]').clear().type('25');
        cy.get('[formControlName="stock"]').clear().type('60');
        cy.get('[formControlName="productId"]').clear().type('3');

        // Submit the form
        cy.get('button[type="submit"]').click();

        // Wait for the API call to complete
        cy.wait('@updateVariant');

        // Verify that the user is redirected to the variant list page
        cy.url().should('include', '/dashboard/variants');
    });

    it('Should delete an existing variant', () => {
        // Intercept the DELETE request for deleting a variant
        cy.intercept('DELETE', '**/variant/1', { statusCode: 200 });

        // Click on the 'Delete' button for the first variant
        cy.get('button').contains('Delete').first().click();

        // Confirm the deletion
        cy.on('window:confirm', () => true);

        // Verify that the variant is removed from the list
        cy.get('tbody').should('not.contain', 'td', 'Green');
    });
});
