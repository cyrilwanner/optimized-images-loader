import { LoaderOptions } from '../options';

/**
 * Optimize a gif image using gifsicle
 *
 * @async
 * @param {Buffer} image Input image
 * @param {LoaderOptions['gifsicle']} [options] Gifsicle options
 * @returns {Buffer} Optimized image
 */
const optimizeGif = async (image: Buffer, options?: LoaderOptions['gifsicle']): Promise<Buffer> => { // eslint-disable-line
  // optimize the image using gifsicle
  return image;
};

export default optimizeGif;
