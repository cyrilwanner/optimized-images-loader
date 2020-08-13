describe('jpeg', () => {
  before(() => {
    cy.visit('/jpeg');
    cy.title().should('equal', 'jpeg');
  });

  it('url-auto', () => {
    cy.assertImage(
      'url-auto',
      { name: 'forest-original', maxSize: 0.8 },
      { format: 'jpeg', width: 640, height: 800 },
      { type: 'url', mimeType: 'image/jpeg', width: 640, height: 800 },
    );
  });

  it('url-force', () => {
    cy.assertImage(
      'url-force',
      { name: 'cat-original', maxSize: 0.8 },
      { format: 'jpeg', width: 100, height: 67 },
      { type: 'url', mimeType: 'image/jpeg', width: 100, height: 67 },
    );
  });

  it('url-force-original', () => {
    cy.assertImage(
      'url-force-original',
      { name: 'inline-auto', minSize: 1.2 },
      { format: 'jpeg', width: 100, height: 67 },
      { type: 'url', mimeType: 'image/jpeg', width: 100, height: 67 },
    );
  });

  it('inline-auto', () => {
    cy.assertImage(
      'inline-auto',
      { name: 'cat-original', maxSize: 0.8 },
      { format: 'jpeg', width: 100, height: 67 },
      { type: 'inline', mimeType: 'image/jpeg', width: 100, height: 67 },
    );
  });

  it('inline-force', () => {
    cy.assertImage(
      'inline-force',
      { name: 'forest-original', maxSize: 0.8 },
      { format: 'jpeg', width: 640, height: 800 },
      { type: 'inline', mimeType: 'image/jpeg', width: 640, height: 800 },
    );
  });

  it('inline-force-original', () => {
    cy.assertImage(
      'inline-force-original',
      { name: 'forest-original', minSize: 1.0 },
      { format: 'jpeg', width: 640, height: 800 },
      { type: 'inline', mimeType: 'image/jpeg', width: 640, height: 800 },
    );
  });

  it('to-webp', () => {
    cy.assertImage(
      'to-webp',
      { name: 'forest-original', maxSize: 0.8 },
      { format: 'webp', width: 640, height: 800 },
      { type: 'url', mimeType: 'image/webp', width: 640, height: 800 },
    );
  });

  it('resize-width', () => {
    cy.assertImage(
      'resize-width',
      undefined,
      { format: 'jpeg', width: 500, height: 625 },
      { type: 'url', mimeType: 'image/jpeg', width: 500, height: 625 },
    );
  });

  it('resize-height', () => {
    cy.assertImage(
      'resize-height',
      undefined,
      { format: 'jpeg', width: 240, height: 300 },
      { type: 'url', mimeType: 'image/jpeg', width: 240, height: 300 },
    );
  });

  it('resize-both', () => {
    cy.assertImage(
      'resize-both',
      undefined,
      { format: 'jpeg', width: 400, height: 400 },
      { type: 'url', mimeType: 'image/jpeg', width: 400, height: 400 },
    );
  });

  it('lqip', () => {
    cy.assertImage(
      'lqip',
      { name: 'forest-original', maxSize: 0.05 },
      { format: 'jpeg', width: 8, height: 10 },
      { type: 'inline', mimeType: 'image/jpeg', width: 8, height: 10 },
    );
  });

  it('lqip-url', () => {
    cy.assertImage(
      'lqip-url',
      { name: 'forest-original', maxSize: 0.05 },
      { format: 'jpeg', width: 8, height: 10 },
      { type: 'url', mimeType: 'image/jpeg', width: 8, height: 10 },
    );
  });

  it('colors', () => {
    cy.assertImage('colors', undefined, ['#292913', '#72674f', '#bbb695', '#909e6a', '#8f888f']);

    cy.get('[data-name="colors"] .wrapper > div').should('have.length', 5);
    cy.get('[data-name="colors"] .wrapper > div')
      .eq(0)
      .should('have.css', 'background-color')
      .should('equal', 'rgb(41, 41, 19)');
    cy.get('[data-name="colors"] .wrapper > div')
      .eq(1)
      .should('have.css', 'background-color')
      .should('equal', 'rgb(114, 103, 79)');
    cy.get('[data-name="colors"] .wrapper > div')
      .eq(2)
      .should('have.css', 'background-color')
      .should('equal', 'rgb(187, 182, 149)');
    cy.get('[data-name="colors"] .wrapper > div')
      .eq(3)
      .should('have.css', 'background-color')
      .should('equal', 'rgb(144, 158, 106)');
    cy.get('[data-name="colors"] .wrapper > div')
      .eq(4)
      .should('have.css', 'background-color')
      .should('equal', 'rgb(143, 136, 143)');
  });

  it('multiple', () => {
    cy.assertImage(
      'multiple',
      { name: 'forest-original', maxSize: 0.5 },
      { format: 'webp', width: 300, height: 375 },
      { type: 'url', mimeType: 'image/webp', width: 300, height: 375 },
    );
  });

  it('forest-original', () => {
    cy.assertImage(
      'forest-original',
      { name: 'forest-original', maxSize: 1, minSize: 1 },
      { format: 'jpeg', width: 640, height: 800 },
      { type: 'url', mimeType: 'image/jpeg', width: 640, height: 800 },
    );
  });

  it('cat-original', () => {
    cy.assertImage(
      'cat-original',
      { name: 'cat-original', maxSize: 1, minSize: 1 },
      { format: 'jpeg', width: 100, height: 67 },
      { type: 'inline', mimeType: 'image/jpeg', width: 100, height: 67 },
    );
  });
});
