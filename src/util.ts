import path from 'path';
import { promises as fs } from 'fs';

let version: string;

/**
 * Returns the version of optimized-images-loader
 *
 * @async
 * @returns {string} Package version
 */
export const getLoaderVersion = async (): Promise<string> => {
  if (!version) {
    const packageJson = JSON.parse((await fs.readFile(path.resolve(__dirname, '..', 'package.json'))).toString());

    version = packageJson.version;
  }

  return version;
};
