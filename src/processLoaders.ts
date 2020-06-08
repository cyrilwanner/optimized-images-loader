import urlLoader from 'url-loader';
import { loader } from 'webpack';
import { OptionObject } from 'loader-utils';
import { ImageOptions } from './parseQuery';

const processLoaders = (
  context: loader.LoaderContext,
  image: Buffer,
  originalImageInfo: { width?: number; height?: number },
  imageOptions: ImageOptions,
  loaderOptions: OptionObject,
): string => {
  // create options for further loaders (url-loader & file-loader)
  const furtherLoaderOptions = {
    ...loaderOptions,
  };

  // change extension for converted images
  if (imageOptions.convert && furtherLoaderOptions.name) {
    furtherLoaderOptions.name =
      furtherLoaderOptions.name.indexOf('[ext]') >= 0
        ? furtherLoaderOptions.name.replace('[ext]', imageOptions.convert)
        : (furtherLoaderOptions.name += `.${imageOptions.convert}`);
  }

  // build new loader context
  const furtherLoaderContext = { ...context, query: furtherLoaderOptions };

  return urlLoader.call(furtherLoaderContext, image);
};

export default processLoaders;
