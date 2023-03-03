const webpack = require('webpack')
const path = require('path')
const loaders = require('./webpack.loaders')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin  = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const WEBPACK_REPORT = false

module.exports = {
  mode: 'production',
  entry: ['./src/main.js'],
  devtool: process.env.WEBPACK_DEVTOOL || 'source-map',
  output: {
    publicPath: './',
    path: path.join(__dirname, 'public'),
    filename: '[contenthash].js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|public\/)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: false,
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
      ...loaders,
    ],
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true,
          },
          warnings: false,
          comments: false,
        },
      }),
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      template: './src/template.html',
      files: {
        css: ['style.css'],
        js: ['bundle.js'],
      },
    }),
  ],
}

if (WEBPACK_REPORT) {
	module.exports.plugins.push(
		new BundleAnalyzerPlugin({
			analyzerMode: 'static',
			generateStatsFile: true,
			openAnalyzer: false,
      reportFilename: path.join(__dirname, 'webpack-report/index.html'),
			statsFilename: path.join(__dirname, 'webpack-report/stats.json'),
		})
	)
}
