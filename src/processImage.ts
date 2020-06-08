import { Sharp } from 'sharp';
import { ImageOptions } from './parseQuery';
import { LoaderOptions } from './options';
import optimizeImage from './formats';

const processImage = async (
  inputImage: Sharp,
  imageInfo: { format?: string },
  imageOptions: ImageOptions,
  loaderOptions: LoaderOptions,
): Promise<Buffer> => {
  let image = inputImage;

  // resize image
  if (imageOptions.resize) {
    image = image.resize(imageOptions.width, imageOptions.height);
  }

  // optimize image
  if (imageOptions.optimize && imageInfo.format) {
    return optimizeImage(image, imageInfo.format, loaderOptions);
  }

  return image.toBuffer();
};

export default processImage;
