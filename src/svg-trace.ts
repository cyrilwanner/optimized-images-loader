import { Sharp } from 'sharp';
import SVGO from 'svgo';
import potrace from 'potrace';
import { promisify } from 'util';
import { ImageOptions } from './parseQuery';

const trace = promisify(potrace.trace);

// Use the other one?
/**
 * Optimizes an svg string. Based from `gatsby-image`.
 * @param svg The svg string.
 */
const optimize = (svg: string): Promise<string> => {
  const svgo = new SVGO({
    floatPrecision: 0,
    plugins: [
      { removeViewBox: false },
      {
        addAttributesToSVGElement: {
          attributes: [
            {
              preserveAspectRatio: `none`,
            },
          ],
        },
      },
    ],
  });

  return svgo.optimize(svg).then(({ data }) => data);
};

export async function traceSvg(image: Sharp, imageOptions: ImageOptions): Promise<string> {
  // TODO: custom options
  const optionsSvg = {
    color: 'lightgray',
    optTolerance: 0.4,
    turdSize: 100,
    turnPolicy: potrace.Potrace.TURNPOLICY_MAJORITY,
  };

  const transformed = await image
    .resize(imageOptions.width, imageOptions.height, {
      // position: imageOptions.cropFocus,
    })
    .png({
      compressionLevel: 9, // imageOptions.pngCompressionLevel,
      adaptiveFiltering: false,
      force: false, // imageOptions.toFormat === `png`,
    })
    .jpeg({
      quality: 80, // imageOptions.quality,
      progressive: true, // imageOptions.jpegProgressive,
      force: false, // options.toFormat === `jpg`,
    })
    .toBuffer();

  return trace(transformed, optionsSvg).then(optimize);
}
