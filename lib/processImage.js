"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sharp = _interopRequireDefault(require("sharp"));

var _optimize = _interopRequireDefault(require("./optimize"));

var _convert = _interopRequireDefault(require("./convert"));

var _colors = _interopRequireDefault(require("./lqip/colors"));

var _blur = _interopRequireDefault(require("./lqip/blur"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Processes an image by performing all steps specified in the image options
 *
 * @async
 * @param {Buffer} inputImage Input image
 * @param {{ format?: string }} imageInfo Input image metadata
 * @param {ImageOptions} imageOptions Target image options
 * @param {LoaderOptions} loaderOptions Optimized images loader options
 * @returns {{ data: Buffer | string; info: { width?: number; height?: number; format?: string } }} Processed image
 */
const processImage = async (inputImage, imageOptions, loaderOptions) => {
  // load image
  let image = (0, _sharp.default)(inputImage);
  const imageMetadata = await image.metadata(); // rotate image if necessary

  if (imageMetadata.format !== 'svg') {
    image = image.rotate();
  } // calculate blur options if lqip is requested


  if (imageOptions.lqip === 'blur') {
    (0, _blur.default)(imageMetadata, imageOptions);
  } // resize image


  if (imageOptions.resize && imageMetadata.format !== 'gif') {
    image = image.resize(imageOptions.width, imageOptions.height); // fill missing resize values

    if (typeof imageOptions.width !== 'number' || typeof imageOptions.height !== 'number') {
      const {
        info
      } = await image.toBuffer({
        resolveWithObject: true
      });

      if (typeof imageOptions.width !== 'number') {
        imageOptions.width = info.width; // eslint-disable-line no-param-reassign
      }

      if (typeof imageOptions.height !== 'number') {
        imageOptions.height = info.height; // eslint-disable-line no-param-reassign
      }
    }
  } // get lqip colors


  if (imageOptions.lqip === 'colors') {
    return {
      data: await (0, _colors.default)(image),
      info: imageMetadata
    };
  } // convert image


  if (imageOptions.convert) {
    return {
      data: await (0, _convert.default)(image, imageOptions.convert, loaderOptions),
      info: imageMetadata
    };
  } // optimize image


  if (imageMetadata.format && (imageOptions.optimize || imageMetadata.format === 'gif' && imageOptions.resize)) {
    return {
      data: await (0, _optimize.default)(image, inputImage, imageMetadata.format, imageOptions, loaderOptions),
      info: imageMetadata
    };
  } // for svg, return input image if it was not optimized


  if (imageMetadata.format === 'svg') {
    return {
      data: inputImage,
      info: imageMetadata
    };
  } // make sure original sizes are served


  if (!imageOptions.resize) {
    return {
      data: inputImage,
      info: imageMetadata
    };
  }

  return {
    data: await image.toBuffer(),
    info: imageMetadata
  };
};

var _default = processImage;
exports.default = _default;