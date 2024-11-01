const { withNx } = require('@nx/rollup/with-nx');

const options = {
  assets: [
    {
      glob: 'packages/cache-buster/README.md',
      input: '.',
      output: '.',
    },
    {
      glob: 'packages/cache-buster/bin/generate-release-id.js',
      input: '.',
      output: './bin',
    },
  ],
  compiler: 'babel',
  external: ['react', 'react-dom', 'react/jsx-runtime'],
  format: ['esm', 'cjs'],
  generateExportsField: true,
  main: 'packages/cache-buster/src/index.ts',
  outputPath: '../../packages/cache-buster/dist',
  project: '../../packages/cache-buster/package.json',
  tsConfig: '../../packages/cache-buster/tsconfig.lib.json',
};

let config = withNx(options, {
  // Provide additional rollup configuration here. See: https://rollupjs.org/configuration-options
  // e.g.
  // output: { sourcemap: true },
});

config = require('@nx/react/plugins/bundle-rollup')(config, options);

module.exports = config;
