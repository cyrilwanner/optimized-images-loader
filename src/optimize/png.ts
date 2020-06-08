import { Sharp } from 'sharp';
import encode from '@wasm-codecs/oxipng';
import { LoaderOptions } from '../options';

const optimizePng = async (image: Sharp, options?: LoaderOptions['oxipng']): Promise<Buffer> => {
  // encode the image using @wasm-codecs/oxipng
  return encode(await image.toBuffer(), options);
};

export default optimizePng;
