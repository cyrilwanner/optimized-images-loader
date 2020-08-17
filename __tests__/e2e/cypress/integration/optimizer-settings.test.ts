describe('optimizer-settings', () => {
  before(() => {
    cy.visit('/optimizer-settings');
    cy.title().should('equal', 'optimizer-settings');
  });

  it('oxipng', () => {
    cy.assertImage(
      'dragon',
      { name: 'dragon', className: 'normal-version', minSize: 1.1 },
      { format: 'png', width: 750, height: 535 },
      { type: 'url', mimeType: 'image/png', width: 750, height: 535 },
    );
  });

  it('svgo', () => {
    cy.assertImage(
      'banana',
      { name: 'banana', className: 'normal-version', minSize: 1.01 },
      { format: 'svg' },
      { type: 'url', mimeType: 'image/svg+xml' },
    );
  });

  it('mozjpeg', () => {
    cy.assertImage(
      'forest',
      { name: 'forest', className: 'normal-version', maxSize: 0.2 },
      { format: 'jpeg', width: 640, height: 800 },
      { type: 'url', mimeType: 'image/jpeg', width: 640, height: 800 },
    );
  });

  it('gifsicle', () => {
    cy.assertImage(
      'space',
      { name: 'space', className: 'normal-version', maxSize: 0.7 },
      { format: 'gif', width: 200, height: 150 },
      { type: 'url', mimeType: 'image/gif', width: 200, height: 150 },
    );
  });

  it('webp', () => {
    cy.assertImage(
      'tree',
      { name: 'tree', className: 'normal-version', maxSize: 0.5 },
      { format: 'webp', width: 1024, height: 772 },
      { type: 'url', mimeType: 'image/webp', width: 1024, height: 772 },
    );
  });
});
