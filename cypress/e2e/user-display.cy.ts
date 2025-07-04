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

  it('displays correct page title and static content', () => {
    cy.window().then((win) => {
      (win as any).PLAYWRIGHT = true;
    });

    cy.visit('/');

    // Verify page title
    cy.get('h1').contains('MSW + Playwright Demo').should('be.visible');
    
    // Verify static content
    cy.contains('This is a demo application with MSW').should('be.visible');
    cy.contains('Mock Service Worker').should('be.visible');
    cy.contains('Playwright testing').should('be.visible');
  });
}); 