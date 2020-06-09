import { Sharp } from 'sharp';
import { ImageOptions } from './parseQuery';
import { LoaderOptions } from './options';
import optimizeImage from './optimize';
import convertImage from './convert';
import getDominantColors from './lqip/colors';

/**
 * Processes an image by performing all steps specified in the image options
 *
 * @async
 * @param {Sharp} inputImage Sharp wrapper of input image
 * @param {{ format?: string }} imageInfo Input image metadata
 * @param {ImageOptions} imageOptions Target image options
 * @param {LoaderOptions} loaderOptions Optimized images loader options
 * @returns {Buffer | string} Processed image
 */
const processImage = async (
  inputImage: Sharp,
  imageInfo: { format?: string },
  imageOptions: ImageOptions,
  loaderOptions: LoaderOptions,
): Promise<Buffer | string> => {
  let image = inputImage.rotate();

  // resize image
  if (imageOptions.resize) {
    image = image.resize(imageOptions.width, imageOptions.height);

    // fill missing resize values
    if (typeof imageOptions.width !== 'number' || typeof imageOptions.height !== 'number') {
      const { info } = await image.toBuffer({ resolveWithObject: true });

      if (typeof imageOptions.width !== 'number') {
        imageOptions.width = info.width; // eslint-disable-line no-param-reassign
      }

      if (typeof imageOptions.height !== 'number') {
        imageOptions.height = info.height; // eslint-disable-line no-param-reassign
      }
    }
  }

  // get lqip colors
  if (imageOptions.lqip === 'colors') {
    return getDominantColors(image, loaderOptions);
  }

  // convert image
  if (imageOptions.convert) {
    return convertImage(image, imageOptions.convert, loaderOptions);
  }

  // optimize image
  if (imageOptions.optimize && imageInfo.format) {
    return optimizeImage(image, imageInfo.format, loaderOptions);
  }

  return image.toBuffer();
};

export default processImage;
