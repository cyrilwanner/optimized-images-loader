/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-unresolved */
import { addImage } from '../../clientUtils';

addImage('url-auto', require('./images/url-auto.svg'));
addImage('url-force', require('./images/url-force.svg?url'));
addImage('url-force-original', require('./images/url-force-original.svg?url&original'));
addImage('inline-auto', require('./images/inline-auto.svg'));
addImage('inline-force', require('./images/inline-force.svg?inline'));
addImage('inline-force-original', require('./images/inline-force-original.svg?inline&original'));
addImage('include', require('./images/include.svg?include'), true);
addImage('include-original', require('./images/include-original.svg?include&original'), true);
addImage('colors', require('./images/colors.svg?colors'));
addImage('multiple', require('./images/multiple.svg?webp&width=300'));

addImage('firefox-original', require('./images/firefox-original.svg?original'));
addImage('android-original', require('./images/android-original.svg?original'));
addImage('banana-auto', require('./images/banana-auto.svg?url'));
