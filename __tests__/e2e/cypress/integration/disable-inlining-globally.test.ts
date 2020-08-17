describe('disable-inlining-globally', () => {
  before(() => {
    cy.visit('/disable-inlining-globally');
    cy.title().should('equal', 'disable-inlining-globally');
  });

  it('url-auto-jpeg', () => {
    cy.assertImage(
      'url-auto-jpeg',
      undefined,
      { format: 'jpeg', width: 100, height: 67 },
      { type: 'url', mimeType: 'image/jpeg', width: 100, height: 67 },
    );
  });

  it('inline-force-jpeg', () => {
    cy.assertImage(
      'inline-force-jpeg',
      undefined,
      { format: 'jpeg', width: 100, height: 67 },
      { type: 'inline', mimeType: 'image/jpeg', width: 100, height: 67 },
    );
  });

  it('url-auto-png', () => {
    cy.assertImage(
      'url-auto-png',
      undefined,
      { format: 'png', width: 50, height: 50 },
      { type: 'url', mimeType: 'image/png', width: 50, height: 50 },
    );
  });

  it('inline-force-png', () => {
    cy.assertImage(
      'inline-force-png',
      undefined,
      { format: 'png', width: 50, height: 50 },
      { type: 'inline', mimeType: 'image/png', width: 50, height: 50 },
    );
  });

  it('url-auto-gif', () => {
    cy.assertImage(
      'url-auto-gif',
      undefined,
      { format: 'gif', width: 20, height: 20 },
      { type: 'url', mimeType: 'image/gif', width: 20, height: 20 },
    );
  });

  it('inline-force-gif', () => {
    cy.assertImage(
      'inline-force-gif',
      undefined,
      { format: 'gif', width: 20, height: 20 },
      { type: 'inline', mimeType: 'image/gif', width: 20, height: 20 },
    );
  });

  it('url-auto-svg', () => {
    cy.assertImage('url-auto-svg', undefined, { format: 'svg' }, { type: 'url', mimeType: 'image/svg+xml' });
  });

  it('inline-force-svg', () => {
    cy.assertImage('inline-force-svg', undefined, { format: 'svg' }, { type: 'inline', mimeType: 'image/svg+xml' });
  });

  it('url-auto-webp', () => {
    cy.assertImage(
      'url-auto-webp',
      undefined,
      { format: 'webp', width: 100, height: 67 },
      { type: 'url', mimeType: 'image/webp', width: 100, height: 67 },
    );
  });

  it('inline-force-webp', () => {
    cy.assertImage(
      'inline-force-webp',
      undefined,
      { format: 'webp', width: 100, height: 67 },
      { type: 'inline', mimeType: 'image/webp', width: 100, height: 67 },
    );
  });
});
