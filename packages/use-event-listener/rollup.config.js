const { withNx } = require('@nx/rollup/with-nx');

const options = {
  assets: [
    {
      glob: 'packages/use-event-listener/README.md',
      input: '.',
      output: '.',
    },
  ],
  compiler: 'babel',
  external: ['react', 'react-dom', 'react/jsx-runtime'],
  format: ['esm', 'cjs'],
  generateExportsField: true,
  main: 'packages/use-event-listener/src/index.ts',
  outputPath: '../../packages/use-event-listener/dist',
  project: '../../packages/use-event-listener/package.json',
  tsConfig: '../../packages/use-event-listener/tsconfig.lib.json',
};

let config = withNx(options, {
  // Provide additional rollup configuration here. See: https://rollupjs.org/configuration-options
  // e.g.
  // output: { sourcemap: true },
});

config = require('@nx/react/plugins/bundle-rollup')(config, options);

module.exports = config;
