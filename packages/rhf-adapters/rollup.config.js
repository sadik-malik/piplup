// @ts-check

const { withNx } = require('@nx/rollup/with-nx');
const baseRollupConfig = require('../../rollup.base.config');

module.exports = withNx(
  {
    additionalEntryPoints: [
      'packages/rhf-adapters/src/mui/material/mui-material.ts',
      'packages/rhf-adapters/src/mui/lab/mui-lab.ts',
      'packages/rhf-adapters/src/mui/x-date-pickers/mui-x-date-pickers.ts',
      'packages/rhf-adapters/src/mui/x-date-pickers/internals/mui-x-date-pickers-internals.ts',
      'packages/rhf-adapters/src/react-number-format/react-number-format.ts',
      'packages/rhf-adapters/src/mui-file-input/mui-file-input.ts',
      'packages/rhf-adapters/src/mui-color-input/mui-color-input.ts',
      'packages/rhf-adapters/src/mui-one-time-password-input/mui-one-time-password-input.ts',
      'packages/rhf-adapters/src/mui-tel-input/mui-tel-input.ts',
    ],
    assets: [
      {
        glob: 'packages/rhf-adapters/README.md',
        input: '.',
        output: '.',
      },
    ],
    compiler: 'babel',
    external: [
      'react',
      'react-dom',
      'react/jsx-runtime',
      'react-hook-form',
      '@piplup/rhf-core',
      '@mui/material',
      '@mui/lab',
      '@mui/x-date-pickers',
      'react-number-format',
      'mui-file-input',
      'mui-color-input',
      'mui-one-time-password-input',
      'mui-tel-input',
    ],
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
