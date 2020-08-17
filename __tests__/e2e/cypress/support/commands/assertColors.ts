Cypress.Commands.add('assertColors', (name: string, hexColors: string[], rgbColors: string[]) => {
  cy.assertImage(name, undefined, hexColors);

  cy.get(`[data-name="${name}"] .wrapper > div`).should('have.length', rgbColors.length);
  cy.get(`[data-name="${name}"] .wrapper > div`).should('have.length', hexColors.length);

  for (let i = 0; i < rgbColors.length; i += 1) {
    cy.get(`[data-name="${name}"] .wrapper > div`)
      .eq(i)
      .should('have.css', 'background-color')
      .should('equal', `rgb(${rgbColors[i]})`);
  }
});
