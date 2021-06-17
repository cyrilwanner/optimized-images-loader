"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Optimize a webp image using sharp
 *
 * @async
 * @param {Sharp} image Sharp wrapped input image
 * @param {ImageOptions} imageOptions Image options
 * @param {LoaderOptions['webp']} [options] Webp options
 * @returns {Buffer} Optimized image
 */
const optimizeWebp = async (image, imageOptions, options) => {
  // encode the image using sharp
  return image.webp(options).toBuffer();
};

var _default = optimizeWebp;
exports.default = _default;