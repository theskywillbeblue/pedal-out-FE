// .eslintrc.js
module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
      project: './tsconfig.json',
    },
    plugins: ['@typescript-eslint', 'react', 'react-native', 'prettier'],
    extends: [
      'airbnb',
      'airbnb-typescript',
      'plugin:react/recommended',
      'plugin:react-native/all',
      'plugin:@typescript-eslint/recommended',
      'prettier',
    ],
    rules: {
        'react-native/no-color-literals': 'off',
       
            'react-native/no-color-literals': 'off',
            'react-native/sort-styles': 'off',
            '@typescript-eslint/no-unused-vars': 'warn',
            'react/react-in-jsx-scope': 'off', // for React 17+
            // etc...
          
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  };
  