"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLoaderVersion = void 0;

var _path = _interopRequireDefault(require("path"));

var _fs = require("fs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let version;
/**
 * Returns the version of optimized-images-loader
 *
 * @async
 * @returns {string} Package version
 */

const getLoaderVersion = async () => {
  if (!version) {
    const packageJson = JSON.parse((await _fs.promises.readFile(_path.default.resolve(__dirname, '..', 'package.json'))).toString());
    version = packageJson.version;
  }

  return version;
};

exports.getLoaderVersion = getLoaderVersion;