import path from 'path';
import sharp from 'sharp';
import getDominantColors, { convertRgbToHex } from '../../../lib/lqip/colors';

describe('lqip/colors', () => {
  it('converts rgb to hex', () => {
    expect(convertRgbToHex([0, 0, 0])).toBe('#000000');
    expect(convertRgbToHex([255, 255, 255])).toBe('#ffffff');
    expect(convertRgbToHex([255, 0, 0])).toBe('#ff0000');
    expect(convertRgbToHex([0, 255, 0])).toBe('#00ff00');
    expect(convertRgbToHex([0, 0, 255])).toBe('#0000ff');
    expect(convertRgbToHex([103, 171, 156])).toBe('#67ab9c');
    expect(convertRgbToHex([48, 7, 66])).toBe('#300742');
  });

  it('extracts the dominant color of a one color image', async () => {
    const image = sharp(path.resolve(__dirname, '..', '..', 'images', 'green.jpg'));
    const colors = await getDominantColors(image);

    expect(colors.length).toBeGreaterThanOrEqual(1);
    expect(colors[0]).toBe('#2cac2c');
  });

  it('extracts the dominant colors of a jpg image', async () => {
    const image = sharp(path.resolve(__dirname, '..', '..', 'images', 'medium.jpg'));
    const colors = await getDominantColors(image);

    expect(colors.length).toBeGreaterThanOrEqual(5);
    expect(colors[0]).toBe('#7a6c18');
    expect(colors[1]).toBe('#2b2308');
    expect(colors[2]).toBe('#e2e6d7');
    expect(colors[3]).toBe('#51390d');
    expect(colors[4]).toBe('#ebc57b');
  });

  it('extracts the dominant colors of a png image', async () => {
    const image = sharp(path.resolve(__dirname, '..', '..', 'images', 'medium.png'));
    const colors = await getDominantColors(image);

    expect(colors.length).toBeGreaterThanOrEqual(5);
    expect(colors[0]).toBe('#67752c');
    expect(colors[1]).toBe('#dcd2ac');
    expect(colors[2]).toBe('#0b0c07');
    expect(colors[3]).toBe('#a1a1a1');
    expect(colors[4]).toBe('#a9bc64');
  });
});
