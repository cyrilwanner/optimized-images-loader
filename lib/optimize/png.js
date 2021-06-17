"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _oxipng = _interopRequireDefault(require("@wasm-codecs/oxipng"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Optimize a png image using @wasm-codecs/oxipng
 *
 * @async
 * @param {Sharp} image Sharp wrapped input image
 * @param {ImageOptions} imageOptions Image options
 * @param {LoaderOptions['oxipng']} [options] Oxipng options
 * @returns {Buffer} Optimized image
 */
const optimizePng = async (image, imageOptions, options) => {
  // encode the image using @wasm-codecs/oxipng
  return (0, _oxipng.default)(await image.toBuffer(), options);
};

var _default = optimizePng;
exports.default = _default;