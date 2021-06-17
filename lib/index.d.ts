/// <reference types="node" />
import { loader } from 'webpack';
/**
 * Optimized images loader
 * Called by webpack
 *
 * @param {Buffer} source Image to optimize
 * @returns {null} Calls the webpack callback once finished
 */
export default function optimizedImagesLoader(this: loader.LoaderContext, source: Buffer): null;
export declare const raw = true;
