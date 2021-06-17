/// <reference types="node" />
import { Sharp } from 'sharp';
import { LoaderOptions } from '../options';
import { ImageOptions } from '../parseQuery';
/**
 * Optimize the given input image if an optimizer exists for the image format
 *
 * @async
 * @param {Sharp} image Sharp wrapped input image
 * @param {Buffer} rawImage Raw input image
 * @param {string} format Format of the input image
 * @param {LoaderOptions} loaderOptions Optimized images loader options
 * @returns {Buffer} Optimized image
 */
declare const optimizeImage: (image: Sharp, rawImage: Buffer, format: string, imageOptions: ImageOptions, loaderOptions: LoaderOptions) => Promise<Buffer>;
export default optimizeImage;
