/// <reference types="node" />
import { Sharp } from 'sharp';
import { LoaderOptions } from '../options';
import { ImageOptions } from '../parseQuery';
/**
 * Optimize a png image using @wasm-codecs/oxipng
 *
 * @async
 * @param {Sharp} image Sharp wrapped input image
 * @param {ImageOptions} imageOptions Image options
 * @param {LoaderOptions['oxipng']} [options] Oxipng options
 * @returns {Buffer} Optimized image
 */
declare const optimizePng: (image: Sharp, imageOptions: ImageOptions, options?: LoaderOptions['oxipng']) => Promise<Buffer>;
export default optimizePng;
