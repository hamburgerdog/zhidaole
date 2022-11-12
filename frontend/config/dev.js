const path = require('path');

module.exports = {
  env: {
    NODE_ENV: '"development"',
  },
  defineConstants: {},
  mini: {},
  h5: {},
  alias: {
    '@/components': path.resolve(__dirname, '..', 'src/components'),
    '@/utils': path.resolve(__dirname, '..', 'src/utils'),
    '@/hooks': path.resolve(__dirname, '..', 'src/hooks'),
    '@/assets': path.resolve(__dirname, '..', 'src/assets'),
    '@/atom': path.resolve(__dirname, '..', 'src/atom'),
    '@/service': path.resolve(__dirname, '..', 'src/service'),
  }
};
