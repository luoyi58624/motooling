module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'eqeqeq': 'off',
    'no-undef': 'off',
    'no-unused-vars': 'off',
    'no-unused-expressions': 'off',
    'no-sequences': 'off',
    'no-return-assign': 'off',
    'no-use-before-define': 'off',
    'no-mixed-operators': 'off',
    '--no-verify': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
