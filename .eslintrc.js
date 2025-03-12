module.exports = {
  extends: 'next/core-web-vitals',
  rules: {
    '@typescript-eslint/no-unused-vars': ['error', { 
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
      ignoreRestSiblings: true
    }],
    'react/no-unescaped-entities': 'off'
  }
};
