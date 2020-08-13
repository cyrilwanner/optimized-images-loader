describe('gif', () => {
  before(() => {
    cy.visit('/gif');
    cy.title().should('equal', 'gif');
  });

  it('url-auto', () => {
    cy.assertImage(
      'url-auto',
      { name: 'countdown-original', maxSize: 0.8 },
      { format: 'gif', width: 176, height: 208 },
      { type: 'url', mimeType: 'image/gif', width: 176, height: 208 },
    );
  });

  it('url-force', () => {
    cy.assertImage(
      'url-force',
      { name: 'robot-original', maxSize: 0.8 },
      { format: 'gif', width: 20, height: 20 },
      { type: 'url', mimeType: 'image/gif', width: 20, height: 20 },
    );
  });

  it('url-force-original', () => {
    cy.assertImage(
      'url-force-original',
      { name: 'inline-auto', minSize: 0.9, maxSize: 1.1 },
      { format: 'gif', width: 20, height: 20 },
      { type: 'url', mimeType: 'image/gif', width: 20, height: 20 },
    );
  });

  it('inline-auto', () => {
    cy.assertImage(
      'inline-auto',
      { name: 'robot-original', maxSize: 0.85 },
      { format: 'gif', width: 20, height: 20 },
      { type: 'inline', mimeType: 'image/gif', width: 20, height: 20 },
    );
  });

  it('inline-force', () => {
    cy.assertImage(
      'inline-force',
      { name: 'countdown-original', maxSize: 0.9 },
      { format: 'gif', width: 176, height: 208 },
      { type: 'inline', mimeType: 'image/gif', width: 176, height: 208 },
    );
  });

  it('inline-force-original', () => {
    cy.assertImage(
      'inline-force-original',
      { name: 'countdown-original', minSize: 1.0 },
      { format: 'gif', width: 176, height: 208 },
      { type: 'inline', mimeType: 'image/gif', width: 176, height: 208 },
    );
  });

  it('resize-width', () => {
    cy.assertImage(
      'resize-width',
      undefined,
      { format: 'gif', width: 150, height: 177 },
      { type: 'url', mimeType: 'image/gif', width: 150, height: 177 },
    );
  });

  it('resize-height', () => {
    cy.assertImage(
      'resize-height',
      undefined,
      { format: 'gif', width: 63, height: 75 },
      { type: 'url', mimeType: 'image/gif', width: 63, height: 75 },
    );
  });

  it('resize-both', () => {
    cy.assertImage(
      'resize-both',
      undefined,
      { format: 'gif', width: 125, height: 125 },
      { type: 'url', mimeType: 'image/gif', width: 125, height: 125 },
    );
  });

  it('lqip', () => {
    cy.assertImage(
      'lqip',
      { name: 'countdown-original', maxSize: 0.05 },
      { format: 'gif', width: 8, height: 10 },
      { type: 'inline', mimeType: 'image/gif', width: 8, height: 10 },
    );
  });

  it('lqip-url', () => {
    cy.assertImage(
      'lqip-url',
      { name: 'countdown-original', maxSize: 0.05 },
      { format: 'gif', width: 8, height: 10 },
      { type: 'url', mimeType: 'image/gif', width: 8, height: 10 },
    );
  });

  it('colors', () => {
    cy.assertImage('colors', undefined, ['#323232', '#c4c4c4', '#6c6c6c', '#8c8c8c', '#848484']);

    cy.get('[data-name="colors"] .wrapper > div').should('have.length', 5);
    cy.get('[data-name="colors"] .wrapper > div')
      .eq(0)
      .should('have.css', 'background-color')
      .should('equal', 'rgb(50, 50, 50)');
    cy.get('[data-name="colors"] .wrapper > div')
      .eq(1)
      .should('have.css', 'background-color')
      .should('equal', 'rgb(196, 196, 196)');
    cy.get('[data-name="colors"] .wrapper > div')
      .eq(2)
      .should('have.css', 'background-color')
      .should('equal', 'rgb(108, 108, 108)');
    cy.get('[data-name="colors"] .wrapper > div')
      .eq(3)
      .should('have.css', 'background-color')
      .should('equal', 'rgb(140, 140, 140)');
    cy.get('[data-name="colors"] .wrapper > div')
      .eq(4)
      .should('have.css', 'background-color')
      .should('equal', 'rgb(132, 132, 132)');
  });

  it('countdown-original', () => {
    cy.assertImage(
      'countdown-original',
      { name: 'countdown-original', maxSize: 1, minSize: 1 },
      { format: 'gif', width: 176, height: 208 },
      { type: 'url', mimeType: 'image/gif', width: 176, height: 208 },
    );
  });

  it('robot-original', () => {
    cy.assertImage(
      'robot-original',
      { name: 'robot-original', maxSize: 1, minSize: 1 },
      { format: 'gif', width: 20, height: 20 },
      { type: 'inline', mimeType: 'image/gif', width: 20, height: 20 },
    );
  });
});
