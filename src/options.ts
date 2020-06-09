import { EncodeOptions as MozjpegOptions } from '@wasm-codecs/mozjpeg/lib/types';
import { EncodeOptions as OxipngOptions } from '@wasm-codecs/oxipng/lib/types';
import { WebpOptions } from 'sharp';

export interface LoaderOptions {
  optimize?: boolean;
  mozjpeg?: MozjpegOptions;
  oxipng?: OxipngOptions;
  webp?: WebpOptions;
}

// default options for file- & url-loader
export const defaultFurtherLoaderOptions = {
  name: '[name]-[contenthash].[ext]',
  limit: 8192,
};
