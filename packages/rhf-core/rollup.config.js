// @ts-check

const { withNx } = require('@nx/rollup/with-nx');
const baseRollupConfig = require('../../rollup.base.config');

module.exports = withNx(
  {
    additionalEntryPoints: [
      'packages/rhf-core/src/html/html.ts',
      'packages/rhf-core/src/utils.ts',
      'packages/rhf-core/src/hooks/internals/internals.ts',
    ],
    assets: [
      {
        glob: './README.md',
        input: '.',
        output: '.',
      },
    ],
    compiler: 'babel',
    external: ['react', 'react-dom', 'react/jsx-runtime', 'react-hook-form'],
    format: ['esm', 'cjs'],
    generateExportsField: true,
    main: './src/index.ts',
    outputPath: './dist',
    project: './package.json',
    sourceMap: true,
    tsConfig: './tsconfig.lib.json',
  },
  baseRollupConfig,
);
