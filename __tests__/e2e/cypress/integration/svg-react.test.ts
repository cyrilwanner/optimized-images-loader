describe('svg-react', () => {
  before(() => {
    cy.visit('/svg-react');
    cy.title().should('equal', 'svg-react');
  });

  it('include', () => {
    cy.get('[data-name="include"] .wrapper > svg').should('be.visible').scrollIntoView();
    cy.get('[data-name="include"] .wrapper > svg').should('have.class', 'rendered-by-react');
    cy.get('[data-name="include"] .wrapper')
      .invoke('html')
      .then((str) => {
        expect(str).to.contain('<svg');
        expect(str).to.contain('<path');
        expect(str).to.contain('<stop');
      });
  });

  it('include-original', () => {
    cy.get('[data-name="include-original"] .wrapper > svg').should('be.visible').scrollIntoView();
    cy.get('[data-name="include-original"] .wrapper > svg').should('have.class', 'rendered-by-react');
    cy.get('[data-name="include-original"] .wrapper')
      .invoke('html')
      .then((str) => {
        expect(str).to.contain('<svg');
        expect(str).to.contain('<path');
        expect(str).to.contain('<stop');

        cy.get('[data-name="include"] .wrapper')
          .invoke('html')
          .then((optimizedStr) => {
            expect(str.length).to.be.gte(optimizedStr.length * 1.05);
          });
      });
  });
});
