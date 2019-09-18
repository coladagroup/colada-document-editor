const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin')
const FileManagerPlugin = require('filemanager-webpack-plugin')

const config = {
  entry: ['@babel/polyfill', './src/index.js'],
  devtool: 'source-map',
  output: {
    path: path.resolve('build'),
    filename: '[name].[hash:8].js',
    chunkFilename: '[name].[chunkhash:8].chunk.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: 'global',
              importLoaders: 1,
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: 'global',
              importLoaders: 1,
              sourceMap: true
            },
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        issuer: /\.s?css$/,
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.svg$/,
        issuer: /\.js?$/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'react-svg-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new HTMLPlugin({
      template: 'public/index.html',
      hash: true,
      inject: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new FileManagerPlugin({
      onStart: [
        {
          delete: [
            './docs',
            './build'
          ]
        }
      ],
      onEnd: [
        {
          copy: [
            { source: './public/favicon.ico', destination: './docs' },
            { source: './build/**/*.{html,js}', destination: './docs' }
          ]
        },
        {
          delete: [
            './build'
          ]
        }
      ]
    }),
    new ErrorOverlayPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    open: true,
    port: 9001,
    hot: true
  }
}

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.devtool = 'source-map'
  } else if (argv.mode === 'production') {
    config.devtool = false
  }

  return config
}
