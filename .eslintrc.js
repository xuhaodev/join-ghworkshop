module.exports = {
  extends: 'next/core-web-vitals',
  rules: {
    // Allow unused variables if they start with underscore
    '@typescript-eslint/no-unused-vars': ['error', { 
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_' 
    }],
    
    // Disable the rule for unescaped entities like quotes in JSX
    'react/no-unescaped-entities': 'off',
    
    // Make img element warning less severe (change from error to warning)
    '@next/next/no-img-element': 'warn',
    
    // Allow explicit any types in specific cases
    '@typescript-eslint/no-explicit-any': ['warn', {
      ignoreRestArgs: true
    }]
  }
};
