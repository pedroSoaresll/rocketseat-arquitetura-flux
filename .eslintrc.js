module.exports = {
  env: {
    browser: true,
    es6: true,
    env: {
      'cypress/globals': true,
    },
  },
  extends: [
    'airbnb',
    'prettier',
    'prettier/react',
    'plugin:cypress/recommended',
    'plugin:chai-friendly/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier', 'react-hooks', 'cypress', 'chai-friendly'],
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: ['jsx', 'js'],
      },
    ],
    'import/prefer-default-export': 'off',
    'react/state-in-constructor': 'off',
    'no-console': ['error', { allow: ['tron'] }],
    'no-param-reassign': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'cypress/no-assigning-return-values': 'error',
    'cypress/no-unnecessary-waiting': 'error',
    'cypress/assertion-before-screenshot': 'warn',
    'cypress/no-force': 'warn',
    'no-unused-expressions': 0,
    'chai-friendly/no-unused-expressions': 2,
  },
};
