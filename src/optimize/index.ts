import { Sharp } from 'sharp';
import optimizeJpeg from './jpeg';
import { LoaderOptions } from '../options';
import optimizePng from './png';
import optimizeWebp from './webp';
import optimizeSvg from './svg';

const sharpBasedOptimizers = {
  jpeg: {
    handler: optimizeJpeg,
    optionsKey: 'mozjpeg',
  },
  png: {
    handler: optimizePng,
    optionsKey: 'oxipng',
  },
  webp: {
    handler: optimizeWebp,
    optionsKey: 'webp',
  },
} as Record<string, { handler: (image: Sharp, options?: unknown) => Promise<Buffer>; optionsKey: string }>;

const rawBufferBasedOptimizers = {
  svg: {
    handler: optimizeSvg,
    optionsKey: 'svgo',
  },
} as Record<string, { handler: (image: Buffer, options?: unknown) => Promise<Buffer>; optionsKey: string }>;

/**
 * Optimize the given input image if an optimizer exists for the image format
 *
 * @async
 * @param {Sharp} image Sharp wrapped input image
 * @param {Buffer} rawImage Raw input image
 * @param {string} format Format of the input image
 * @param {LoaderOptions} loaderOptions Optimized images loader options
 * @returns {Buffer} Optimized image
 */
const optimizeImage = async (
  image: Sharp,
  rawImage: Buffer,
  format: string,
  loaderOptions: LoaderOptions,
): Promise<Buffer> => {
  if (sharpBasedOptimizers[format]) {
    return sharpBasedOptimizers[format].handler(
      image,
      (loaderOptions as Record<string, unknown>)[sharpBasedOptimizers[format].optionsKey],
    );
  }

  if (rawBufferBasedOptimizers[format]) {
    return rawBufferBasedOptimizers[format].handler(
      rawImage,
      (loaderOptions as Record<string, unknown>)[rawBufferBasedOptimizers[format].optionsKey],
    );
  }

  return image.toBuffer();
};

export default optimizeImage;
