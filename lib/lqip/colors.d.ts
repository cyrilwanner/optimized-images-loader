import { Sharp } from 'sharp';
/**
 * Converts rgb values into a hex string
 *
 * @param {number[]} rgb RGB values
 * @returns {string} HEX values
 */
export declare const convertRgbToHex: (rgb: number[]) => string;
/**
 * Extract the dominant colors of an image
 *
 * @async
 * @param {Sharp} image Sharp wrapped input image
 * @returns {string[]}
 */
declare const getDominantColors: (image: Sharp) => Promise<string[]>;
export default getDominantColors;
