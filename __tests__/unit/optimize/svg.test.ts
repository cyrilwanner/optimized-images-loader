import path from 'path';
import fs from 'fs';
import sharp from 'sharp';
import optimize from '../../../lib/optimize';

describe('optimize/svg', () => {
  it('optimizes a svg image', async () => {
    const original = fs.readFileSync(path.resolve(__dirname, '..', '..', 'images', 'small.svg'));
    const originalMetadata = await sharp(original).metadata();
    const optimized = await optimize(sharp(original), original, 'svg', { optimize: true, resize: false }, {});
    const optimizedMetadata = await sharp(optimized).metadata();

    expect(originalMetadata.format).toBe('svg');
    expect(optimizedMetadata.format).toBe('svg');
    expect(optimized.length).toBeLessThan(original.length * 0.5);
  });

  it('respects options', async () => {
    const original = fs.readFileSync(path.resolve(__dirname, '..', '..', 'images', 'small.svg'));
    const noOptions = await optimize(sharp(original), original, 'svg', { optimize: true, resize: false }, {});
    const noOptionsMetadata = await sharp(noOptions).metadata();
    const lessOptimization = await optimize(
      sharp(original),
      original,
      'svg',
      { optimize: true, resize: false },
      {
        svgo: {
          plugins: [
            { cleanupAttrs: false },
            { inlineStyles: false },
            { removeComments: false },
            { removeMetadata: false },
          ],
        },
      },
    );
    const lessOptimizationMetadata = await sharp(lessOptimization).metadata();

    expect(noOptionsMetadata.format).toBe('svg');
    expect(lessOptimizationMetadata.format).toBe('svg');
    expect(lessOptimization.length).toBeGreaterThan(noOptions.length * 1.005);
  });
});
