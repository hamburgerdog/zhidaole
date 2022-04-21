module.exports = {
  root: true,
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  plugins: ['react', 'simple-import-sort', 'unused-imports', 'eslint-plugin-import'],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
    },
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    amd: true,
    commonjs: true,
  },
  /**
   * "off" 或 0 - 关闭规则
   * "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出),
   * "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
   */
  rules: {
    'comma-dangle': [2, 'always-multiline'],
    'comma-style': [2, 'last'],

    //  限制嵌套的深度
    'max-depth': [2, 1],
    'max-nested-callbacks': [2, { max: 2 }],
    //  强制函数最大行数
    'max-lines-per-function': ['error', { max: 100, skipBlankLines: true, skipComments: true }],

    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/display-name': 0,
    'react/prop-types': 1,

    'unused-imports/no-unused-imports': 2,
    'simple-import-sort/imports': 1,
    'simple-import-sort/exports': 1,
    'import/first': 2,
    'import/newline-after-import': 2,
    'import/no-duplicates': 2,
  },
};
