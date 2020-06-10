import { Sharp } from 'sharp';
import palette from 'get-rgba-palette';

/**
 * Converts rgb values into a hex string
 *
 * @param {number[]} rgb RGB values
 * @returns {string} HEX values
 */
export const convertRgbToHex = (rgb: number[]): string => {
  const hex = rgb.map((value) => value.toString(16));

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
const getDominantColors = async (image: Sharp): Promise<string[]> => {
  // get raw rgba pixel data
  const rawData = await image.ensureAlpha().raw().toBuffer();

  // get dominant colors
  const rgbColors = palette(rawData, 5);

  // convert rgb to hex
  const hexColors = rgbColors.map(convertRgbToHex);

  return hexColors;
};

export default getDominantColors;
