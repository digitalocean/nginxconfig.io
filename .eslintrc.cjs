module.exports = {
  env: {
    'browser': true,
    'node': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
    ecmaVersion: 2018,
    sourceType: 'module',
    requireConfigFile: false,
  },
  rules: {
    'linebreak-style': ['error', 'unix'],
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    'comma-dangle': ['error', 'always-multiline'],
    'vue/require-v-for-key': 0,
    'vue/require-default-prop': 0,
    'vue/no-v-html': 0,
    'vue/max-attributes-per-line': 0,
    'vue/html-indent': ['error', 4],
    'vue/script-indent': ['error', 4, {
      baseIndent: 1,
    }],
    'vue/no-unused-vars': 0,
    'vue/html-self-closing': 0,
    'vue/multi-word-component-names': 0,
    'vue/no-reserved-component-names': 0,
    'eol-last': ['error', 'always'],
  },
  globals: {
    'describe': true,
    'expect': true,
    'it': true,
    'test': true,
  },
};
