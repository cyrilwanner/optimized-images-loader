"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setCache = exports.getCache = exports.getHash = void 0;

var _path = _interopRequireDefault(require("path"));

var _os = _interopRequireDefault(require("os"));

var _fs = require("fs");

var _querystring = _interopRequireDefault(require("querystring"));

var _loaderUtils = require("loader-utils");

var _util = require("./util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Checks if the given cache folder is valid and writable
 *
 * @async
 * @param {string} cacheFolder Cache folder
 * @returns {boolean} Whether the cache folder is valid
 */
const isValidCacheFolder = async cacheFolder => {
  // try accessing the parent folder
  try {
    await _fs.promises.access(_path.default.dirname(cacheFolder));
  } catch {
    return false;
  } // check if the folder already exists


  try {
    await _fs.promises.access(cacheFolder, _fs.constants.W_OK);
    return true;
  } catch {
    // otherwise try to create the cache folder
    try {
      await _fs.promises.mkdir(cacheFolder);
      return true;
    } catch (e) {
      return e.code === 'EEXIST';
    }
  }
};
/**
 * Determines the correct cache folder to use
 *
 * @async
 * @param {LoaderOptions} loaderOptions Optimized images loader options
 * @returns {string} Cache folder path
 */


const getCacheFolder = async loaderOptions => {
  let cacheFolder = loaderOptions.cacheFolder || _path.default.resolve(__dirname, '..', '.cache');

  if (await isValidCacheFolder(cacheFolder)) {
    return cacheFolder;
  }

  if (!loaderOptions.cacheFolder) {
    cacheFolder = _path.default.resolve(_os.default.tmpdir(), 'optimized-images-loader');

    if (await isValidCacheFolder(cacheFolder)) {
      return cacheFolder;
    }
  }

  throw new Error(`Cache folder ${cacheFolder} is not writable or parent folder does not exist`);
};
/**
 * Calculates a hash for the given image and query string
 *
 * @param {Buffer} source Source image
 * @param {ImageOptions} imageOptions Image options
 * @returns {string} Hash
 */


const getHash = (source, imageOptions) => {
  const query = _querystring.default.stringify(imageOptions); // eslint-disable-line


  return `${(0, _loaderUtils.getHashDigest)(source)}-${(0, _loaderUtils.getHashDigest)(Buffer.from(query))}`;
};
/**
 * Retrieves an optimized image from cache if it exists
 *
 * @async
 * @param {string} hash Cache hash
 * @param {LoaderOptions} loaderOptions Optimized images loader options
 * @returns {{ data: Buffer | string | string[]; info: { width?: number; height?: number; format?: string }, imageOptions: ImageOptions } | null} Cached image or null if not present
 */


exports.getHash = getHash;

const getCache = async (hash, loaderOptions) => {
  const cacheFolder = await getCacheFolder(loaderOptions);

  try {
    const options = JSON.parse((await _fs.promises.readFile(_path.default.resolve(cacheFolder, `${hash}.json`))).toString()); // make sure the cache file was created for the current version

    if (options.version !== (await (0, _util.getLoaderVersion)())) {
      return null;
    }

    const data = await _fs.promises.readFile(_path.default.resolve(cacheFolder, hash));

    if (options.isBuffer) {
      return {
        data,
        info: options.info,
        imageOptions: options.imageOptions
      };
    }

    return {
      data: JSON.parse(data.toString()),
      info: options.info,
      imageOptions: options.imageOptions
    };
  } catch {
    return null;
  }
};
/**
 * Writes an optimized image into the cache
 *
 * @async
 * @param {string} hash Cache hash
 * @param {Buffer | string | string[]} result Optimized image
 * @param {{ width?: number; height?: number; format?: string }} info Image information
 * @param {ImageOptions} imageOptions Image options
 * @param {LoaderOptions} loaderOptions Optimized images loader options
 */


exports.getCache = getCache;

const setCache = async (hash, result, {
  width,
  height,
  format
}, imageOptions, loaderOptions) => {
  const cacheFolder = await getCacheFolder(loaderOptions);

  if (Buffer.isBuffer(result)) {
    await _fs.promises.writeFile(_path.default.resolve(cacheFolder, hash), result);
  } else {
    await _fs.promises.writeFile(_path.default.resolve(cacheFolder, hash), JSON.stringify(result));
  }

  await _fs.promises.writeFile(_path.default.resolve(cacheFolder, `${hash}.json`), JSON.stringify({
    imageOptions,
    info: {
      width,
      height,
      format
    },
    isBuffer: Buffer.isBuffer(result),
    version: await (0, _util.getLoaderVersion)()
  }));
};

exports.setCache = setCache;