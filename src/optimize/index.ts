import { Sharp } from 'sharp';
import optimizeJpeg from './jpeg';
import { LoaderOptions } from '../options';
import optimizePng from './png';
import optimizeWebp from './webp';
import optimizeSvg from './svg';
import optimizeGif from './gif';
import { ImageOptions } from '../parseQuery';

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
} as Record<
  string,
  { handler: (image: Sharp, imageOptions: ImageOptions, options?: unknown) => Promise<Buffer>; optionsKey: string }
>;

const rawBufferBasedOptimizers = {
  svg: {
    handler: optimizeSvg,
    optionsKey: 'svgo',
  },
  gif: {
    handler: optimizeGif,
    optionsKey: 'gifsicle',
  },
} as Record<
  string,
  { handler: (image: Buffer, imageOptions: ImageOptions, options?: unknown) => Promise<Buffer>; optionsKey: string }
>;

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
  imageOptions: ImageOptions,
  loaderOptions: LoaderOptions,
): Promise<Buffer> => {
  if (sharpBasedOptimizers[format]) {
    return sharpBasedOptimizers[format].handler(
      image,
      imageOptions,
      (loaderOptions as Record<string, unknown>)[sharpBasedOptimizers[format].optionsKey],
    );
  }

  if (rawBufferBasedOptimizers[format]) {
    return rawBufferBasedOptimizers[format].handler(
      rawImage,
      imageOptions,
      (loaderOptions as Record<string, unknown>)[rawBufferBasedOptimizers[format].optionsKey],
    );
  }

  return image.toBuffer();
};

export default optimizeImage;
