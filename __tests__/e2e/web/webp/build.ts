import webpack from 'webpack';
import { buildWepback } from '../../utils';

const build = async (): Promise<webpack.Stats> => {
  return buildWepback('webp');
};

export default build;
