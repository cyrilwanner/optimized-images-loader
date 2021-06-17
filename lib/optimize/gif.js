"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sharp = _interopRequireDefault(require("sharp"));

var _gifsicle = _interopRequireDefault(require("@wasm-codecs/gifsicle"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Optimize a gif image using gifsicle
 *
 * @async
 * @param {Buffer} image Input image
 * @param {ImageOptions} imageOptions Image options
 * @param {LoaderOptions['gifsicle']} [options] Gifsicle options
 * @returns {Buffer} Optimized image
 */
const optimizeGif = async (image, imageOptions, options) => {
  const encodeOptions = options || {};

  if (imageOptions.resize) {
    if (imageOptions.width) {
      encodeOptions.width = imageOptions.width;
    }

    if (imageOptions.height) {
      encodeOptions.height = imageOptions.height;
    }
  } // optimize the image using gifsicle


  const encodedImage = await (0, _gifsicle.default)(image, encodeOptions); // fill missing resize values in case the image was resized

  if (imageOptions.resize) {
    const imageData = await (0, _sharp.default)(encodedImage).metadata();
    imageOptions.width = imageData.width; // eslint-disable-line no-param-reassign

    imageOptions.height = imageData.height; // eslint-disable-line no-param-reassign
  }

  return encodedImage;
};

var _default = optimizeGif;
exports.default = _default;