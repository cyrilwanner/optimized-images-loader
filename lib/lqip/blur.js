"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/* eslint-disable no-param-reassign */
const calculateBlurOptions = (imageInfo, imageOptions) => {
  if (!imageInfo.width || !imageInfo.height) {
    imageOptions.width = 10;
    imageOptions.height = 10;
  } else if (imageInfo.width > imageInfo.height) {
    imageOptions.width = 10;
    imageOptions.height = Math.round(10 / imageInfo.width * imageInfo.height);
  } else {
    imageOptions.height = 10;
    imageOptions.width = Math.round(10 / imageInfo.height * imageInfo.width);
  }
};

var _default = calculateBlurOptions;
exports.default = _default;