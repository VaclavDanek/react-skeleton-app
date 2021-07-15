module.exports = {
  presets: [
    '@babel/preset-flow',
  ],
  plugins: [
    '@babel/plugin-syntax-flow',
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-syntax-dynamic-import',
    'react-hot-loader/babel',
    'transform-class-properties',
  ],
}
