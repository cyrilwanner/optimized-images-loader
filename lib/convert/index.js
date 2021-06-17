"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _webp = _interopRequireDefault(require("./webp"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const converters = {
  webp: {
    handler: _webp.default,
    optionsKey: 'webp'
  }
};
/**
 * Convert an input image into the given format if a convert exists for that format
 *
 * @async
 * @param {Sharp} image Sharp wrapped input image
 * @param {string} targetFormat Target image format
 * @param {LoaderOptions} loaderOptions Optimized images loader options
 * @returns {Buffer} Converted image
 */

const convertImage = async (image, targetFormat, loaderOptions) => {
  if (converters[targetFormat]) {
    return converters[targetFormat].handler(image, loaderOptions[converters[targetFormat].optionsKey]);
  }

  return image.toBuffer();
};

var _default = convertImage;
exports.default = _default;