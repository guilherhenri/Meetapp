module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb',
    'prettier',
    'prettier/react'
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
  plugins: [
    'react',
    'prettier',
    'react-hooks'
  ],
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': [
      'warn',
      { extensions: ['.jsx', '.js'] }
    ],
    'import/prefer-default-export': 'off',
    'react/button-has-type': 'off',
    'jsx-a11y/control-has-associated-label': 'off',
    'react/prefer-stateless-function': 'off',
    'react/no-unused-state': 'off',
    'react/state-in-constructor': 'off',
    'no-param-reassign': 'off',
    'no-console': ["error", {allow: ["tron"] }],
    'react/jsx-props-no-spreading': 'off',
    'no-underscore-dangle': 'off',
    'prefer-object-spread': 'off',
    'camelcase': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/static-property-placement': 'off',
    'react/forbid-prop-types': 'off',
    'react/require-default-props': 'off',
    'no-undef': 'off'
  },
  settings: {
    "import/resolver" : {
      "babel-plugin-root-import": {
        rootPathSuffix: "src"
      },
    },
  },
};
