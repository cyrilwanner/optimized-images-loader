# optimized-images-loader [![npm version](https://badgen.net/npm/v/optimized-images-loader)](https://www.npmjs.com/package/optimized-images-loader) [![license](https://badgen.net/github/license/cyrilwanner/optimized-images-loader)](https://github.com/cyrilwanner/optimized-images-loader/blob/master/LICENSE) [![downloads](https://badgen.net/npm/dt/optimized-images-loader)](https://www.npmjs.com/package/optimized-images-loader)

Features:
- **Optimize** images using WebAssembly (runs in every environment)
- **Image manipulation** provided by various query params (resize, converting, low quality placeholders, ...)
- **Build cache for images** for faster builds
- **Convert to WebP** automatically during a webpack build
- **Inline** small images automatically
- ...

## Table of contents

- [Installation](#installation)
- [Options](#options)
- [Usage](#usage)
- [License](#license)

## Installation

```
npm install optimized-images-loader
```

Add the loader to your webpack configuration:

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        use: [
          {
            loader: 'optimized-images-loader',
            options: {
              // see below for available options
            },
          },
        ],
      },
    ],
  },
};
```

## Options

| Option | Default | Type | Description |
| :--- | :------: | :--: | :---------- |
| limit | `8192` | `number` | Images smaller than this number (in bytes) will get inlined with a data-uri. |
| optimize | `true` | `boolean` | If this plugin should not optimized images, set this to `false`. You can still resize images, convert them to WebP and use other features in that case. |
| cacheFolder | `'node_modules/optimized-images-loader/.cache'` | `string` | Images will be cached in this folder to avoid long build times. |
| includeStrategy | `string` | `'string'` | When using the [?include](#include) query param, it returns a string by default. By setting this value to `'react'`, it returns a React component instead (requires manually installing the additional `@svgr/core` package). |
| name | `'[name]-[contenthash].[ext]'` | `string` | File name of the images after they got processed. Additionally to the [default placeholders](https://github.com/webpack-contrib/file-loader#placeholders), `[width]` and `[height]` are also available. |
| outputPath | | `string` | Images will be saved in this directory instead of the default webpack outputPath. |
| publicPath | | `string` | The public path that should be used for image URLs instead of the default webpack publicPath. |
| mozjpeg | | `MozjpegOptions` | Specifies the options used to optimize jpeg images. All available options can be seen [here](https://www.npmjs.com/package/@wasm-codecs/mozjpeg#encodeoptions-encodeoptions). |
| oxipng | | `OxipngOptions` | Specifies the options used to optimize png images. All available options can be seen [here](https://www.npmjs.com/package/@wasm-codecs/oxipng#encodeoptions-encodeoptions). |
| webp | | `WebpOptions` | Specifies the options used to optimize webp images. All available options can be seen [here](https://sharp.pixelplumbing.com/api-output#webp). |
| svgo | | `SvgoOptions` | Specifies the options used to optimize svg images. All available options can be seen [here](https://github.com/svg/svgo#what-it-can-do). |

## Usage

You can now simply import images in your projects the same way as you would import source code.

```javascript
import Header from './images/header.jpg';

export default () => (
  <div>
    <img src={Header} />
  </div>
);
```

This loader also provides a variety of query params to provide you even more options:

* [`?include`](#include): Include the raw file directly (useful for SVG icons)
* [`?webp`](#webp): Convert an image to WebP on the fly
* [`?inline`](#inline): Force inlining an image (data-uri)
* [`?url`](#url): Force an URL for a small image (instead of data-uri)
* [`?original`](#original): Use the original image and do not optimize it
* [`?lqip`](#lqip): Generate a low quality image placeholder
* [`?colors`](#colors): Extract the dominant colors of an image
* [`?width`](#width): Resize an image to the given width
* [`?height`](#height): Resize an image to the given height
* [`?trace`](#trace): Use traced outlines as loading placeholder *(currently not supported)*
* [`?sprite`](#sprite): Use SVG sprites *(currently not supported)*

#### ?include

The image will now directly be included in your HTML without a data-uri or a reference to your file.

By default, it will be included as a normal `string`. If you are in a React project and wish to transform it into a React component, set the [`includeStrategy`](#options) to `'react'` and run `npm install @svgr/core`.

#### ?webp

If this `?webp` query parameter is specified, `optimized-images-loader` automatically converts the image to the new WebP format.

For browsers that don't yet support WebP, you may want to also provide a fallback using the `<picture>` tag or use the [`Img`](#img) component which does this out of the box:

#### ?inline

You can specify a [limit for inlining](#inlineimagelimit) images which will include it as a data-uri directly in your content instead of referencing a file if the file size is below that limit.

You usually don't want to specify a too high limit but there may be cases where you still want to inline larger images.

In this case, you don't have to set the global limit to a higher value but you can add an exception for a single image using the `?inline` query options.

#### ?url

When you have an image smaller than your defined [limit for inlining](#inlineimagelimit), it normally gets inlined automatically.
If you don't want a specific small file to get inlined, you can use the `?url` query param to always get back an image URL, regardless of the inline limit.

#### ?original

The image won't get optimized and used as it is.
It makes sense to use this query param if you know an image already got optimized (e.g. during export) so it doesn't get optimized again a second time.

#### ?lqip

When using this resource query, a very small (about 10x10 pixel) image gets created.
You can then display this image as a placeholder until the real (big) image has loaded.

#### ?colors

This resource query returns you an **array with hex values** of the dominant colors of an image.
You can also use this as a placeholder until the real image has loaded (e.g. as a background) like the *Google Picture Search* does.

The number of colors returned can vary and depends on how many different colors your image has.

```javascript
import React from 'react';

export default () => (
  <div style={{ backgroundColor: require('./images/my-image.jpg?colors')[0] }}>...</div>
);

/**
 * require('./images/my-image.jpg?colors')
 *
 * returns for example
 *
 * ['#0e648d', '#5f94b5', '#a7bbcb', '#223240', '#a4c3dc', '#1b6c9c']
 */
```

#### ?trace

> Currently not supported

With the `?trace` resource query, you can generate [SVG image outlines](https://twitter.com/mikaelainalem/status/918213244954861569) which can be used as a placeholder while loading the original image.

#### ?width

Resizes the source image to the given width. If a height is additionally specified, it ensures the image covers both sizes and crops the remaining parts. If no height is specified, it will be automatically calculated to preserve the image aspect ratio.

```javascript
import React from 'react';
import Image from './images/my-image.jpg?width=800';
import Thumbnail from './images/my-image.jpg?width=300&height=300';

export default () => (
  <div>
    <img src={Image} />
    <img src={Thumbnail} />
  </div>
);
```

#### ?height

Resizes the source image to the given height. If a width is additionally specified, it ensures the image covers both sizes and crops the remaining parts. If no width is specified, it will be automatically calculated to preserve the image aspect ratio.

```javascript
import React from 'react';
import Image from './images/my-image.jpg?height=800';
import Thumbnail from './images/my-image.jpg?width=300&height=300';

export default () => (
  <div>
    <img src={Image} />
    <img src={Thumbnail} />
  </div>
);
```

#### ?sprite

> Currently not supported

TODO: needs general documentation

## License

Licensed under the [MIT](https://github.com/cyrilwanner/optimized-images-loader/blob/master/LICENSE) license.

© Copyright Cyril Wanner
