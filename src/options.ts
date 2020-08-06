import { EncodeOptions as MozjpegOptions } from '@wasm-codecs/mozjpeg/lib/types';
import { EncodeOptions as OxipngOptions } from '@wasm-codecs/oxipng/lib/types';
import { WebpOptions } from 'sharp';

export interface LoaderOptions {
  optimize?: boolean;
  cacheFolder?: string;
  mozjpeg?: MozjpegOptions;
  oxipng?: OxipngOptions;
  webp?: WebpOptions;
  gifsicle?: unknown;
  svgo?: Record<string, unknown>;
}

export interface OptionObject {
  [key: string]: any; // eslint-disable-line
}

// default options for file- & url-loader
export const defaultFurtherLoaderOptions = {
  name: '[name]-[contenthash].[ext]',
  limit: 8192,
};
