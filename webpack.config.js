const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const config = require('./project.config');

const mode = process.env.NODE_ENV || 'development';

const entries = Object.fromEntries(
  config.pages.map((entry) => [entry.name, entry.entryPath]),
);

const date = new Date();
const update = config.ogImageUpdateParam
  ? `?update=${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}`
  : null;

const htmls = config.pages.map(
  (page) =>
    new HtmlWebpackPlugin({
      title: page.title,
      filename: page.filename,
      template: path.resolve('html', page.template || 'template.ejs'),
      chunks: [page.name],
      templateParameters: {
        description: page.description,
        ogType: page.ogType,
        origin: config.origin,
        pathname: `/${page.filename.replace(/index\.html$/, '')}`,
        update,
      },
    }),
);

const miniCssExtractPlugin = new MiniCssExtractPlugin({
  filename: `${config.cssDir}/[name].[hash].css`,
  chunkFilename: `${config.cssDir}/[id].[hash].css`,
});

const plugins = [...htmls, miniCssExtractPlugin];

// 開発のときは style-loader を使用
const styleLoaderType =
  mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader;

module.exports = {
  mode,
  entry: entries,
  output: {
    path: `${__dirname}/${config.outDir}`,
    filename: `${config.jsDir}/[name].[hash].js`,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.pcss$/,
        use: [
          styleLoaderType,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
      },
    ],
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  devServer: {
    contentBase: path.join(__dirname, config.outDir),
    port: 3000,
    host: '0.0.0.0',
    useLocalIp: true,
    disableHostCheck: true,
  },
  plugins,
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
};
