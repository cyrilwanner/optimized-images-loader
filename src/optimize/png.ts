import { Sharp } from 'sharp';
import encode from '@wasm-codecs/oxipng';
import { LoaderOptions } from '../options';
import { ImageOptions } from '../parseQuery';

/**
 * Optimize a png image using @wasm-codecs/oxipng
 *
 * @async
 * @param {Sharp} image Sharp wrapped input image
 * @param {ImageOptions} imageOptions Image options
 * @param {LoaderOptions['oxipng']} [options] Oxipng options
 * @returns {Buffer} Optimized image
 */
const optimizePng = async (
  image: Sharp,
  imageOptions: ImageOptions,
  options?: LoaderOptions['oxipng'],
): Promise<Buffer> => {
  // encode the image using @wasm-codecs/oxipng
  return encode(await image.toBuffer(), options);
};

export default optimizePng;
