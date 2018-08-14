import * as webpack from 'webpack';
import * as path from 'path';
import * as nodeExternals from 'webpack-node-externals';
import tsConfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import EntryRunnerWebpackPlugin from 'entry-runner-webpack-plugin';

const config: webpack.Configuration = {
  entry: ['webpack/hot/poll?1000', './main.hmr.ts'],
  target: 'node',
  context: path.resolve('./src'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'server.js',
  },
  externals: [
    nodeExternals({
      whitelist: ['webpack/hot/poll?1000'],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  mode: 'development',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [new tsConfigPathsPlugin()],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new EntryRunnerWebpackPlugin(path.resolve(__dirname), 'server.js'),
  ],
};

export default config;