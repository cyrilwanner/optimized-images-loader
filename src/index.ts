import { loader } from 'webpack';
import { getOptions } from 'loader-utils';
import processImage from './processImage';
import parseQuery, { ImageOptions } from './parseQuery';
import { LoaderOptions } from './options';
import processLoaders from './processLoaders';
import { getCache, setCache, getHash } from './cache';

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

    let result: { data: Buffer | string | string[]; info: { width?: number; height?: number; format?: string } };

    // try retrieving the image from cache
    const cacheHash = getHash(source, imageOptions);
    const cached = await getCache(cacheHash, loaderOptions);

    if (cached) {
      result = cached;

      // update image options from cache
      if (cached.imageOptions) {
        (Object.keys(cached.imageOptions) as Array<keyof ImageOptions>).forEach((option: keyof ImageOptions) => {
          (imageOptions[option] as unknown) = cached.imageOptions[option];
        });
      }
    } else {
      // process image
      result = await processImage(source, imageOptions, loaderOptions);

      // cache processed image
      setCache(cacheHash, result.data, result.info, imageOptions, loaderOptions);
    }

    // process further loaders
    const output = processLoaders(this, result.data, result.info, imageOptions, loaderOptions);

    callback(null, output);
  })();

  return null;
}

export const raw = true;
