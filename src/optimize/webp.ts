import { Sharp } from 'sharp';
import { LoaderOptions } from '../options';
import { ImageOptions } from '../parseQuery';

/**
 * Optimize a webp image using sharp
 *
 * @async
 * @param {Sharp} image Input image
 * @param {Buffer} imageBuffer Buffer of image
 * @param {ImageOptions} imageOptions Image options
 * @param {LoaderOptions['webp']} [options] Webp options
 * @returns {Buffer} Optimized image
 */
const optimizeWebp = async (
  image: Sharp,
  imageBuffer: Buffer,
  imageOptions: ImageOptions,
  options?: LoaderOptions['webp'],
): Promise<Buffer> => {
  // encode the image using sharp
  const result = await image.webp({ quality: 80, reductionEffort: 6, ...options }).toBuffer();

  // only use it if it is smaller than the input image or it had to be resized
  if (imageOptions.resize || result.byteLength < imageBuffer.byteLength) {
    return result;
  }

  return imageBuffer;
};

export default optimizeWebp;
