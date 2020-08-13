Cypress.Commands.add(
  'assertImage',
  (
    name: string,
    original?: { name: string; minSize?: number; maxSize?: number },
    expectedSrcInfo?: Record<string, unknown> | string[],
    expectedResult?: Record<string, unknown>,
  ) => {
    // wrapper should be visible
    cy.get(`[data-name="${name}"]`).should('be.visible');

    // compare src info
    if (expectedSrcInfo && Object.keys(expectedSrcInfo).length > 0) {
      const srcInfo = cy.get(`[data-name="${name}"] .src-info`);
      srcInfo.should('be.visible');
      srcInfo.should('not.be.empty');
      srcInfo.invoke('text').then((str) => {
        const parsedSrcInfo = JSON.parse(str);

        if (Array.isArray(expectedSrcInfo)) {
          expect(parsedSrcInfo).to.deep.equal(expectedSrcInfo);
        } else {
          Object.keys(expectedSrcInfo).forEach((key) => {
            expect(parsedSrcInfo[key]).to.equal(expectedSrcInfo[key]);
          });
        }
      });
    }

    // compare result
    if (original || (expectedResult && Object.keys(expectedResult).length > 0)) {
      const result = cy.get(`[data-name="${name}"] .result`);
      result.should('be.visible');
      result.should('not.be.empty');
      result.invoke('text').then((str) => {
        const parsedResult = JSON.parse(str);

        if (original) {
          const originalResult = cy.get(`[data-name="${original.name}"] .result`);
          originalResult.should('be.visible');
          originalResult.should('not.be.empty');
          originalResult.invoke('text').then((originalStr) => {
            const parsedOriginalResult = JSON.parse(originalStr);

            if (original.minSize) {
              expect(parsedResult.size).to.be.gte(parsedOriginalResult.size * original.minSize);
            }

            if (original.maxSize) {
              expect(parsedResult.size).to.be.lte(parsedOriginalResult.size * original.maxSize);
            }
          });
        }

        if (expectedResult && Object.keys(expectedResult).length > 0) {
          Object.keys(expectedResult).forEach((key) => {
            expect(parsedResult[key]).equals(expectedResult[key]);
          });
        }
      });
    }
  },
);
