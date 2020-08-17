describe('webp', () => {
  before(() => {
    cy.visit('/webp');
    cy.title().should('equal', 'webp');
  });

  it('url-auto', () => {
    cy.assertImage(
      'url-auto',
      { name: 'tree-original', maxSize: 1 },
      { format: 'webp', width: 1024, height: 772 },
      { type: 'url', mimeType: 'image/webp', width: 1024, height: 772 },
    );
  });

  it('url-force', () => {
    cy.assertImage(
      'url-force',
      { name: 'cat-original', maxSize: 0.8 },
      { format: 'webp', width: 100, height: 67 },
      { type: 'url', mimeType: 'image/webp', width: 100, height: 67 },
    );
  });

  it('url-force-original', () => {
    cy.assertImage(
      'url-force-original',
      { name: 'inline-auto', minSize: 1.2 },
      { format: 'webp', width: 100, height: 67 },
      { type: 'url', mimeType: 'image/webp', width: 100, height: 67 },
    );

    cy.assertImage(
      'url-force-original',
      { name: 'url-force', minSize: 1.05 },
      { format: 'webp', width: 100, height: 67 },
      { type: 'url', mimeType: 'image/webp', width: 100, height: 67 },
    );
  });

  it('inline-auto', () => {
    cy.assertImage(
      'inline-auto',
      { name: 'cat-original', maxSize: 0.8 },
      { format: 'webp', width: 100, height: 67 },
      { type: 'inline', mimeType: 'image/webp', width: 100, height: 67 },
    );
  });

  it('inline-force', () => {
    cy.assertImage(
      'inline-force',
      { name: 'tree-original', maxSize: 1.5 },
      { format: 'webp', width: 1024, height: 772 },
      { type: 'inline', mimeType: 'image/webp', width: 1024, height: 772 },
    );
  });

  it('inline-force-original', () => {
    cy.assertImage(
      'inline-force-original',
      { name: 'tree-original', minSize: 1.0 },
      { format: 'webp', width: 1024, height: 772 },
      { type: 'inline', mimeType: 'image/webp', width: 1024, height: 772 },
    );
  });

  it('resize-width', () => {
    cy.assertImage(
      'resize-width',
      undefined,
      { format: 'webp', width: 500, height: 377 },
      { type: 'url', mimeType: 'image/webp', width: 500, height: 377 },
    );
  });

  it('resize-height', () => {
    cy.assertImage(
      'resize-height',
      undefined,
      { format: 'webp', width: 398, height: 300 },
      { type: 'url', mimeType: 'image/webp', width: 398, height: 300 },
    );
  });

  it('resize-both', () => {
    cy.assertImage(
      'resize-both',
      undefined,
      { format: 'webp', width: 400, height: 400 },
      { type: 'url', mimeType: 'image/webp', width: 400, height: 400 },
    );
  });

  it('lqip', () => {
    cy.assertImage(
      'lqip',
      { name: 'tree-original', maxSize: 0.05 },
      { format: 'webp', width: 10, height: 8 },
      { type: 'inline', mimeType: 'image/webp', width: 10, height: 8 },
    );
  });

  it('lqip-url', () => {
    cy.assertImage(
      'lqip-url',
      { name: 'tree-original', maxSize: 0.05 },
      { format: 'webp', width: 10, height: 8 },
      { type: 'url', mimeType: 'image/webp', width: 10, height: 8 },
    );
  });

  it('colors', () => {
    cy.assertColors(
      'colors',
      ['#5698c2', '#cddad7', '#666744', '#1b2021', '#94dcfa'],
      ['86, 152, 194', '205, 218, 215', '102, 103, 68', '27, 32, 33', '148, 220, 250'],
    );
  });

  it('tree-original', () => {
    cy.assertImage(
      'tree-original',
      { name: 'tree-original', maxSize: 1, minSize: 1 },
      { format: 'webp', width: 1024, height: 772 },
      { type: 'url', mimeType: 'image/webp', width: 1024, height: 772 },
    );
  });

  it('cat-original', () => {
    cy.assertImage(
      'cat-original',
      { name: 'cat-original', maxSize: 1, minSize: 1 },
      { format: 'webp', width: 100, height: 67 },
      { type: 'inline', mimeType: 'image/webp', width: 100, height: 67 },
    );
  });
});
