const { withNx } = require('@nx/rollup/with-nx');

const options = {
  additionalEntryPoints: [
    '../../{projectRoot}/src/mui/material/mui-material.ts',
    '../../{projectRoot}/src/mui/lab/mui-lab.ts',
    '../../{projectRoot}/src/mui/x-date-pickers/mui-x-date-pickers.ts',
    '../../{projectRoot}/src/mui/x-date-pickers/internals/mui-x-date-pickers-internals.ts',
    '../../{projectRoot}/src/react-number-format/react-number-format.ts',
  ],
  assets: [
    {
      glob: '{projectRoot}/README.md',
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
  main: '{projectRoot}/src/index.ts',
  outputPath: '../../{projectRoot}/dist',
  project: '../../{projectRoot}/package.json',
  tsConfig: '../../{projectRoot}/tsconfig.lib.json',
};

let config = withNx(options, {
  // Provide additional rollup configuration here. See: https://rollupjs.org/configuration-options
  // e.g.
  // output: { sourcemap: true },
});

config = require('@nx/react/plugins/bundle-rollup')(config, options);

module.exports = config;
