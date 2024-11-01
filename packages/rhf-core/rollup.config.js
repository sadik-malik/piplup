const { withNx } = require('@nx/rollup/with-nx');

const options = {
  additionalEntryPoints: [
    '../../packages/rhf-core/src/html/html.ts',
    '../../packages/rhf-core/src/utils.ts',
    '../../packages/rhf-core/src/hooks/internals/internals.ts',
  ],
  assets: [
    {
      glob: 'packages/rhf-core/README.md',
      input: '.',
      output: '.',
    },
  ],
  compiler: 'babel',
  external: ['react', 'react-dom', 'react/jsx-runtime', 'react-hook-form'],
  format: ['esm', 'cjs'],
  generateExportsField: true,
  main: 'packages/rhf-core/src/index.ts',
  outputPath: '../../packages/rhf-core/dist',
  project: '../../packages/rhf-core/package.json',
  tsConfig: '../../packages/rhf-core/tsconfig.lib.json',
};

let config = withNx(options, {
  // Provide additional rollup configuration here. See: https://rollupjs.org/configuration-options
  // e.g.
  // output: { sourcemap: true },
});

config = require('@nx/react/plugins/bundle-rollup')(config, options);

module.exports = config;
