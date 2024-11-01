const { withNx } = require('@nx/rollup/with-nx');

const options = {
  assets: [
    {
      glob: 'packages/use-local-storage/README.md',
      input: '.',
      output: '.',
    },
  ],
  compiler: 'babel',
  external: ['react', 'react-dom', 'react/jsx-runtime', '@piplup/use-event-listener'],
  format: ['esm', 'cjs'],
  generateExportsField: true,
  main: 'packages/use-local-storage/src/index.ts',
  outputPath: 'packages/use-local-storage/dist',
  project: 'packages/use-local-storage/package.json',
  tsConfig: 'packages/use-local-storage/tsconfig.lib.json',
};

let config = withNx(options, {
  // Provide additional rollup configuration here. See: https://rollupjs.org/configuration-options
  // e.g.
  // output: { sourcemap: true },
});

config = require('@nx/react/plugins/bundle-rollup')(config, options);

module.exports = config;
