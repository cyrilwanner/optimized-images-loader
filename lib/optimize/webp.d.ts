/// <reference types="node" />
import { Sharp } from 'sharp';
import { LoaderOptions } from '../options';
import { ImageOptions } from '../parseQuery';
/**
 * Optimize a webp image using sharp
 *
 * @async
 * @param {Sharp} image Sharp wrapped input image
 * @param {ImageOptions} imageOptions Image options
 * @param {LoaderOptions['webp']} [options] Webp options
 * @returns {Buffer} Optimized image
 */
declare const optimizeWebp: (image: Sharp, imageOptions: ImageOptions, options?: LoaderOptions['webp']) => Promise<Buffer>;
export default optimizeWebp;
