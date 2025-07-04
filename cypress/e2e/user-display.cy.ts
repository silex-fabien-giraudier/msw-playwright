describe('User Display', () => {
  it('displays user data from mocked API', () => {
    cy.window().then((win) => {
      (win as any).PLAYWRIGHT = true; // Enable MSW mocks for Cypress too
    });

    cy.visit('/');

    // Wait for loading to disappear
    cy.contains('Loading user data...').should('not.exist');

    // Verify user data is displayed
    cy.contains('Alice').should('be.visible');
    cy.contains('admin').should('be.visible');
    
    // Verify UI elements are present
    cy.get('h2').contains('User Information').should('be.visible');
    cy.contains('Name:').should('be.visible');
    cy.contains('Role:').should('be.visible');
  });
}); 