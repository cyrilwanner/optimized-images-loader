import webpack from 'webpack';
import { buildWepback } from '../../utils';

const build = async (): Promise<webpack.Stats> => {
  return buildWepback('png');
};

export default build;
