import urlLoader from 'url-loader';
import { loader } from 'webpack';
import { OptionObject } from 'loader-utils';
import { ImageOptions } from './parseQuery';
import { defaultFurtherLoaderOptions } from './options';

/**
 * Builds an export statement
 *
 * @param {boolean} esModule If es module syntax should get used
 * @param {string} key Export key
 * @param {any} value Export value
 * @returns {string} Export statement
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const buildExport = (esModule: boolean, key: string, value: any): string => {
  return `${esModule ? 'export var ' : 'src.'}${key} = ${JSON.stringify(value)};`;
};

/**
 * Enrich previous loader result with new information
 *
 * @param {string} result Previous loader result
 * @param {{ width?: number; height?: number }} originalImageInfo Metadata of original image
 * @param {ImageOptions} imageOptions Image options
 * @returns {string} Enriched result
 */
const enrichResult = (
  result: string,
  originalImageInfo: { width?: number; height?: number },
  imageOptions: ImageOptions,
): string => {
  const esModule = result.startsWith('export ');
  const output = esModule
    ? result
    : result.replace(/((module\.exports\s*=|export\s+default)\s*)([^\s].*)(;$|[^;]$)/g, 'var src = new String($3);');

  return (
    output +
    (output.endsWith(';') ? '' : ';') +
    buildExport(esModule, 'width', imageOptions.resize ? imageOptions.width : originalImageInfo.width) +
    buildExport(esModule, 'height', imageOptions.resize ? imageOptions.height : originalImageInfo.height) +
    (esModule ? '' : 'module.exports = src;')
  );
};

/**
 * Process further loaders (url-loader & file-loader)
 *
 * @param {loader.LoaderContext} context Optimized images loader context
 * @param {Buffer | string} image Processed image
 * @param {{ width?: number; height?: number }} originalImageInfo Metadata of original image
 * @param {ImageOptions} imageOptions Image options
 * @param {OptionObject} loaderOptions Options for further loaders
 * @returns {string} Processed loader output
 */
const processLoaders = (
  context: loader.LoaderContext,
  image: Buffer | string,
  originalImageInfo: { width?: number; height?: number },
  imageOptions: ImageOptions,
  loaderOptions: OptionObject,
): string => {
  // do not apply further loaders if not needed
  if (imageOptions.processLoaders === false && typeof image === 'string') {
    return enrichResult(image, originalImageInfo, imageOptions);
  }

  // create options for further loaders (url-loader & file-loader)
  const furtherLoaderOptions = {
    ...defaultFurtherLoaderOptions,
    ...loaderOptions,
  } as OptionObject;

  // change extension for converted images
  if (imageOptions.convert && furtherLoaderOptions.name) {
    furtherLoaderOptions.name =
      furtherLoaderOptions.name.indexOf('[ext]') >= 0
        ? furtherLoaderOptions.name.replace('[ext]', imageOptions.convert)
        : (furtherLoaderOptions.name += `.${imageOptions.convert}`);
  }

  // force inlining
  if (imageOptions.forceInline) {
    furtherLoaderOptions.limit = undefined;

    // force url
  } else if (imageOptions.forceUrl) {
    furtherLoaderOptions.limit = -1;
  }

  // build new loader context
  const furtherLoaderContext = { ...context, query: furtherLoaderOptions };

  // get result of url-loader
  const result = urlLoader.call(furtherLoaderContext, image);

  return enrichResult(result, originalImageInfo, imageOptions);
};

export default processLoaders;
