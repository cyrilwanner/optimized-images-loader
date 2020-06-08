import { Sharp } from 'sharp';
import { LoaderOptions } from '../options';

const optimizeWebp = async (image: Sharp, options?: LoaderOptions['webp']): Promise<Buffer> => {
  // encode the image using sharp
  return image.webp(options).toBuffer();
};

export default optimizeWebp;
