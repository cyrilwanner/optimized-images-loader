/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-unresolved */
import { addImage } from '../../clientUtils';

addImage('url-auto', require('./images/url-auto.png'));
addImage('url-force', require('./images/url-force.png?url'));
addImage('url-force-original', require('./images/url-force-original.png?url&original'));
addImage('inline-auto', require('./images/inline-auto.png'));
addImage('inline-force', require('./images/inline-force.png?inline'));
addImage('inline-force-original', require('./images/inline-force-original.png?inline&original'));
addImage('to-webp', require('./images/to-webp.png?webp'));
addImage('resize-width', require('./images/resize-width.png?width=500'));
addImage('resize-height', require('./images/resize-height.png?height=300'));
addImage('resize-both', require('./images/resize-both.png?width=400&height=400'));
addImage('lqip', require('./images/lqip.png?lqip'));
addImage('lqip-url', require('./images/lqip-url.png?lqip&url'));
addImage('colors', require('./images/colors.png?colors'));
addImage('multiple', require('./images/multiple.png?webp&width=300'));

addImage('dragon-original', require('./images/dragon-original.png?original'));
addImage('emoji-original', require('./images/emoji-original.png?original'));
