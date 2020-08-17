import path from 'path';
import fs from 'fs';
import webpack from 'webpack';
import rimraf from 'rimraf';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export const buildWepback = async (
  testName: string,
  loaderOptions: Record<string, unknown> = {},
  options: { entry?: string; overwriteHtml?: boolean } = {},
): Promise<webpack.Stats> => {
  rimraf.sync(path.resolve(__dirname, 'web', testName, 'out'));

  const compiler = webpack({
    entry: path.resolve(__dirname, 'web', testName, 'src', options.entry || 'index.ts'),
    output: {
      path: path.resolve(__dirname, 'web', testName, 'out'),
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'babel-loader',
        },
        {
          test: /\.(png|jpe?g|gif|svg|webp)$/i,
          use: [
            {
              loader: path.resolve(__dirname, '..', '..', 'lib'),
              options: {
                name: '[name]-[width]x[height].[ext]',
                cacheFolder: null,
                ...loaderOptions,
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: testName,
        template: options.overwriteHtml
          ? path.resolve(__dirname, 'web', testName, 'src', 'index.ejs')
          : path.resolve(__dirname, 'web', 'index.ejs'),
      }),
    ],
    mode: 'production',
  });

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        reject(err);
      } else if (stats.hasErrors()) {
        console.log(`--- ${testName} ---`); // eslint-disable-line
        console.log(stats.toString({ colors: true })); // eslint-disable-line
        reject(new Error('compilation failed'));
      } else {
        resolve(stats);
      }
    });
  });
};

export const getTests = (): string[] => {
  return fs
    .readdirSync(path.resolve(__dirname, 'web'), { withFileTypes: true })
    .filter((file) => file.isDirectory())
    .map((file) => file.name);
};
