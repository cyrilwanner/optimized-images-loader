describe('jpeg', () => {
  beforeEach(() => {
    cy.visit('/jpeg');
  });

  it('works', () => {
    cy.visit('/jpeg');
    cy.get('[data-name="url-auto"]').should('be.visible');
  });
});
