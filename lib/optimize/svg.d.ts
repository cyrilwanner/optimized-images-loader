/// <reference types="node" />
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
declare const optimizeSvg: (image: Buffer, imageOptions: ImageOptions, options?: LoaderOptions['svgo']) => Promise<Buffer>;
export default optimizeSvg;
