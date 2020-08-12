import path from 'path';
import sharp from 'sharp';
import convert from '../../../lib/convert';

describe('convert/webp', () => {
  it('converts a jpg image to webp', async () => {
    const original = sharp(path.resolve(__dirname, '..', '..', 'images', 'medium.jpg'));
    const originalMetadata = await original.metadata();
    const webp = await convert(original, 'webp', {});
    const webpMetadata = await sharp(webp).metadata();

    expect(originalMetadata.format).toBe('jpeg');
    expect(webpMetadata.format).toBe('webp');
    expect(webpMetadata.channels).toBe(3);
    expect(webpMetadata.width).toBe(originalMetadata.width);
    expect(webpMetadata.height).toBe(originalMetadata.height);
  });

  it('converts a png image to webp', async () => {
    const original = sharp(path.resolve(__dirname, '..', '..', 'images', 'medium.png'));
    const originalMetadata = await original.metadata();
    const webp = await convert(original, 'webp', {});
    const webpMetadata = await sharp(webp).metadata();

    expect(originalMetadata.format).toBe('png');
    expect(webpMetadata.format).toBe('webp');
    expect(webpMetadata.channels).toBe(4);
    expect(webpMetadata.width).toBe(originalMetadata.width);
    expect(webpMetadata.height).toBe(originalMetadata.height);
  });

  it('preserves the image in case of a wrong target format', async () => {
    const original = sharp(path.resolve(__dirname, '..', '..', 'images', 'medium.png'));
    const originalMetadata = await original.metadata();
    const result = await convert(original, 'invalid', {});
    const resultMetadata = await sharp(result).metadata();

    expect(originalMetadata.format).toBe('png');
    expect(resultMetadata.format).toBe('png');
    expect(resultMetadata.channels).toBe(4);
    expect(resultMetadata.width).toBe(originalMetadata.width);
    expect(resultMetadata.height).toBe(originalMetadata.height);
  });
});
