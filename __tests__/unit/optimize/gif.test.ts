import path from 'path';
import fs from 'fs';
import sharp from 'sharp';
import optimize from '../../../lib/optimize';

describe('optimize/gif', () => {
  it('optimizes a gif image', async () => {
    const original = fs.readFileSync(path.resolve(__dirname, '..', '..', 'resources', 'images', 'small.gif'));
    const originalMetadata = await sharp(original).metadata();
    const optimized = await optimize(
      sharp(original),
      original,
      'gif',
      { optimize: true, resize: false },
      { cacheFolder: null },
    );
    const optimizedMetadata = await sharp(optimized).metadata();

    expect(originalMetadata.format).toBe('gif');
    expect(optimizedMetadata.format).toBe('gif');
    expect(optimizedMetadata.width).toBe(originalMetadata.width);
    expect(optimizedMetadata.height).toBe(originalMetadata.height);
    expect(optimizedMetadata.size).toBeLessThan(originalMetadata.size * 0.8);
  });

  it('resizes a gif image with both dimensions given', async () => {
    const original = fs.readFileSync(path.resolve(__dirname, '..', '..', 'resources', 'images', 'medium.gif'));
    const originalMetadata = await sharp(original).metadata();
    const optimized = await optimize(
      sharp(original),
      original,
      'gif',
      { optimize: true, resize: true, width: 75, height: 75 },
      { cacheFolder: null },
    );
    const optimizedMetadata = await sharp(optimized).metadata();

    expect(originalMetadata.format).toBe('gif');
    expect(optimizedMetadata.format).toBe('gif');
    expect(optimizedMetadata.width).toBe(75);
    expect(optimizedMetadata.height).toBe(75);
  });

  it('resizes a gif image with only a width given', async () => {
    const original = fs.readFileSync(path.resolve(__dirname, '..', '..', 'resources', 'images', 'medium.gif'));
    const originalMetadata = await sharp(original).metadata();
    const optimized = await optimize(
      sharp(original),
      original,
      'gif',
      { optimize: true, resize: true, width: 75 },
      { cacheFolder: null },
    );
    const optimizedMetadata = await sharp(optimized).metadata();

    expect(originalMetadata.format).toBe('gif');
    expect(optimizedMetadata.format).toBe('gif');
    expect(optimizedMetadata.width).toBe(75);
    expect(optimizedMetadata.height).toBe(42);
  });

  it('resizes a gif image with only a height given', async () => {
    const original = fs.readFileSync(path.resolve(__dirname, '..', '..', 'resources', 'images', 'medium.gif'));
    const originalMetadata = await sharp(original).metadata();
    const optimized = await optimize(
      sharp(original),
      original,
      'gif',
      { optimize: true, resize: true, height: 50 },
      { cacheFolder: null },
    );
    const optimizedMetadata = await sharp(optimized).metadata();

    expect(originalMetadata.format).toBe('gif');
    expect(optimizedMetadata.format).toBe('gif');
    expect(optimizedMetadata.width).toBe(89);
    expect(optimizedMetadata.height).toBe(50);
  });

  it('respects options', async () => {
    const original = fs.readFileSync(path.resolve(__dirname, '..', '..', 'resources', 'images', 'small.gif'));
    const noOptions = await optimize(
      sharp(original),
      original,
      'gif',
      { optimize: true, resize: false },
      { cacheFolder: null },
    );
    const noOptionsMetadata = await sharp(noOptions).metadata();
    const smallOptimizationLevel = await optimize(
      sharp(original),
      original,
      'gif',
      { optimize: true, resize: false },
      { cacheFolder: null, gifsicle: { optimizationLevel: 1 } },
    );
    const smallOptimizationLevelMetadata = await sharp(smallOptimizationLevel).metadata();
    const limitedColors = await optimize(
      sharp(original),
      original,
      'gif',
      { optimize: true, resize: false },
      { cacheFolder: null, gifsicle: { colors: 32 } },
    );
    const limitedColorsMetadata = await sharp(limitedColors).metadata();

    expect(smallOptimizationLevelMetadata.size).toBeGreaterThan(noOptionsMetadata.size * 1.1);
    expect(limitedColorsMetadata.size).toBeLessThan(noOptionsMetadata.size * 0.7);
  });
});
