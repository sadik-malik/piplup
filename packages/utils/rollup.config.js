// @ts-check

const { withNx } = require('@nx/rollup/with-nx');
const baseRollupConfig = require('../../rollup.base.config');

module.exports = withNx(
  {
    assets: [
      {
        glob: 'packages/utils/README.md',
        input: '.',
        output: '.',
      },
    ],
    compiler: 'babel',
    external: ['react', 'react-dom', 'react/jsx-runtime'],
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
