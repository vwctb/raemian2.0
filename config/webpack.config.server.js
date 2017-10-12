'use strict';
const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const getClientEnvironment = require('./env');
const paths = require('./paths');


const publicUrl = '';
const env = getClientEnvironment(publicUrl);

module.exports = {
  entry: paths.serverRenderJs,
  // Node.js 내장 모듈과 충돌이 일어나지 않으며 require 로 불러올 수 있는 형태로 번들링합니다
  target: 'node',
  output: {
    // 정해준 서버 경로에 render.js 라는 파일명으로 저장합니다
    path: paths.server,
    filename: 'render.js',
    libraryTarget: 'commonjs2' // node 에서 불러올 수 있도록, commonjs2 스타일로 번들링 합니다
  },
  resolve: {
    modules: ['node_modules', paths.appNodeModules].concat(
      process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
    ),
    extensions: ['.js', '.json', '.jsx'],
  },
  module: {
    strictExportPresence: true,
    rules: [
        // 자바스크립트 이외의 파일들을 무시합니다.
        {
            exclude: [
                /\.(js|jsx)$/,
                /\.json$/,
                /\.css$/,
                /\.jpg$/,
                /\.png$/
            ],
            loader: 'ignore',
        },
      // 자바스크립트는 Babel 을 통하여 트랜스파일링합니다
      {
        test: /\.(js|jsx)$/,
        include: paths.appSrc,
        loader: require.resolve('babel-loader'),
        options: {
          cacheDirectory: true,
        },
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
      { 
        test: /\.(woff|woff2|eot|ttf|svg)$/, 
        loader: 'url-loader?limit=100000' 
      }, 
      {
        test: /\.css$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              // Necessary for external CSS imports to work
              // https://github.com/facebookincubator/create-react-app/issues/2677
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9', // React doesn't support IE8 anyway
                  ],
                  flexbox: 'no-2009',
                }),
              ],
            },
          },
        ],
      },


    ],
  },
  plugins: [
    // 필수 플러그인만 넣어줍니다
    new webpack.DefinePlugin(env.stringified),
    new CaseSensitivePathsPlugin(),
    new WatchMissingNodeModulesPlugin(paths.appNodeModules),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ]
};