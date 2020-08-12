import path from 'path';
import sharp from 'sharp';
import optimize from '../../../lib/optimize';

describe('optimize/jpeg', () => {
  it('optimizes a jpeg image', async () => {
    const original = sharp(path.resolve(__dirname, '..', '..', 'images', 'medium.jpg'));
    const originalBuffer = await original.toBuffer();
    const originalMetadata = await original.metadata();
    const optimized = await optimize(
      original,
      originalBuffer,
      'jpeg',
      { optimize: true, resize: false },
      { cacheFolder: null },
    );
    const optimizedMetadata = await sharp(optimized).metadata();

    expect(originalMetadata.format).toBe('jpeg');
    expect(optimizedMetadata.format).toBe('jpeg');
    expect(optimizedMetadata.width).toBe(originalMetadata.width);
    expect(optimizedMetadata.height).toBe(originalMetadata.height);
    expect(optimized.length).toBeLessThan(originalBuffer.length * 0.8);
  });

  it('respects options', async () => {
    const original = sharp(path.resolve(__dirname, '..', '..', 'images', 'medium.jpg'));
    const originalBuffer = await original.toBuffer();
    const noOptions = await optimize(
      original,
      originalBuffer,
      'jpeg',
      { optimize: true, resize: false },
      { cacheFolder: null },
    );
    const noOptionsMetadata = await sharp(noOptions).metadata();
    const lowQuality = await optimize(
      original,
      originalBuffer,
      'jpeg',
      { optimize: true, resize: false },
      { cacheFolder: null, mozjpeg: { quality: 20 } },
    );
    const lowQualityMetadata = await sharp(lowQuality).metadata();

    expect(noOptionsMetadata.format).toBe('jpeg');
    expect(lowQualityMetadata.format).toBe('jpeg');
    expect(lowQualityMetadata.width).toBe(noOptionsMetadata.width);
    expect(lowQualityMetadata.height).toBe(noOptionsMetadata.height);
    expect(lowQuality.length).toBeLessThan(noOptions.length * 0.5);
  });
});
