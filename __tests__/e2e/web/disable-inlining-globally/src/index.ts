/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-unresolved */
import { addImage } from '../../clientUtils';

addImage('url-auto-jpeg', require('./images/url-auto.jpg'));
addImage('inline-force-jpeg', require('./images/inline-force.jpg?inline'));
addImage('url-auto-png', require('./images/url-auto.png'));
addImage('inline-force-png', require('./images/inline-force.png?inline'));
addImage('url-auto-gif', require('./images/url-auto.gif'));
addImage('inline-force-gif', require('./images/inline-force.gif?inline'));
addImage('url-auto-svg', require('./images/url-auto.svg'));
addImage('inline-force-svg', require('./images/inline-force.svg?inline'));
addImage('url-auto-webp', require('./images/url-auto.webp'));
addImage('inline-force-webp', require('./images/inline-force.webp?inline'));
