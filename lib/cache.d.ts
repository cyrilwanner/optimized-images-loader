/// <reference types="node" />
import { ImageOptions } from './parseQuery';
import { LoaderOptions } from './options';
/**
 * Calculates a hash for the given image and query string
 *
 * @param {Buffer} source Source image
 * @param {ImageOptions} imageOptions Image options
 * @returns {string} Hash
 */
export declare const getHash: (source: Buffer, imageOptions: ImageOptions) => string;
/**
 * Retrieves an optimized image from cache if it exists
 *
 * @async
 * @param {string} hash Cache hash
 * @param {LoaderOptions} loaderOptions Optimized images loader options
 * @returns {{ data: Buffer | string | string[]; info: { width?: number; height?: number; format?: string }, imageOptions: ImageOptions } | null} Cached image or null if not present
 */
export declare const getCache: (hash: string, loaderOptions: LoaderOptions) => Promise<{
    data: Buffer | string | string[];
    info: {
        width?: number;
        height?: number;
        format?: string;
    };
    imageOptions: ImageOptions;
} | null>;
/**
 * Writes an optimized image into the cache
 *
 * @async
 * @param {string} hash Cache hash
 * @param {Buffer | string | string[]} result Optimized image
 * @param {{ width?: number; height?: number; format?: string }} info Image information
 * @param {ImageOptions} imageOptions Image options
 * @param {LoaderOptions} loaderOptions Optimized images loader options
 */
export declare const setCache: (hash: string, result: Buffer | string | string[], { width, height, format }: {
    width?: number | undefined;
    height?: number | undefined;
    format?: string | undefined;
}, imageOptions: ImageOptions, loaderOptions: LoaderOptions) => Promise<void>;
