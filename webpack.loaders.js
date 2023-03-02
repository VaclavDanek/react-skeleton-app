module.exports = [
  {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
    type: 'asset',
    generator: {
      filename: './fonts/[name].[hash][ext]'
    }
  },
  {
    test: /\.(png|jpe?g|gif|webp|ico|svg)(\?.*)?$/,
    type: 'asset',
    generator: {
      filename: './images/[name].[hash][ext]'
    }
  },
]
