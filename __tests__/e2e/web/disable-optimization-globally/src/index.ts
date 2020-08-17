/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-unresolved */
import { addImage } from '../../clientUtils';

addImage('original-jpeg', require('./images/original.jpg'));
addImage('original-force-jpeg', require('./images/original-force.jpg?original'));
addImage('original-png', require('./images/original.png'));
addImage('original-force-png', require('./images/original-force.png?original'));
addImage('original-gif', require('./images/original.gif'));
addImage('original-force-gif', require('./images/original-force.gif?original'));
addImage('original-svg', require('./images/original.svg'));
addImage('original-force-svg', require('./images/original-force.svg?original'));
addImage('original-webp', require('./images/original.webp'));
addImage('original-force-webp', require('./images/original-force.webp?original'));
