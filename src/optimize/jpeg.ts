import { Sharp } from 'sharp';
import encode from '@wasm-codecs/mozjpeg';
import { LoaderOptions } from '../options';

/**
 * Optimize a jpeg image using @wasm-codecs/mozjpeg
 *
 * @async
 * @param {Sharp} image Sharp wrapped input image
 * @param {LoaderOptions['mozjpeg']} [options] Mozjpeg options
 * @returns {Buffer} Optimized image
 */
const optimizeJpeg = async (image: Sharp, options?: LoaderOptions['mozjpeg']): Promise<Buffer> => {
  // convert to raw image data
  const {
    data,
    info: { width, height, channels },
  } = await image.raw().toBuffer({ resolveWithObject: true });

  // encode the image using @wasm-codecs/mozjpeg
  return encode(data, { width, height, channels }, options);
};

export default optimizeJpeg;
