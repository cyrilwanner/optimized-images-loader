import SVGO from 'svgo';
import { LoaderOptions } from '../options';
import { ImageOptions } from '../parseQuery';

/**
 * Optimize a svg image using svgo
 *
 * @async
 * @param {Buffer} image Input image
 * @param {ImageOptions} imageOptions Image options
 * @param {LoaderOptions['svgo']} [options] Svgo options
 * @returns {Buffer} Optimized image
 */
const optimizeSvg = async (
  image: Buffer,
  imageOptions: ImageOptions,
  options?: LoaderOptions['svgo'],
): Promise<Buffer> => {
  // optimize the image using svgo
  const svgo = new SVGO(options);
  const { data } = await svgo.optimize(image.toString());

  return Buffer.from(data);
};

export default optimizeSvg;
