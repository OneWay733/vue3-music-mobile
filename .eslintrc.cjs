require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  env: {
    node: true,
    browser: true
  },
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'multi-word-component-names': 0
  }
}
