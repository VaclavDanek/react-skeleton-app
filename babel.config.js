module.exports = {
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
    '@babel/plugin-proposal-json-strings',
    '@babel/plugin-syntax-import-meta',
    'react-refresh/babel',
  ],
}
