module.exports = [
  {
    test: /\.jsx?$/,
    exclude: /(node_modules|bower_components|public\/)/,
    loader: 'babel-loader',
    query: {
      cacheDirectory: true,
      plugins: ['transform-runtime', 'transform-class-properties', 'transform-object-rest-spread'],
      presets: ['es2015', 'react', 'stage-2'],
    },
  },
  {
    test: /\.css$/,
    loaders: ['style-loader', 'css-loader?importLoaders=1'],
    exclude: ['node_modules'],
  },
  {
    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
    exclude: /(node_modules|bower_components)/,
    loader: 'file-loader',
  },
  {
    test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
    exclude: /(node_modules|bower_components)/,
    loader: 'url-loader?prefix=font/&limit=5000',
  },
  {
    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
    exclude: /(node_modules|bower_components)/,
    loader: 'url-loader?limit=10000&mimetype=application/octet-stream',
  },
  {
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    exclude: /(node_modules|bower_components)/,
    loader: 'url-loader?limit=10000&mimetype=image/svg+xml',
  },
  {
    test: /fontawesome-webfont\.eot(\?v=\d+\.\d+\.\d+)?$/,
    exclude: /(bower_components)/,
    loader: 'file-loader',
  },
  {
    test: /fontawesome-webfont\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
    exclude: /(bower_components)/,
    loader: 'url-loader?prefix=font/&limit=5000',
  },
  {
    test: /fontawesome-webfont\.ttf(\?v=\d+\.\d+\.\d+)?$/,
    exclude: /(bower_components)/,
    loader: 'url-loader?limit=10000&mimetype=application/octet-stream',
  },
  {
    test: /fontawesome-webfont\.svg(\?v=\d+\.\d+\.\d+)?$/,
    exclude: /(bower_components)/,
    loader: 'url-loader?limit=10000&mimetype=image/svg+xml',
  },
  {
    test: /\.gif/,
    exclude: /(node_modules|bower_components)/,
    loader: 'url-loader?limit=10000&mimetype=image/gif',
  },
  {
    test: /\.jpg/,
    exclude: /(node_modules|bower_components)/,
    loader: 'url-loader?limit=10000&mimetype=image/jpg',
  },
  {
    test: /\.png/,
    exclude: /(node_modules|bower_components)/,
    loader: 'url-loader?limit=10000&mimetype=image/png',
  },
]
