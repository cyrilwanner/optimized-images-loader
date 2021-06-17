import { LoaderOptions } from './options';
export interface ImageOptions {
    optimize: boolean;
    resize: boolean;
    width?: number;
    height?: number;
    convert?: 'webp';
    forceInline?: boolean;
    forceUrl?: boolean;
    processLoaders?: boolean;
    component?: 'react';
    lqip?: 'blur' | 'colors';
}
/**
 * Parses a query string into image options
 *
 * @param {string} rawQuery Resource query
 * @param {LoaderOptions} loaderOptions Optimized images loader options
 * @returns {ImageOptions} Image options
 */
declare const parseQuery: (rawQuery: string, loaderOptions: LoaderOptions) => ImageOptions;
export default parseQuery;
