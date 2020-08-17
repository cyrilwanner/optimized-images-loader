import webpack from 'webpack';
import { buildWepback } from '../../utils';

const build = async (): Promise<webpack.Stats> => {
  return buildWepback('disable-inlining-globally', {
    limit: -1,
  });
};

export default build;
