/// <reference types="node" />
import { Sharp, WebpOptions } from 'sharp';
/**
 * Convert an image to webp using sharp
 *
 * @async
 * @param {Sharp} image Sharp wrapped input image
 * @param {WebpOptions} [options] Webp options
 * @returns {Buffer} Converted image
 */
declare const convertToWebp: (image: Sharp, options?: WebpOptions | undefined) => Promise<Buffer>;
export default convertToWebp;
