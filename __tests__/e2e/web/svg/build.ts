import webpack from 'webpack';
import { buildWepback } from '../../utils';

const build = async (): Promise<webpack.Stats> => {
  return buildWepback('svg');
};

export default build;
