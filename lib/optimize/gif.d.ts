/// <reference types="node" />
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
declare const optimizeGif: (image: Buffer, imageOptions: ImageOptions, options?: LoaderOptions['gifsicle']) => Promise<Buffer>;
export default optimizeGif;
