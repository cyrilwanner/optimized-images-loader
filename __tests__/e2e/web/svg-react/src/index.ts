/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-unresolved */
import React from 'react';
import ReactDOM from 'react-dom';
import IncludedSvg from './images/include.svg?include';
import IncludedSvgOriginal from './images/include-original.svg?include&original';

// include
const includeContainer = document.querySelector('[data-name="include"] .wrapper');
ReactDOM.render(React.createElement(IncludedSvg, { className: 'rendered-by-react' }), includeContainer);

// include-original
const includeOriginalContainer = document.querySelector('[data-name="include-original"] .wrapper');
ReactDOM.render(React.createElement(IncludedSvgOriginal, { className: 'rendered-by-react' }), includeOriginalContainer);
