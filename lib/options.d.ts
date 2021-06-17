import { EncodeOptions as MozjpegOptions } from '@wasm-codecs/mozjpeg/lib/types';
import { EncodeOptions as OxipngOptions } from '@wasm-codecs/oxipng/lib/types';
import { EncodeOptions as GifsicleOptions } from '@wasm-codecs/gifsicle/lib/types';
import { WebpOptions } from 'sharp';
export interface LoaderOptions {
    optimize?: boolean;
    cacheFolder?: string;
    includeStrategy?: 'string' | 'react';
    mozjpeg?: MozjpegOptions;
    oxipng?: OxipngOptions;
    webp?: WebpOptions;
    gifsicle?: GifsicleOptions;
    svgo?: Record<string, unknown>;
    svgr?: Record<string, unknown>;
}
export interface OptionObject {
    [key: string]: any;
}
export declare const defaultFurtherLoaderOptions: {
    name: string;
    limit: number;
};
