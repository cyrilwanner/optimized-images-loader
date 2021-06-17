"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jpeg = _interopRequireDefault(require("./jpeg"));

var _png = _interopRequireDefault(require("./png"));

var _webp = _interopRequireDefault(require("./webp"));

var _svg = _interopRequireDefault(require("./svg"));

var _gif = _interopRequireDefault(require("./gif"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const sharpBasedOptimizers = {
  jpeg: {
    handler: _jpeg.default,
    optionsKey: 'mozjpeg'
  },
  png: {
    handler: _png.default,
    optionsKey: 'oxipng'
  },
  webp: {
    handler: _webp.default,
    optionsKey: 'webp'
  }
};
const rawBufferBasedOptimizers = {
  svg: {
    handler: _svg.default,
    optionsKey: 'svgo'
  },
  gif: {
    handler: _gif.default,
    optionsKey: 'gifsicle'
  }
};
/**
 * Optimize the given input image if an optimizer exists for the image format
 *
 * @async
 * @param {Sharp} image Sharp wrapped input image
 * @param {Buffer} rawImage Raw input image
 * @param {string} format Format of the input image
 * @param {LoaderOptions} loaderOptions Optimized images loader options
 * @returns {Buffer} Optimized image
 */

const optimizeImage = async (image, rawImage, format, imageOptions, loaderOptions) => {
  if (sharpBasedOptimizers[format]) {
    return sharpBasedOptimizers[format].handler(image, imageOptions, loaderOptions[sharpBasedOptimizers[format].optionsKey]);
  }

  if (rawBufferBasedOptimizers[format]) {
    return rawBufferBasedOptimizers[format].handler(rawImage, imageOptions, loaderOptions[rawBufferBasedOptimizers[format].optionsKey]);
  }

  return image.toBuffer();
};

var _default = optimizeImage;
exports.default = _default;