import { Sharp } from 'sharp';
import optimizeJpeg from './jpeg';
import { LoaderOptions } from '../options';
import optimizePng from './png';

const optimizers = {
  jpeg: {
    handler: optimizeJpeg,
    optionsKey: 'mozjpeg',
  },
  png: {
    handler: optimizePng,
    optionsKey: 'oxipng',
  },
} as Record<string, { handler: (image: Sharp, options?: unknown) => Promise<Buffer>; optionsKey: string }>;

const optimizeImage = async (image: Sharp, format: string, loaderOptions: LoaderOptions): Promise<Buffer> => {
  if (optimizers[format]) {
    return optimizers[format].handler(image, (loaderOptions as Record<string, unknown>)[optimizers[format].optionsKey]);
  }

  return image.toBuffer();
};

export default optimizeImage;
