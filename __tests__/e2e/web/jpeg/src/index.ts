/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-unresolved */
import { addImage } from '../../clientUtils';

addImage('url-auto', require('./images/url-auto.jpg'));
addImage('url-force', require('./images/url-force.jpg?url'));
addImage('url-force-original', require('./images/url-force-original.jpg?url&original'));
addImage('inline-auto', require('./images/inline-auto.jpg'));
addImage('inline-force', require('./images/inline-force.jpg?inline'));
addImage('inline-force-original', require('./images/inline-force-original.jpg?inline&original'));
addImage('to-webp', require('./images/to-webp.jpg?webp'));
addImage('resize-width', require('./images/resize-width.jpg?width=500'));
addImage('resize-height', require('./images/resize-height.jpg?height=300'));
addImage('resize-both', require('./images/resize-both.jpg?width=400&height=400'));
addImage('lqip', require('./images/lqip.jpg?lqip'));
addImage('lqip-url', require('./images/lqip-url.jpg?lqip&url'));
addImage('colors', require('./images/colors.jpg?colors'));
addImage('multiple', require('./images/multiple.jpg?webp&width=300'));

addImage('forest-original', require('./images/forest-original.jpg?original'));
addImage('cat-original', require('./images/cat-original.jpg?original'));
