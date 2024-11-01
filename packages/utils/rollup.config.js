const { withNx } = require('@nx/rollup/with-nx');

const options = {
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
  main: 'packages/utils/src/index.ts',
  outputPath: '../../packages/utils/dist',
  project: '../../packages/utils/package.json',
  tsConfig: '../../packages/utils/tsconfig.lib.json',
};

let config = withNx(options, {
  // Provide additional rollup configuration here. See: https://rollupjs.org/configuration-options
  // e.g.
  // output: { sourcemap: true },
});

config = require('@nx/react/plugins/bundle-rollup')(config, options);

module.exports = config;
