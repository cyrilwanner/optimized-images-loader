import { loader } from 'webpack';
import { getOptions } from 'loader-utils';
import processImage from './processImage';
import parseQuery from './parseQuery';
import { LoaderOptions } from './options';
import processLoaders from './processLoaders';

/**
 * Optimized images loader
 * Called by webpack
 *
 * @param {Buffer} source Image to optimize
 * @returns {null} Calls the webpack callback once finished
 */
export default function optimizedImagesLoader(this: loader.LoaderContext, source: Buffer): null {
  const callback = this.async() as loader.loaderCallback;

  (async () => {
    const loaderOptions = getOptions(this) as LoaderOptions;

    // parse image options
    const imageOptions = parseQuery(this.resourceQuery, loaderOptions);

    // process image
    const { data, info } = await processImage(source, imageOptions, loaderOptions);

    // process further loaders
    const output = processLoaders(this, data, info, imageOptions, loaderOptions);

    callback(null, output);
  })();

  return null;
}

export const raw = true;
