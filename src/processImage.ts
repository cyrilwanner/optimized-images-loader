import { Sharp } from 'sharp';
import { ImageOptions } from './parseQuery';
import { LoaderOptions } from './options';
import optimizeImage from './optimize';
import convertImage from './convert';

/**
 * Processes an image by performing all steps specified in the image options
 *
 * @async
 * @param {Sharp} inputImage Sharp wrapper of input image
 * @param {{ format?: string }} imageInfo Input image metadata
 * @param {ImageOptions} imageOptions Target image options
 * @param {LoaderOptions} loaderOptions Optimized images loader options
 * @returns {Buffer} Processed image
 */
const processImage = async (
  inputImage: Sharp,
  imageInfo: { format?: string },
  imageOptions: ImageOptions,
  loaderOptions: LoaderOptions,
): Promise<Buffer> => {
  let image = inputImage.rotate();

  // resize image
  if (imageOptions.resize) {
    image = image.resize(imageOptions.width, imageOptions.height);
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
