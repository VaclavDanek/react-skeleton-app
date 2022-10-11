const path = require('path')

module.exports = [
  {
    test: /\.jsx?$/,
    exclude: /(node_modules|public\/)/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env']
      }
    },
  },
  {
    test: /\.gif/,
    exclude: path.resolve(__dirname, 'node_modules'),
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype : 'image/gif',
        }
      }
    ],
  },
  {
    test: /\.jpg/,
    exclude: path.resolve(__dirname, 'node_modules'),
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype : 'image/jpg',
        }
      }
    ],
    /* use: {
      loader: 'file-loader',
    }, */
  },
  {
    test: /\.png/,
    exclude: path.resolve(__dirname, 'node_modules'),
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype : 'image/png',
        }
      }
    ],
  },
  {
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    exclude: path.resolve(__dirname, 'node_modules'),
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype : 'image/svg+xml',
        }
      }
    ],
  },
  {
    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
    exclude: path.resolve(__dirname, 'node_modules'),
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype : 'application/octet-stream',
        }
      }
    ],
  },
  {
    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
    exclude: path.resolve(__dirname, 'node_modules'),
    use: {
      loader: 'file-loader',
    },
  },
  {
    test: /^(?!.*fontawesome-webfont).*\.woff2?(\?v=\d+\.\d+\.\d+)?$/,
    exclude: path.resolve(__dirname, 'node_modules'),
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype : 'application/font-woff',
        }
      }
    ],
  },
  {
    test: /fontawesome-webfont\.woff2?(\?v=\d+\.\d+\.\d+)?/,
    exclude: path.resolve(__dirname, 'node_modules'),
    use: [
      {
        loader: 'url-loader',
        options: {
          prefix : 'font/&limit=5000',
        }
      }
    ],
  },
]
