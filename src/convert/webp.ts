import { Sharp, WebpOptions } from 'sharp';

const convertToWebp = async (image: Sharp, options?: WebpOptions): Promise<Buffer> => {
  // convert the image to webp using sharp
  return image.webp(options).toBuffer();
};

export default convertToWebp;
