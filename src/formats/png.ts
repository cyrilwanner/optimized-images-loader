import { Sharp } from 'sharp';
import encode from '@wasm-codecs/oxipng';
import { LoaderOptions } from '../options';

const optimizePng = async (image: Sharp, options?: LoaderOptions['oxipng']): Promise<Buffer> => {
  // encode the image using @wasm-codecs/oxipng
  const output = await encode(await image.toBuffer(), options);

  return output;
};

export default optimizePng;
