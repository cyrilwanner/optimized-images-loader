import imagemin from 'imagemin';
import { ImageminOptions } from '../options';

export async function compress(buffer: Buffer, options?: ImageminOptions) {
    if (!options) return;
    const plugins = [];

    if (options?.mozjpeg && options.mozjpeg !== false) {
        const mozjpeg = require('imagemin-mozjpeg');
        if (options.mozjpeg === true) {
            plugins.push(mozjpeg());
        } else {
            plugins.push(mozjpeg(options.mozjpeg));
        }
    }

    if (options?.optipng && options.optipng !== false) {
        const optipng = require('imagemin-optipng');
        if (options.optipng === true) {
            plugins.push(optipng());
        } else {
            plugins.push(optipng(options.optipng));
        }
    }

    if (options?.pngquant && options.pngquant !== false) {
        const pngquant = require('imagemin-pngquant');
        if (options.pngquant === true) {
            plugins.push(pngquant());
        } else {
            plugins.push(pngquant(options.pngquant));
        }
    }

    if (plugins.length === 0) return;

    return imagemin.buffer(buffer, {
        plugins,
    });
}