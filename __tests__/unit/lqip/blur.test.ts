import calculateBlurOptions from '../../../lib/lqip/blur';

describe('lqip/blur', () => {
  it('calculates blur sizes for a landscape image', () => {
    const options = calculateBlurOptions({ width: 1024, height: 700 }, { optimize: false, resize: false });
    expect(options.width).toBe(10);
    expect(options.height).toBe(7);
  });

  it('calculates blur sizes for a portrait image', () => {
    const options = calculateBlurOptions({ width: 500, height: 950 }, { optimize: false, resize: false });
    expect(options.width).toBe(5);
    expect(options.height).toBe(10);
  });

  it('calculates blur sizes for a square', () => {
    const options = calculateBlurOptions({ width: 789, height: 789 }, { optimize: false, resize: false });
    expect(options.width).toBe(10);
    expect(options.height).toBe(10);
  });

  it('uses default sizes if no dimensions given', () => {
    const options = calculateBlurOptions({}, { optimize: false, resize: false });
    expect(options.width).toBe(10);
    expect(options.height).toBe(10);
  });

  it('uses default sizes if only width is given', () => {
    const options = calculateBlurOptions({ width: 1000 }, { optimize: false, resize: false });
    expect(options.width).toBe(10);
    expect(options.height).toBe(10);
  });

  it('uses default sizes if only height is given', () => {
    const options = calculateBlurOptions({ height: 1000 }, { optimize: false, resize: false });
    expect(options.width).toBe(10);
    expect(options.height).toBe(10);
  });
});
