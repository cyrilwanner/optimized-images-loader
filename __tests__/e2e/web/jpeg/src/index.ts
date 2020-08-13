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

addImage('forest-original', require('./images/forest-original.jpg?original'));
addImage('cat-original', require('./images/cat-original.jpg?original'));
