import { Sharp } from 'sharp';
import encode from '@wasm-codecs/mozjpeg';
import { ImageminOptions, LoaderOptions } from '../options';
import { ImageOptions } from '../parseQuery';
import { compress } from './imagemin';

/**
 * Optimize a jpeg image using @wasm-codecs/mozjpeg
 *
 * @async
 * @param {Sharp} image Sharp wrapped input image
 * @param {ImageOptions} imageOptions Image options
 * @param {LoaderOptions['mozjpeg']} [options] Mozjpeg options
 * @returns {Buffer} Optimized image
 */
const optimizeJpeg = async (
  image: Sharp,
  imageOptions: ImageOptions,
  options?: LoaderOptions['mozjpeg'],
  imageminOptions?: ImageminOptions,
): Promise<Buffer> => {
  // try imagemin first
  const imageminBuffer = await compress(image, imageminOptions);
  if (imageminBuffer) return imageminBuffer;

  // convert to raw image data
  const {
    data,
    info: { width, height, channels },
  } = await image.raw().toBuffer({ resolveWithObject: true });

  // encode the image using @wasm-codecs/mozjpeg
  return encode(data, { width, height, channels }, options);
};

export default optimizeJpeg;
