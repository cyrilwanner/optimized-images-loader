import { Sharp } from 'sharp';
import { LoaderOptions } from '../options';

/**
 * Optimize a webp image using sharp
 *
 * @async
 * @param {Sharp} image Sharp wrapped input image
 * @param {LoaderOptions['webp']} [options] Webp options
 * @returns {Buffer} Optimized image
 */
const optimizeWebp = async (image: Sharp, options?: LoaderOptions['webp']): Promise<Buffer> => {
  // encode the image using sharp
  return image.webp(options).toBuffer();
};

export default optimizeWebp;
