import path from 'path';
import sharp from 'sharp';
import optimize from '../../../lib/optimize';

describe('optimize/webp', () => {
  it('optimizes a webp image', async () => {
    const original = sharp(path.resolve(__dirname, '..', '..', 'resources', 'images', 'medium.webp'));
    const originalBuffer = await original.toBuffer();
    const originalMetadata = await original.metadata();
    const optimized = await optimize(
      original,
      originalBuffer,
      'webp',
      { optimize: true, resize: false },
      { cacheFolder: null, webp: { quality: 70 } },
    );
    const optimizedMetadata = await sharp(optimized).metadata();

    expect(originalMetadata.format).toBe('webp');
    expect(optimizedMetadata.format).toBe('webp');
    expect(optimizedMetadata.width).toBe(originalMetadata.width);
    expect(optimizedMetadata.height).toBe(originalMetadata.height);
    expect(optimized.length).toBeLessThan(originalBuffer.length * 0.9);
  });

  it('respects options', async () => {
    const original = sharp(path.resolve(__dirname, '..', '..', 'resources', 'images', 'medium.webp'));
    const originalBuffer = await original.toBuffer();
    const noOptions = await optimize(
      original,
      originalBuffer,
      'webp',
      { optimize: true, resize: false },
      { cacheFolder: null, webp: { quality: 70 } },
    );
    const noOptionsMetadata = await sharp(noOptions).metadata();
    const lowQuality = await optimize(
      original,
      originalBuffer,
      'webp',
      { optimize: true, resize: false },
      { cacheFolder: null, webp: { quality: 20 } },
    );
    const lowQualityMetadata = await sharp(lowQuality).metadata();
    const lossless = await optimize(
      original,
      originalBuffer,
      'webp',
      { optimize: true, resize: false },
      { cacheFolder: null, webp: { quality: 70, lossless: true } },
    );
    const losslessMetadata = await sharp(lossless).metadata();

    expect(noOptionsMetadata.format).toBe('webp');
    expect(lowQualityMetadata.format).toBe('webp');
    expect(losslessMetadata.format).toBe('webp');
    expect(lowQuality.length).toBeLessThan(noOptions.length * 0.6);
    expect(lossless.length).toBeGreaterThan(noOptions.length * 1.1);
  });
});
