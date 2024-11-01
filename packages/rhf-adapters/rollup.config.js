const { withNx } = require('@nx/rollup/with-nx');

const options = {
  additionalEntryPoints: [
    '../../packages/rhf-adapters/src/mui/material/mui-material.ts',
    '../../packages/rhf-adapters/src/mui/lab/mui-lab.ts',
    '../../packages/rhf-adapters/src/mui/x-date-pickers/mui-x-date-pickers.ts',
    '../../packages/rhf-adapters/src/mui/x-date-pickers/internals/mui-x-date-pickers-internals.ts',
    '../../packages/rhf-adapters/src/react-number-format/react-number-format.ts',
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
  ],
  format: ['esm', 'cjs'],
  generateExportsField: true,
  main: 'packages/rhf-adapters/src/index.ts',
  outputPath: '../../packages/rhf-adapters/dist',
  project: '../../packages/rhf-adapters/package.json',
  tsConfig: '../../packages/rhf-adapters/tsconfig.lib.json',
};

let config = withNx(options, {
  // Provide additional rollup configuration here. See: https://rollupjs.org/configuration-options
  // e.g.
  // output: { sourcemap: true },
});

config = require('@nx/react/plugins/bundle-rollup')(config, options);

module.exports = config;
