"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Convert an image to webp using sharp
 *
 * @async
 * @param {Sharp} image Sharp wrapped input image
 * @param {WebpOptions} [options] Webp options
 * @returns {Buffer} Converted image
 */
const convertToWebp = async (image, options) => {
  // convert the image to webp using sharp
  return image.webp(options).toBuffer();
};

var _default = convertToWebp;
exports.default = _default;