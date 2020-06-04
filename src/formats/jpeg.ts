import { Sharp } from 'sharp';
import encode from '@wasm-codecs/mozjpeg';
import { LoaderOptions } from '..';

const optimizeJpeg = async (image: Sharp, options?: LoaderOptions['mozjpeg']): Promise<Buffer> => {
  // convert to raw image data
  const {
    data,
    info: { width, height, channels },
  } = await image.raw().toBuffer({ resolveWithObject: true });

  // encode the image using @wasm-codecs/mozjpeg
  const output = await encode(data, { width, height, channels }, options);

  return output;
};

export default optimizeJpeg;
