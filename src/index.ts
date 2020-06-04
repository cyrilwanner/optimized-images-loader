import { loader } from 'webpack';
import { getOptions } from 'loader-utils';
import { EncodeOptions as MozjpegOptions } from '@wasm-codecs/mozjpeg/lib/types';
import processImage from './processImage';

export interface LoaderOptions {
  optimize?: boolean;
  mozjpeg?: MozjpegOptions;
}

export default function optimizedImagesLoader(this: loader.LoaderContext, source: Buffer): null {
  const callback = this.async() as loader.loaderCallback;

  (async () => {
    const loaderOptions = getOptions(this) as LoaderOptions;

    // process image
    const processedImage = await processImage(source, this.resourceQuery, loaderOptions);

    callback(null, processedImage);
  })();

  return null;
}

export const raw = true;
