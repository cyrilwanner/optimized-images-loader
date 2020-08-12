import path from 'path';
import fs from 'fs';
import rimraf from 'rimraf';
import { isValidCacheFolder, getCacheFolder, getHash } from '../../lib/cache';

describe('cache', () => {
  const resources = path.resolve(__dirname, '..', 'resources');

  const cleanCacheFolders = () => {
    rimraf.sync(path.resolve(resources, 'cache-valid'));
    rimraf.sync(path.resolve(resources, 'cache-invalid-parent'));
  };

  beforeAll(cleanCacheFolders);
  afterAll(cleanCacheFolders);

  it('fails when the parent folder does not exist', async () => {
    expect(await isValidCacheFolder(path.resolve(resources, 'cache-invalid-parent', 'cache'))).toBe(false);
    expect(fs.existsSync(path.resolve(resources, 'cache-invalid-parent', 'cache'))).toBe(false);
  });

  it("creates the folder if it doesn't exist yet", async () => {
    expect(fs.existsSync(path.resolve(resources, 'cache-valid'))).toBe(false);
    expect(await isValidCacheFolder(path.resolve(resources, 'cache-valid'))).toBe(true);
    expect(fs.existsSync(path.resolve(resources, 'cache-valid'))).toBe(true);
    expect(await isValidCacheFolder(path.resolve(resources, 'cache-valid'))).toBe(true);
    expect(fs.existsSync(path.resolve(resources, 'cache-valid'))).toBe(true);
  });

  it('throws an error for an invalid cache folder', async () => {
    await expect(
      getCacheFolder({ cacheFolder: path.resolve(resources, 'cache-invalid-parent', 'cache') }),
    ).rejects.toThrowError(
      /^Cache folder .*(\/|\\)cache-invalid-parent(\/|\\)cache is not writable or parent folder does not exist/,
    );
  });

  it('generates different hashes for different images', () => {
    const hash1 = getHash(Buffer.from('image1', 'utf-8'), { optimize: true, resize: false });
    const hash2 = getHash(Buffer.from('image2', 'utf-8'), { optimize: true, resize: false });

    expect(hash1).not.toBe(hash2);
    expect(hash1).toMatch(/^[a-f0-9]+-[a-f0-9]+$/);
    expect(hash2).toMatch(/^[a-f0-9]+-[a-f0-9]+$/);
  });

  it('generates different hashes for different image configs', () => {
    const hash1 = getHash(Buffer.from('image1', 'utf-8'), { optimize: true, resize: false });
    const hash2 = getHash(Buffer.from('image1', 'utf-8'), { optimize: true, resize: false, convert: 'webp' });

    expect(hash1).not.toBe(hash2);
    expect(hash1).toMatch(/^[a-f0-9]+-[a-f0-9]+$/);
    expect(hash2).toMatch(/^[a-f0-9]+-[a-f0-9]+$/);
  });

  it('generates the same hashes for the same inputs', () => {
    const hash1 = getHash(Buffer.from('image1', 'utf-8'), { optimize: true, resize: false, convert: 'webp' });
    const hash2 = getHash(Buffer.from('image1', 'utf-8'), { optimize: true, resize: false, convert: 'webp' });

    expect(hash1).toBe(hash2);
    expect(hash1).toMatch(/^[a-f0-9]+-[a-f0-9]+$/);
  });
});
