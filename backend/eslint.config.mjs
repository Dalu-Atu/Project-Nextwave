import globals from 'globals';

export default {
  files: ['**/*.js'],
  languageOptions: {
    sourceType: 'commonjs',
    globals: {
      ...globals.browser,
      process: 'readonly',
    },
  },
  ignores: ['path/to/ignore/*.js'], // Add your ignore patterns here
  rules: {
    'no-unused-vars': ['error', { argsIgnorePattern: 'req|res|next' }],
    'no-undef': 'error',
  },
};
