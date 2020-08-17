/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-unresolved */
import { addImage, getImageInfo } from '../../clientUtils';

addImage('dragon', require('./images/dragon.png'));
addImage('banana', require('./images/banana.svg?url'));
addImage('forest', require('./images/forest.jpg'));
addImage('space', require('./images/space.gif'));
addImage('tree', require('./images/tree.webp'));

// fetch image infos from "normal" versions
const mapping: Record<string, string> = {
  dragon: '/png/url-auto-750x535.png',
  banana: '/svg/banana-auto-560x373.svg',
  forest: '/jpeg/url-auto-640x800.jpg',
  space: '/gif/space-auto-200x150.gif',
  tree: '/webp/url-auto-1024x772.webp',
};

Object.keys(mapping).forEach((key) => {
  getImageInfo(mapping[key]).then((imageInfo) => {
    const result = document.createElement('pre');
    result.classList.add('normal-version');
    result.innerHTML = JSON.stringify(imageInfo, undefined, 4);
    document.querySelector(`[data-name="${key}"]`)?.appendChild(result);
  });
});
