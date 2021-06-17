"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.convertRgbToHex = void 0;

var _getRgbaPalette = _interopRequireDefault(require("get-rgba-palette"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Converts rgb values into a hex string
 *
 * @param {number[]} rgb RGB values
 * @returns {string} HEX values
 */
const convertRgbToHex = rgb => {
  const hex = rgb.map(value => value.toString(16));

  for (let i = 0; i < hex.length; i += 1) {
    if (hex[i].length === 1) {
      hex[i] = `0${hex[i]}`;
    }
  }

  return `#${hex.join('')}`;
};
/**
 * Extract the dominant colors of an image
 *
 * @async
 * @param {Sharp} image Sharp wrapped input image
 * @returns {string[]}
 */


exports.convertRgbToHex = convertRgbToHex;

const getDominantColors = async image => {
  // get raw rgba pixel data
  const rawData = await image.ensureAlpha().raw().toBuffer(); // get dominant colors

  const rgbColors = (0, _getRgbaPalette.default)(rawData, 5); // convert rgb to hex

  const hexColors = rgbColors.map(convertRgbToHex);
  return hexColors;
};

var _default = getDominantColors;
exports.default = _default;