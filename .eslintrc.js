module.exports = {
  extends: ['next/core-web-vitals'],
  overrides: [
    {
      files: ['cypress/**/*.ts'],
      rules: {
        '@typescript-eslint/no-namespace': 'off'
      }
    }
  ]
};