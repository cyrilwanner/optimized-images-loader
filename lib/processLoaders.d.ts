/// <reference types="node" />
import { loader } from 'webpack';
import { ImageOptions } from './parseQuery';
import { OptionObject } from './options';
/**
 * Process further loaders (url-loader & file-loader)
 *
 * @param {loader.LoaderContext} context Optimized images loader context
 * @param {Buffer | string} image Processed image
 * @param {{ width?: number; height?: number; format?: string }} originalImageInfo Metadata of original image
 * @param {ImageOptions} imageOptions Image options
 * @param {OptionObject} loaderOptions Options for further loaders
 * @returns {string} Processed loader output
 */
declare const processLoaders: (context: loader.LoaderContext, image: Buffer | string | string[], originalImageInfo: {
    width?: number;
    height?: number;
    format?: string;
}, imageOptions: ImageOptions, loaderOptions: OptionObject) => string;
export default processLoaders;
