/// <reference types="node" />
import { ImageOptions } from './parseQuery';
import { LoaderOptions } from './options';
/**
 * Processes an image by performing all steps specified in the image options
 *
 * @async
 * @param {Buffer} inputImage Input image
 * @param {{ format?: string }} imageInfo Input image metadata
 * @param {ImageOptions} imageOptions Target image options
 * @param {LoaderOptions} loaderOptions Optimized images loader options
 * @returns {{ data: Buffer | string; info: { width?: number; height?: number; format?: string } }} Processed image
 */
declare const processImage: (inputImage: Buffer, imageOptions: ImageOptions, loaderOptions: LoaderOptions) => Promise<{
    data: Buffer | string | string[];
    info: {
        width?: number;
        height?: number;
        format?: string;
    };
}>;
export default processImage;
