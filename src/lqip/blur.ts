import { ImageOptions } from '../parseQuery';

/* eslint-disable no-param-reassign */

const calculateBlurOptions = (imageInfo: { width?: number; height?: number }, imageOptions: ImageOptions): void => {
  if (!imageInfo.width || !imageInfo.height) {
    imageOptions.width = 10;
    imageOptions.height = 10;
  } else if (imageInfo.width > imageInfo.height) {
    imageOptions.width = 10;
    imageOptions.height = Math.round((10 / imageInfo.width) * imageInfo.height);
  } else {
    imageOptions.height = 10;
    imageOptions.width = Math.round((10 / imageInfo.height) * imageInfo.width);
  }
};

export default calculateBlurOptions;
