import sharp from 'sharp';
import parseQuery from './parseQuery';
import { LoaderOptions } from '.';
import optimizeJpeg from './formats/jpeg';

const processImage = async (source: Buffer, resourceQuery: string, loaderOptions: LoaderOptions): Promise<Buffer> => {
  // load image
  let image = sharp(source);
  const imageMetadata = await image.metadata();

  // parse image options
  const imageOptions = parseQuery(resourceQuery, imageMetadata, loaderOptions);

  // resize image
  if (imageOptions.resize) {
    image = image.resize(imageOptions.width, imageOptions.height);
  }

  // optimize image
  if (imageOptions.optimize) {
    if (imageMetadata.format === 'jpeg') {
      return optimizeJpeg(image, loaderOptions.mozjpeg);
    }
  }

  return image.toBuffer();
};

export default processImage;
