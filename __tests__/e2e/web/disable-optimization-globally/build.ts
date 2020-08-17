import webpack from 'webpack';
import { buildWepback } from '../../utils';

const build = async (): Promise<webpack.Stats> => {
  return buildWepback('disable-optimization-globally', {
    optimize: false,
  });
};

export default build;
