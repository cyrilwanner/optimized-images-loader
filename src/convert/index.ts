import { Sharp } from 'sharp';
import convertToWebp from './webp';
import { LoaderOptions } from '../options';

const converters = {
  webp: {
    handler: convertToWebp,
    optionsKey: 'webp',
  },
} as Record<string, { handler: (image: Sharp, options?: unknown) => Promise<Buffer>; optionsKey: string }>;

/**
 * Convert an input image into the given format if a convert exists for that format
 *
 * @async
 * @param {Sharp} image Sharp wrapped input image
 * @param {string} targetFormat Target image format
 * @param {LoaderOptions} loaderOptions Optimized images loader options
 * @returns {Buffer} Converted image
 */
const convertImage = async (image: Sharp, targetFormat: string, loaderOptions: LoaderOptions): Promise<Buffer> => {
  if (converters[targetFormat]) {
    return converters[targetFormat].handler(
      image,
      (loaderOptions as Record<string, unknown>)[converters[targetFormat].optionsKey],
    );
  }

  return image.toBuffer();
};

export default convertImage;
