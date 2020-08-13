export const getImageInfo = async (img: Element): Promise<{ size: number; mimeType: string }> => {
  const src = img.getAttribute('src');

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

export const addImage = async (name: string, src: ImgSrc): Promise<void> => {
  const replacer = (key: string, value: string): string => {
    if (key === 'src' && value.length > 100) {
      return `${value.substr(0, 100)}...`;
    }

    return value;
  };

  // insert the image with additional information into the dom
  const wrapper = document.createElement('div');
  wrapper.dataset.name = name;
  wrapper.innerHTML = `
    <h1 class="image-name">${name}</h1>
    <pre class="src-info">
${JSON.stringify(src, replacer, 4)}
    </pre>
    <pre class="result"></pre>
    ${
      Array.isArray(src)
        ? `<div class="wrapper" style="display: flex">${src
            .map((color) => `<div style="flex: 1; height: 100px; background: ${color}"></div>`)
            .join('')}</div>`
        : `<img src="${src}" alt="${name}" />`
    }
  `;
  document.body.appendChild(wrapper);

  if (Array.isArray(src)) {
    return;
  }

  // get the actual dom node
  const img = document.querySelector(`[data-name="${name}"] img`);
  if (!img) {
    throw new Error('Created image could not be found');
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
