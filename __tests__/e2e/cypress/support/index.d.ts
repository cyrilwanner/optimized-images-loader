/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    assertColors(name: string, hexColors: string[], rgbColors: string[]): void;
    assertImage(name: string, original?: { name: string; minSize?: number; maxSize?: number }, expectedSrcInfo?: Record<string, unknown> | string[], expectedResult?: Record<string, unknown>): void;
  }
}
