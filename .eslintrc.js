module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  overrides: [
    {
      files: ['**/*.spec.js', '**/*.spec.jsx'],
      env: {
        jest: true,
      },
    },
  ],
  rules: {
    'prettier/prettier': 'error',
    'class-methods-use-this': 'off',
    'no-param-reassign': 'off',
    camelcase: 'off',
    'no-unused-vars': ['off', { argsIgnorePattern: 'next' }],
    'global-require': 'off',
    'no-console': 'off',
    'func-names': 'off',
    'consistent-return': 'off',
    'no-underscore-dangle': 'off',
    'prefer-const': 'off',
    'no-undef': 'off',
    // 'prettier/prettier': {
    //   error: {
    //     endOfLine: 'auto',
    //   },
    // },
  },
}
