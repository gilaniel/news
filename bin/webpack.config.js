const path = require('path');

const webpack = require('webpack');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const paths = {
  sources: {
    main: path.resolve(__dirname, '../app/'),
  },
  bundles: path.resolve(__dirname, '../static/')
};

module.exports = {
  mode: 'development',
  entry: {
    App: path.join(paths.sources.main, 'index.js'),
  },
  output: {
    path: paths.bundles,
    publicPath: '/static/'
  },
  resolve: {
		modules: [path.resolve(__dirname),'node_modules']
  }, 
  watch: true,
  module: {
    rules: [
           {
        test: /\.js$/,
        include: paths.sources.main,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { useBuiltIns: 'entry', corejs: 3 }]]
          }
        }
      },
      { 
				test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin()
  ],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
};
