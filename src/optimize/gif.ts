import sharp from 'sharp';
import encode from '@wasm-codecs/gifsicle';
import { LoaderOptions } from '../options';
import { ImageOptions } from '../parseQuery';

/**
 * Optimize a gif image using gifsicle
 *
 * @async
 * @param {Buffer} image Input image
 * @param {ImageOptions} imageOptions Image options
 * @param {LoaderOptions['gifsicle']} [options] Gifsicle options
 * @returns {Buffer} Optimized image
 */
const optimizeGif = async (
  image: Buffer,
  imageOptions: ImageOptions,
  options?: LoaderOptions['gifsicle'],
): Promise<Buffer> => {
  const encodeOptions = options || {};

  if (imageOptions.resize) {
    if (imageOptions.width) {
      encodeOptions.width = imageOptions.width;
    }

    if (imageOptions.height) {
      encodeOptions.height = imageOptions.height;
    }
  }

  // optimize the image using gifsicle
  const encodedImage = await encode(image, encodeOptions);

  // fill missing resize values in case the image was resized
  if (imageOptions.resize) {
    const imageData = await sharp(encodedImage).metadata();
    imageOptions.width = imageData.width; // eslint-disable-line no-param-reassign
    imageOptions.height = imageData.height; // eslint-disable-line no-param-reassign
  }

  return encodedImage;
};

export default optimizeGif;
