describe('png', () => {
  before(() => {
    cy.visit('/png');
    cy.title().should('equal', 'png');
  });

  it('url-auto', () => {
    cy.assertImage(
      'url-auto',
      { name: 'dragon-original', maxSize: 0.8 },
      { format: 'png', width: 750, height: 535 },
      { type: 'url', mimeType: 'image/png', width: 750, height: 535 },
    );
  });

  it('url-force', () => {
    cy.assertImage(
      'url-force',
      { name: 'emoji-original', maxSize: 0.8 },
      { format: 'png', width: 50, height: 50 },
      { type: 'url', mimeType: 'image/png', width: 50, height: 50 },
    );
  });

  it('url-force-original', () => {
    cy.assertImage(
      'url-force-original',
      { name: 'inline-auto', minSize: 0.95, maxSize: 1.05 },
      { format: 'png', width: 50, height: 50 },
      { type: 'url', mimeType: 'image/png', width: 50, height: 50 },
    );

    cy.assertImage(
      'url-force-original',
      { name: 'url-force', minSize: 1.05 },
      { format: 'png', width: 50, height: 50 },
      { type: 'url', mimeType: 'image/png', width: 50, height: 50 },
    );
  });

  it('inline-auto', () => {
    cy.assertImage(
      'inline-auto',
      { name: 'emoji-original', maxSize: 0.8 },
      { format: 'png', width: 50, height: 50 },
      { type: 'inline', mimeType: 'image/png', width: 50, height: 50 },
    );
  });

  it('inline-force', () => {
    cy.assertImage(
      'inline-force',
      { name: 'dragon-original' },
      { format: 'png', width: 750, height: 535 },
      { type: 'inline', mimeType: 'image/png', width: 750, height: 535 },
    );
  });

  it('inline-force-original', () => {
    cy.assertImage(
      'inline-force-original',
      { name: 'dragon-original', minSize: 1.0 },
      { format: 'png', width: 750, height: 535 },
      { type: 'inline', mimeType: 'image/png', width: 750, height: 535 },
    );

    cy.assertImage(
      'inline-force-original',
      { name: 'inline-force', minSize: 1.05 },
      { format: 'png', width: 750, height: 535 },
      { type: 'inline', mimeType: 'image/png', width: 750, height: 535 },
    );
  });

  it('to-webp', () => {
    cy.assertImage(
      'to-webp',
      { name: 'dragon-original', maxSize: 0.8 },
      { format: 'webp', width: 750, height: 535 },
      { type: 'url', mimeType: 'image/webp', width: 750, height: 535 },
    );
  });

  it('resize-width', () => {
    cy.assertImage(
      'resize-width',
      undefined,
      { format: 'png', width: 500, height: 357 },
      { type: 'url', mimeType: 'image/png', width: 500, height: 357 },
    );
  });

  it('resize-height', () => {
    cy.assertImage(
      'resize-height',
      undefined,
      { format: 'png', width: 421, height: 300 },
      { type: 'url', mimeType: 'image/png', width: 421, height: 300 },
    );
  });

  it('resize-both', () => {
    cy.assertImage(
      'resize-both',
      undefined,
      { format: 'png', width: 400, height: 400 },
      { type: 'url', mimeType: 'image/png', width: 400, height: 400 },
    );
  });

  it('lqip', () => {
    cy.assertImage(
      'lqip',
      { name: 'dragon-original', maxSize: 0.05 },
      { format: 'png', width: 10, height: 7 },
      { type: 'inline', mimeType: 'image/png', width: 10, height: 7 },
    );
  });

  it('lqip-url', () => {
    cy.assertImage(
      'lqip-url',
      { name: 'dragon-original', maxSize: 0.05 },
      { format: 'png', width: 10, height: 7 },
      { type: 'url', mimeType: 'image/png', width: 10, height: 7 },
    );
  });

  it('colors', () => {
    cy.assertColors(
      'colors',
      ['#66732c', '#dad1ab', '#0f1008', '#9f9f9f', '#a7bc64'],
      ['102, 115, 44', '218, 209, 171', '15, 16, 8', '159, 159, 159', '167, 188, 100'],
    );
  });

  it('multiple', () => {
    cy.assertImage(
      'multiple',
      { name: 'dragon-original', maxSize: 0.5 },
      { format: 'webp', width: 300, height: 214 },
      { type: 'url', mimeType: 'image/webp', width: 300, height: 214 },
    );
  });

  it('dragon-original', () => {
    cy.assertImage(
      'dragon-original',
      { name: 'dragon-original', maxSize: 1, minSize: 1 },
      { format: 'png', width: 750, height: 535 },
      { type: 'url', mimeType: 'image/png', width: 750, height: 535 },
    );
  });

  it('emoji-original', () => {
    cy.assertImage(
      'emoji-original',
      { name: 'emoji-original', maxSize: 1, minSize: 1 },
      { format: 'png', width: 50, height: 50 },
      { type: 'inline', mimeType: 'image/png', width: 50, height: 50 },
    );
  });
});
