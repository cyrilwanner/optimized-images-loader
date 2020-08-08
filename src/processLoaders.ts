import urlLoader from 'url-loader';
import { loader } from 'webpack';
import { ImageOptions } from './parseQuery';
import { defaultFurtherLoaderOptions, OptionObject } from './options';

/**
 * Enrich previous loader result with new information
 *
 * @param {string | string[]} result Previous loader result
 * @param {{ width?: number; height?: number; format?: string }} originalImageInfo Metadata of original image
 * @param {ImageOptions} imageOptions Image options
 * @returns {string} Enriched result
 */
const enrichResult = (
  result: string | string[],
  originalImageInfo: { width?: number; height?: number; format?: string },
  imageOptions: ImageOptions,
): string => {
  const width = imageOptions.resize ? imageOptions.width : originalImageInfo.width;
  const height = imageOptions.resize ? imageOptions.height : originalImageInfo.height;
  const format = imageOptions.convert ? imageOptions.convert : originalImageInfo.format;

  // an array means it was not processed by the url-/file-loader and the result should still be an array
  // instead of a string. so in this case, append the additional export information to the array prototype
  if (Array.isArray(result)) {
    return `var res=${JSON.stringify(result)};res.width=${width};res.height=${height};res.format=${JSON.stringify(
      format || '',
    )};module.exports = res;`;
  }

  if (result.indexOf('module.exports') < 0) {
    throw new Error('Unexpected input');
  }

  const output = result.replace(/((module\.exports\s*=)\s*)([^\s].*[^;])(;$|$)/g, 'var src = $3;');

  return `${output}module.exports={src:src,width:${width},height:${height},format:${JSON.stringify(
    format || '',
  )},toString:function(){return src;}};`;
};

/**
 * Replace additional placeholders in the file name
 *
 * @param {string} name File name pattern
 * @param {{ width?: number; height?: number; format?: string }} originalImageInfo Metadata of original image
 * @param {ImageOptions} imageOptions Image options
 * @returns {string} Replaced file name
 */
const replaceName = (
  name: string,
  originalImageInfo: { width?: number; height?: number; format?: string },
  imageOptions: ImageOptions,
): string => {
  return name
    .replace(/\[width\]/g, `${imageOptions.width || originalImageInfo.width}`)
    .replace(/\[height\]/g, `${imageOptions.height || originalImageInfo.height}`);
};

/**
 * Convert the image into a component
 *
 * @param {string} image Processed image
 * @param {{ width?: number; height?: number; format?: string }} originalImageInfo Metadata of original image
 * @param {ImageOptions} imageOptions Image options
 * @param {OptionObject} loaderOptions Loader options
 */
const convertToComponent = (
  image: string,
  originalImageInfo: { width?: number; height?: number; format?: string },
  imageOptions: ImageOptions,
  loaderOptions: OptionObject,
): string => {
  if (imageOptions.component === 'react') {
    const svgr = require('@svgr/core').default; // eslint-disable-line
    const babel = require('@babel/core'); // eslint-disable-line

    const code = svgr.sync(image, loaderOptions.svgr || {}, { componentName: 'SvgComponent' });
    const transformed = babel.transformSync(code, {
      caller: {
        name: 'optimized-images-loader',
      },
      babelrc: false,
      configFile: false,
      presets: [
        babel.createConfigItem(require('@babel/preset-react'), { type: 'preset' }), // eslint-disable-line
        babel.createConfigItem([require('@babel/preset-env'), { modules: false }], { type: 'preset' }), // eslint-disable-line
      ],
    });

    return transformed.code;
  }

  throw new Error(`Unknown component type ${imageOptions.component}`);
};

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
const processLoaders = (
  context: loader.LoaderContext,
  image: Buffer | string | string[],
  originalImageInfo: { width?: number; height?: number; format?: string },
  imageOptions: ImageOptions,
  loaderOptions: OptionObject,
): string => {
  // do not apply further loaders if not needed
  if (imageOptions.processLoaders === false) {
    // transform result to a component
    if (imageOptions.component === 'react') {
      return convertToComponent(image.toString(), originalImageInfo, imageOptions, loaderOptions);
    }

    if (Array.isArray(image)) {
      return enrichResult(image, originalImageInfo, imageOptions);
    }

    const output = Buffer.isBuffer(image) ? image.toString() : image;

    return enrichResult(`module.exports = ${JSON.stringify(output)}`, originalImageInfo, imageOptions);
  }

  // create options for further loaders (url-loader & file-loader)
  const furtherLoaderOptions = {
    ...defaultFurtherLoaderOptions,
    ...loaderOptions,
    esModule: false,
  } as OptionObject;

  // replace name
  furtherLoaderOptions.name = replaceName(furtherLoaderOptions.name, originalImageInfo, imageOptions);

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
