describe('disable-optimization-globally', () => {
  before(() => {
    cy.visit('/disable-optimization-globally');
    cy.title().should('equal', 'disable-optimization-globally');
  });

  it('original-jpeg', () => {
    cy.assertImage(
      'original-jpeg',
      { name: 'original-force-jpeg', maxSize: 1, minSize: 1 },
      { format: 'jpeg', width: 640, height: 800 },
      { type: 'url', mimeType: 'image/jpeg', width: 640, height: 800 },
    );
  });

  it('original-png', () => {
    cy.assertImage(
      'original-png',
      { name: 'original-force-png', maxSize: 1, minSize: 1 },
      { format: 'png', width: 750, height: 535 },
      { type: 'url', mimeType: 'image/png', width: 750, height: 535 },
    );
  });

  it('original-gif', () => {
    cy.assertImage(
      'original-gif',
      { name: 'original-force-gif', maxSize: 1, minSize: 1 },
      { format: 'gif', width: 176, height: 208 },
      { type: 'url', mimeType: 'image/gif', width: 176, height: 208 },
    );
  });

  it('original-svg', () => {
    cy.assertImage(
      'original-svg',
      { name: 'original-force-svg', maxSize: 1, minSize: 1 },
      { format: 'svg' },
      { type: 'url', mimeType: 'image/svg+xml' },
    );
  });

  it('original-webp', () => {
    cy.assertImage(
      'original-webp',
      { name: 'original-force-webp', maxSize: 1, minSize: 1 },
      { format: 'webp', width: 1024, height: 772 },
      { type: 'url', mimeType: 'image/webp', width: 1024, height: 772 },
    );
  });
});
