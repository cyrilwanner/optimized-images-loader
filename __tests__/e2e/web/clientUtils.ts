export const getImageInfo = async (img: Element | string): Promise<{ size: number; mimeType: string }> => {
  let src;
  if (typeof img === 'string') {
    src = img;
  } else {
    src = img.getAttribute('src');
  }

  if (!src) {
    throw new Error('No image src set');
  }

  if (src.startsWith('data:')) {
    return Promise.resolve({
      mimeType: src.split(';')[0].split(':')[1],
      size: src.length,
    });
  }

  const res = await fetch(src);
  const mimeType = res.headers.get('Content-Type') || 'unknown';

  return {
    mimeType,
    size: (await res.arrayBuffer()).byteLength,
  };
};

export const addImage = async (name: string, src: ImgSrc, include?: boolean): Promise<void> => {
  const replacer = (key: string, value: string): string => {
    if (key === 'src' && include) {
      return '{included}';
    }

    if (key === 'src' && value.length > 100) {
      return `${value.substr(0, 100)}...`;
    }

    return value;
  };

  let imgElement;

  if (Array.isArray(src)) {
    imgElement = `<div class="wrapper" style="display: flex">${src
      .map((color) => `<div style="flex: 1; height: 100px; background: ${color}"></div>`)
      .join('')}</div>`;
  } else if (include) {
    imgElement = `<div class="wrapper">${src}</div>`;
  } else {
    imgElement = `<img src="${src}" alt="${name}" />`;
  }

  // insert the image with additional information into the dom
  const wrapper = document.createElement('div');
  wrapper.dataset.name = name;
  wrapper.innerHTML = `
    <h1 class="image-name">${name}</h1>
    <pre class="src-info">
${JSON.stringify(src, replacer, 4)}
    </pre>
    <pre class="result"></pre>
    ${imgElement}
  `;
  document.body.appendChild(wrapper);

  if (Array.isArray(src) || include) {
    return;
  }

  // get the actual dom node
  const img = document.querySelector(`[data-name="${name}"] img`);
  if (!img) {
    throw new Error(`Created image could not be found (${name})`);
  }

  const info = await getImageInfo(img);
  setTimeout(() => {
    const result = {
      width: img.getBoundingClientRect().width,
      height: img.getBoundingClientRect().height,
      size: info.size,
      mimeType: info.mimeType,
      type: img.getAttribute('src')?.startsWith('data:') ? 'inline' : 'url',
    };

    img.parentElement!.querySelector('.result')!.innerHTML = JSON.stringify(result, replacer, 4); // eslint-disable-line
  }, 100);
};
