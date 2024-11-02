const { withNx } = require('@nx/rollup/with-nx');
const url = require('@rollup/plugin-url');

module.exports = withNx(
  {
    additionalEntryPoints: [
      './src/mui/material/mui-material.ts',
      './src/mui/lab/mui-lab.ts',
      './src/mui/x-date-pickers/mui-x-date-pickers.ts',
      './src/mui/x-date-pickers/internals/mui-x-date-pickers-internals.ts',
      './src/react-number-format/react-number-format.ts',
    ],
    assets: [
      {
        glob: './README.md',
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
    ],
    format: ['esm', 'cjs'],
    generateExportsField: true,
    main: './src/index.ts',
    outputPath: './dist',
    project: './package.json',
    tsConfig: './tsconfig.lib.json',
  },
  {
    // Provide additional rollup configuration here. See: https://rollupjs.org/configuration-options
    plugins: [
      url({
        limit: 10000, // 10kB
      }),
    ],
  },
);
