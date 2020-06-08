import { Sharp, WebpOptions } from 'sharp';

/**
 * Convert an image to webp using sharp
 *
 * @async
 * @param {Sharp} image Sharp wrapped input image
 * @param {WebpOptions} [options] Webp options
 * @returns {Buffer} Converted image
 */
const convertToWebp = async (image: Sharp, options?: WebpOptions): Promise<Buffer> => {
  // convert the image to webp using sharp
  return image.webp(options).toBuffer();
};

export default convertToWebp;
