/// <reference types="node" />
import { Sharp } from 'sharp';
import { LoaderOptions } from '../options';
/**
 * Convert an input image into the given format if a convert exists for that format
 *
 * @async
 * @param {Sharp} image Sharp wrapped input image
 * @param {string} targetFormat Target image format
 * @param {LoaderOptions} loaderOptions Optimized images loader options
 * @returns {Buffer} Converted image
 */
declare const convertImage: (image: Sharp, targetFormat: string, loaderOptions: LoaderOptions) => Promise<Buffer>;
export default convertImage;
