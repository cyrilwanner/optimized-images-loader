import path from 'path';
import sharp from 'sharp';
import optimize from '../../../lib/optimize';

describe('optimize/png', () => {
  it('optimizes a png image', async () => {
    jest.setTimeout(30000);

    const original = sharp(path.resolve(__dirname, '..', '..', 'images', 'medium.png'));
    const originalBuffer = await original.toBuffer();
    const originalMetadata = await original.metadata();
    const optimized = await optimize(
      original,
      originalBuffer,
      'png',
      { optimize: true, resize: false },
      { cacheFolder: null },
    );
    const optimizedMetadata = await sharp(optimized).metadata();

    expect(originalMetadata.format).toBe('png');
    expect(optimizedMetadata.format).toBe('png');
    expect(optimizedMetadata.width).toBe(originalMetadata.width);
    expect(optimizedMetadata.height).toBe(originalMetadata.height);
    expect(optimized.length).toBeLessThan(originalBuffer.length * 0.9);
  });

  it('respects options', async () => {
    jest.setTimeout(30000);

    const original = sharp(path.resolve(__dirname, '..', '..', 'images', 'medium.png'));
    const originalBuffer = await original.toBuffer();
    const noOptions = await optimize(
      original,
      originalBuffer,
      'png',
      { optimize: true, resize: false },
      { cacheFolder: null },
    );
    const noOptionsMetadata = await sharp(noOptions).metadata();
    const lowLevel = await optimize(
      original,
      originalBuffer,
      'png',
      { optimize: true, resize: false },
      { cacheFolder: null, oxipng: { level: 0 } },
    );
    const lowLevelMetadata = await sharp(lowLevel).metadata();

    expect(noOptionsMetadata.format).toBe('png');
    expect(lowLevelMetadata.format).toBe('png');
    expect(lowLevelMetadata.width).toBe(noOptionsMetadata.width);
    expect(lowLevelMetadata.height).toBe(noOptionsMetadata.height);
    expect(lowLevel.length).toBeGreaterThan(noOptions.length * 1.1);
  });
});
