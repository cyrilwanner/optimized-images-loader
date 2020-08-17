describe('svg', () => {
  before(() => {
    cy.visit('/svg');
    cy.title().should('equal', 'svg');
  });

  it('url-auto', () => {
    cy.assertImage(
      'url-auto',
      { name: 'firefox-original', maxSize: 0.95 },
      { format: 'svg' },
      { type: 'url', mimeType: 'image/svg+xml' },
    );
  });

  it('url-force', () => {
    cy.assertImage(
      'url-force',
      { name: 'android-original', maxSize: 0.8 },
      { format: 'svg' },
      { type: 'url', mimeType: 'image/svg+xml' },
    );
  });

  it('url-force-original', () => {
    cy.assertImage(
      'url-force-original',
      { name: 'inline-auto', minSize: 0.75, maxSize: 1.05 },
      { format: 'svg' },
      { type: 'url', mimeType: 'image/svg+xml' },
    );

    cy.assertImage(
      'url-force-original',
      { name: 'url-force', minSize: 1.05 },
      { format: 'svg' },
      { type: 'url', mimeType: 'image/svg+xml' },
    );
  });

  it('inline-auto', () => {
    cy.assertImage(
      'inline-auto',
      { name: 'android-original', maxSize: 0.95 },
      { format: 'svg' },
      { type: 'inline', mimeType: 'image/svg+xml' },
    );
  });

  it('inline-force', () => {
    cy.assertImage(
      'inline-force',
      { name: 'firefox-original' },
      { format: 'svg' },
      { type: 'inline', mimeType: 'image/svg+xml' },
    );
  });

  it('inline-force-original', () => {
    cy.assertImage(
      'inline-force-original',
      { name: 'firefox-original', minSize: 1.0 },
      { format: 'svg' },
      { type: 'inline', mimeType: 'image/svg+xml' },
    );

    cy.assertImage(
      'inline-force-original',
      { name: 'inline-force', minSize: 1.05 },
      { format: 'svg' },
      { type: 'inline', mimeType: 'image/svg+xml' },
    );
  });

  it('include', () => {
    cy.assertImage('include', undefined, { format: 'svg', src: '{included}' });

    cy.get('[data-name="include"] .wrapper > svg').should('be.visible').scrollIntoView();
    cy.get('[data-name="include"] .wrapper')
      .invoke('html')
      .then((str) => {
        expect(str).to.contain('<svg');
        expect(str).to.contain('<path');
        expect(str).to.contain('<stop');
      });
  });

  it('include-original', () => {
    cy.assertImage('include', undefined, { format: 'svg', src: '{included}' });
    cy.assertImage('include', undefined, { format: 'svg', src: '{included}' });

    cy.get('[data-name="include-original"] .wrapper > svg').should('be.visible').scrollIntoView();
    cy.get('[data-name="include-original"] .wrapper')
      .invoke('html')
      .then((str) => {
        expect(str).to.contain('<svg');
        expect(str).to.contain('<path');
        expect(str).to.contain('<stop');

        cy.get('[data-name="include"] .wrapper')
          .invoke('html')
          .then((optimizedStr) => {
            expect(str.length).to.be.gte(optimizedStr.length * 1.1);
          });
      });
  });

  it('colors', () => {
    cy.assertImage('colors', undefined, ['#f45722', '#125ed2', '#fbdf2b', '#331869', '#7c7484']);

    cy.get('[data-name="colors"] .wrapper > div').should('have.length', 5);
    cy.get('[data-name="colors"] .wrapper > div')
      .eq(0)
      .should('have.css', 'background-color')
      .should('equal', 'rgb(244, 87, 34)');
    cy.get('[data-name="colors"] .wrapper > div')
      .eq(1)
      .should('have.css', 'background-color')
      .should('equal', 'rgb(18, 94, 210)');
    cy.get('[data-name="colors"] .wrapper > div')
      .eq(2)
      .should('have.css', 'background-color')
      .should('equal', 'rgb(251, 223, 43)');
    cy.get('[data-name="colors"] .wrapper > div')
      .eq(3)
      .should('have.css', 'background-color')
      .should('equal', 'rgb(51, 24, 105)');
    cy.get('[data-name="colors"] .wrapper > div')
      .eq(4)
      .should('have.css', 'background-color')
      .should('equal', 'rgb(124, 116, 132)');
  });

  it('multiple', () => {
    cy.assertImage(
      'multiple',
      { name: 'firefox-original', maxSize: 0.9 },
      { format: 'webp', width: 300, height: 300 },
      { type: 'url', mimeType: 'image/webp', width: 300, height: 300 },
    );
  });

  it('firefox-original', () => {
    cy.assertImage(
      'firefox-original',
      { name: 'firefox-original', maxSize: 1, minSize: 1 },
      { format: 'svg' },
      { type: 'url', mimeType: 'image/svg+xml' },
    );
  });

  it('android-original', () => {
    cy.assertImage(
      'android-original',
      { name: 'android-original', maxSize: 1, minSize: 1 },
      { format: 'svg' },
      { type: 'inline', mimeType: 'image/svg+xml' },
    );
  });
});
