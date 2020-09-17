import { Sharp } from 'sharp';
import encode from '@wasm-codecs/oxipng';
import { ImageminOptions, LoaderOptions } from '../options';
import { ImageOptions } from '../parseQuery';
import { compress } from './imagemin';

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
  imageminOptions?: ImageminOptions,
): Promise<Buffer> => {
  const data = await image.toBuffer();

  const imageminBuffer = await compress(data, imageminOptions);
  if (imageminBuffer) return imageminBuffer;

  // encode the image using @wasm-codecs/oxipng
  return encode(data, options);
};

export default optimizePng;
