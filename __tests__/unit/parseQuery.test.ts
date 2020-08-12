import parseQuery from '../../lib/parseQuery';

describe('parseQuery', () => {
  it('uses default values', () => {
    const options = parseQuery('', {});
    expect(options).toStrictEqual({ optimize: true, resize: false });
  });

  it('globally disables optimization', () => {
    expect(parseQuery('', { optimize: false }).optimize).toBe(false);
  });

  it('works with leading questionmark', () => {
    expect(parseQuery('inline', {}).forceInline).toBe(true);
    expect(parseQuery('?inline', {}).forceInline).toBe(true);
  });

  it('parses ?original query', () => {
    expect(parseQuery('?original', {})).toStrictEqual({
      optimize: false,
      resize: false,
    });
  });

  it('parses ?inline query', () => {
    expect(parseQuery('?inline', {})).toStrictEqual({
      optimize: true,
      resize: false,
      forceInline: true,
    });
  });

  it('parses ?url query', () => {
    expect(parseQuery('?url', {})).toStrictEqual({
      optimize: true,
      resize: false,
      forceUrl: true,
    });
  });

  it('parses ?include query', () => {
    expect(parseQuery('?include', {})).toStrictEqual({
      optimize: true,
      resize: false,
      processLoaders: false,
    });
  });

  it('parses ?include query with react component', () => {
    expect(parseQuery('?include', { includeStrategy: 'react' })).toStrictEqual({
      optimize: true,
      resize: false,
      processLoaders: false,
      component: 'react',
    });
  });

  it('parses ?width query', () => {
    expect(parseQuery('?width=1250', {})).toStrictEqual({
      optimize: true,
      resize: true,
      width: 1250,
    });
  });

  it('parses ?height query', () => {
    expect(parseQuery('?height=720', {})).toStrictEqual({
      optimize: true,
      resize: true,
      height: 720,
    });
  });

  it('parses ?width and ?height query', () => {
    expect(parseQuery('?width=1100&height=300', {})).toStrictEqual({
      optimize: true,
      resize: true,
      width: 1100,
      height: 300,
    });
  });

  it('parses ?webp query', () => {
    expect(parseQuery('?webp', {})).toStrictEqual({
      optimize: true,
      resize: false,
      convert: 'webp',
    });
  });

  it('parses ?lqip query', () => {
    expect(parseQuery('?lqip', {})).toStrictEqual({
      optimize: false,
      resize: true,
      lqip: 'blur',
    });
  });

  it('parses ?colors query', () => {
    expect(parseQuery('?colors', {})).toStrictEqual({
      optimize: false,
      resize: false,
      processLoaders: false,
      lqip: 'colors',
    });
  });

  it('ignores unknown query params', () => {
    expect(parseQuery('?webp&unkown=true&abc', {})).toStrictEqual({
      optimize: true,
      resize: false,
      convert: 'webp',
    });
  });

  it('parses multiple query params', () => {
    expect(parseQuery('?original&url&width=1050&webp', {})).toStrictEqual({
      optimize: false,
      resize: true,
      forceUrl: true,
      width: 1050,
      convert: 'webp',
    });
  });
});
