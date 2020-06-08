import { loader } from 'webpack';
import { getOptions } from 'loader-utils';
import sharp from 'sharp';
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

    // load image
    const image = sharp(source);
    const imageMetadata = await image.metadata();

    // parse image options
    const imageOptions = parseQuery(this.resourceQuery, imageMetadata, loaderOptions);

    // process image
    const processedImage = await processImage(image, imageMetadata, imageOptions, loaderOptions);

    // process further loaders
    const output = processLoaders(this, processedImage, imageMetadata, imageOptions, loaderOptions);

    callback(null, output);
  })();

  return null;
}

export const raw = true;
