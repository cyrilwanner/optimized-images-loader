/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-unresolved */
import { addImage } from '../../clientUtils';

addImage('url-auto', require('./images/url-auto.webp'));
addImage('url-force', require('./images/url-force.webp?url'));
addImage('url-force-original', require('./images/url-force-original.webp?url&original'));
addImage('inline-auto', require('./images/inline-auto.webp'));
addImage('inline-force', require('./images/inline-force.webp?inline'));
addImage('inline-force-original', require('./images/inline-force-original.webp?inline&original'));
addImage('resize-width', require('./images/resize-width.webp?width=500'));
addImage('resize-height', require('./images/resize-height.webp?height=300'));
addImage('resize-both', require('./images/resize-both.webp?width=400&height=400'));
addImage('lqip', require('./images/lqip.webp?lqip'));
addImage('lqip-url', require('./images/lqip-url.webp?lqip&url'));
addImage('colors', require('./images/colors.webp?colors'));

addImage('tree-original', require('./images/tree-original.webp?original'));
addImage('cat-original', require('./images/cat-original.webp?original'));
