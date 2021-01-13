import querystring from 'querystring';
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
  trace?: boolean;
}

/**
 * Parses a query string into image options
 *
 * @param {string} rawQuery Resource query
 * @param {LoaderOptions} loaderOptions Optimized images loader options
 * @returns {ImageOptions} Image options
 */
const parseQuery = (rawQuery: string, loaderOptions: LoaderOptions): ImageOptions => {
  const query = querystring.parse(rawQuery.substr(0, 1) === '?' ? rawQuery.substr(1) : rawQuery);
  const options: ImageOptions = {
    optimize: loaderOptions.optimize !== false,
    resize: false,
  };

  // disable optimization
  if (typeof query.original !== 'undefined') {
    options.optimize = false;
  }

  // force inline
  if (typeof query.inline !== 'undefined') {
    options.forceInline = true;
  }

  // force url
  if (typeof query.url !== 'undefined') {
    options.forceUrl = true;
  }

  // include raw image (used for svg)
  if (typeof query.include !== 'undefined') {
    options.processLoaders = false;

    if (loaderOptions.includeStrategy === 'react') {
      options.component = 'react';
    }
  }

  // resize image
  if (typeof query.width === 'string') {
    options.width = parseInt(query.width, 10);
    options.resize = true;
  }
  if (typeof query.height === 'string') {
    options.height = parseInt(query.height, 10);
    options.resize = true;
  }

  // convert image to webp
  if (typeof query.webp !== 'undefined') {
    options.convert = 'webp';
  }

  // return low quality image placeholder
  if (typeof query.lqip !== 'undefined') {
    options.resize = true;
    options.optimize = false;
    options.lqip = 'blur';
  }

  // return dominant colors instead of image
  if (typeof query.colors !== 'undefined' || typeof query['lqip-colors'] !== 'undefined') {
    options.processLoaders = false;
    options.lqip = 'colors';
  }

  // return svg trace instead of image
  if (typeof query.trace !== 'undefined') {
    options.trace = true;
  }

  return options;
};

export default parseQuery;
