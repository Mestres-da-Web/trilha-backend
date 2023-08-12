module.exports = {
    presets: [
      ['@babel/preset-env', { targets: { node: 'current' } }],
      '@babel/preset-typescript',
    ],
    plugins: [
      'babel-plugin-transform-typescript-metadata',
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      ['@babel/plugin-proposal-class-properties', { loose: true }],
    ],
};

/*
yarn add @babel/cli -D
yarn add @babel/core -D
yarn add @babel/preset-typescript -D
yarn add babel-plugin-transform-typescript-metadata -D
yarn add @babel/plugin-proposal-decorators -D
yarn add @babel/plugin-proposal-class-properties -D
yarn add @babel/preset-env
*/