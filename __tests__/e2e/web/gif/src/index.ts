/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-unresolved */
import { addImage } from '../../clientUtils';

addImage('url-auto', require('./images/url-auto.gif'));
addImage('url-force', require('./images/url-force.gif?url'));
addImage('url-force-original', require('./images/url-force-original.gif?url&original'));
addImage('inline-auto', require('./images/inline-auto.gif'));
addImage('inline-force', require('./images/inline-force.gif?inline'));
addImage('inline-force-original', require('./images/inline-force-original.gif?inline&original'));
addImage('resize-width', require('./images/resize-width.gif?width=150'));
addImage('resize-height', require('./images/resize-height.gif?height=75'));
addImage('resize-both', require('./images/resize-both.gif?width=125&height=125'));
addImage('lqip', require('./images/lqip.gif?lqip'));
addImage('lqip-url', require('./images/lqip-url.gif?lqip&url'));
addImage('colors', require('./images/colors.gif?colors'));

addImage('countdown-original', require('./images/countdown-original.gif?original'));
addImage('robot-original', require('./images/robot-original.gif?original'));
addImage('space-auto', require('./images/space-auto.gif'));
