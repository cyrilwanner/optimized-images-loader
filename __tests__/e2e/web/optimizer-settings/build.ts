import webpack from 'webpack';
import { buildWepback } from '../../utils';

const build = async (): Promise<webpack.Stats> => {
  return buildWepback('optimizer-settings', {
    mozjpeg: { quality: 10 },
    oxipng: { level: 0 },
    webp: { quality: 10 },
    svgo: {
      plugins: [{ cleanupAttrs: false }, { inlineStyles: false }, { removeComments: false }, { removeMetadata: false }],
    },
    gifsicle: { colors: 32 },
  });
};

export default build;
