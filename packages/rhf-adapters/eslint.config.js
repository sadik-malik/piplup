const { FlatCompat } = require('@eslint/eslintrc');
const js = require('@eslint/js');
const baseConfig = require('../../eslint.config.js');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

module.exports = [
  ...baseConfig,
  ...compat.extends('plugin:@nx/react'),
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    // Override or add rules here
    rules: {},
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    // Override or add rules here
    rules: {},
  },
  {
    files: ['**/*.js', '**/*.jsx'],
    // Override or add rules here
    rules: {},
  },
  {
    files: ['{package,project}.json'],
    languageOptions: { parser: require('jsonc-eslint-parser') },
    rules: {
      '@nx/dependency-checks': [
        'error',
        {
          buildTargets: ['build'],
          checkMissingDependencies: true,
          checkObsoleteDependencies: true,
          checkVersionMismatches: true,
          ignoredDependencies: [
            '@types/react',
            '@eslint/eslintrc',
            '@eslint/js',
            'jsonc-eslint-parser',
            '@nx/react',
            '@vitejs/plugin-react',
            'vite-plugin-dts',
            '@nx/vite',
            'vite',
            '@piplup/utils', // This is already bundled with @piplup/rhf-core. So we do not needs its import
          ],
          ignoredFiles: ['eslint.config.js', 'rollup.config.js'],
          includeTransitiveDependencies: true,
          useLocalPathsForWorkspaceDependencies: true,
        },
      ],
    },
  },
  { ignores: ['storybook-static'] },
  { ignores: ['dist'] },
];
