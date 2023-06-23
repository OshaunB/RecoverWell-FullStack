module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'react/prop-types': 'off',
    'no-console': 'off',
    'object-curly-newline': 'off',
    'comma-dangle': 'off',
    'no-plusplus': 'off',
    'no-promise-executor-return': 'off',
    'func-style': 2,
    quotes: 'off',
    'consistent-return': 'off',
    'no-alert': 'off',
    camelcase: 'off',
    'no-unused-expressions': ["error", { allowTernary: true }],
    'no-unused-vars': ['error', { argsIgnorePattern: '_|(knex)', destructuredArrayIgnorePattern: '^_' }],
    'no-mixed-operators': 'off', // Turn off the "Expected no linebreak before this expression" rule
  },
};
