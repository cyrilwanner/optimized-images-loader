import { Sharp } from 'sharp';
import convertToWebp from './webp';
import { LoaderOptions } from '../options';

const converters = {
  webp: {
    handler: convertToWebp,
    optionsKey: 'webp',
  },
} as Record<string, { handler: (image: Sharp, options?: unknown) => Promise<Buffer>; optionsKey: string }>;

const convertImage = async (image: Sharp, targetFormat: string, loaderOptions?: LoaderOptions): Promise<Buffer> => {
  if (converters[targetFormat]) {
    return converters[targetFormat].handler(
      image,
      (loaderOptions as Record<string, unknown>)[converters[targetFormat].optionsKey],
    );
  }

  return image.toBuffer();
};

export default convertImage;
