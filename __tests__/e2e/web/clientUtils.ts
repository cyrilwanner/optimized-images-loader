export const getImageSize = async (img: Element): Promise<number> => {
  let src = img.getAttribute('src');

  if (!src) {
    throw new Error('No image src set');
  }

  if (!src && img.innerHTML) {
    return Promise.resolve(img.innerHTML.length);
  }

  if (src.startsWith('data:')) {
    return Promise.resolve(src.length);
  }

  src = window.location.href + src;

  if (performance.getEntriesByName(src)[0]) {
    return Promise.resolve((performance.getEntriesByName(src)[0] as any).transferSize); // eslint-disable-line
  }

  return new Promise((resolve) => {
    const interval = setInterval(() => {
      if (performance.getEntriesByName(src as string)[0]) {
        clearInterval(interval);
        resolve((performance.getEntriesByName(src as string)[0] as any).transferSize); // eslint-disable-line
      }
    }, 500);
  });
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
    <img src="${src}" alt="${name}" />
  `;
  document.body.appendChild(wrapper);

  // get the actual dom node
  const img = document.querySelector(`[data-name="${name}"] img`);
  if (!img) {
    throw new Error('Created image could not be found');
  }

  const size = await getImageSize(img);
  const result = {
    width: img.getBoundingClientRect().width,
    height: img.getBoundingClientRect().height,
    size,
    type: img.getAttribute('src')?.startsWith('data:') ? 'inline' : 'url',
  };

  img.parentElement!.querySelector('.result')!.innerHTML = JSON.stringify(result, replacer, 4); // eslint-disable-line
};
