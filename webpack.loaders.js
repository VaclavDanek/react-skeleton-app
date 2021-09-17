module.exports = [
  {
    test: /\.jsx?$/,
    exclude: /(node_modules|public\/)/,
    loader: 'babel-loader',
    query: {
      cacheDirectory: true,
      presets: [
        '@babel/preset-env',
        '@babel/preset-flow',
        '@babel/preset-react',
      ],
      plugins: [
        '@babel/plugin-syntax-flow',
        '@babel/plugin-transform-runtime',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-export-default-from',
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-syntax-dynamic-import',
        'react-hot-loader/babel',
      ],
    },
  },
  {
    test: /\.css$/,
    loaders: ['style-loader', 'css-loader?importLoaders=1'],
    exclude: ['node_modules'],
  },
  {
    test: /\.gif/,
    exclude: ['node_modules'],
    loader: 'url-loader?limit=10000&mimetype=image/gif',
  },
  {
    test: /\.jpg/,
    exclude: ['node_modules'],
    loader: 'url-loader?limit=10000&mimetype=image/jpg',
    // loader: 'file-loader',
  },
  {
    test: /\.png/,
    exclude: ['node_modules'],
    loader: 'url-loader?limit=10000&mimetype=image/png',
  },
  {
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    exclude: ['node_modules'],
    loader: 'url-loader?limit=10000&mimetype=image/svg+xml',
  },
  {
    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
    exclude: ['node_modules'],
    loader: 'url-loader?limit=10000&mimetype=application/octet-stream',
  },
  {
    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
    exclude: ['node_modules'],
    loader: 'file-loader',
  },
  {
    test: /^(?!.*fontawesome-webfont).*\.woff2?(\?v=\d+\.\d+\.\d+)?$/,
    exclude: ['node_modules'],
    loader: 'url-loader?limit=10000&mimetype=application/font-woff',
  },
  {
    test: /fontawesome-webfont\.woff2?(\?v=\d+\.\d+\.\d+)?/,
    exclude: ['node_modules'],
    loader: "url-loader?prefix=font/&limit=5000"
  },
]
