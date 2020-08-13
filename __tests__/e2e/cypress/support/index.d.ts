/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    assertImage(name: string, original?: { name: string; minSize?: number; maxSize?: number }, expectedSrcInfo?: Record<string, unknown> | string[], expectedResult?: Record<string, unknown>): void;
  }
}
