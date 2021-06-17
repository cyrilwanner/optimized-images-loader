"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mozjpeg = _interopRequireDefault(require("@wasm-codecs/mozjpeg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Optimize a jpeg image using @wasm-codecs/mozjpeg
 *
 * @async
 * @param {Sharp} image Sharp wrapped input image
 * @param {ImageOptions} imageOptions Image options
 * @param {LoaderOptions['mozjpeg']} [options] Mozjpeg options
 * @returns {Buffer} Optimized image
 */
const optimizeJpeg = async (image, imageOptions, options) => {
  // convert to raw image data
  const {
    data,
    info: {
      width,
      height,
      channels
    }
  } = await image.raw().toBuffer({
    resolveWithObject: true
  }); // encode the image using @wasm-codecs/mozjpeg

  return (0, _mozjpeg.default)(data, {
    width,
    height,
    channels
  }, options);
};

var _default = optimizeJpeg;
exports.default = _default;