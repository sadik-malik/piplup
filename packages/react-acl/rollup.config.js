const { withNx } = require('@nx/rollup/with-nx');

const options = {
  assets: [
    {
      glob: 'packages/react-acl/README.md',
      input: '.',
      output: '.',
    },
  ],
  compiler: 'babel',
  external: ['react', 'react-dom', 'react/jsx-runtime'],
  format: ['esm', 'cjs'],
  generateExportsField: true,
  main: 'packages/react-acl/src/index.ts',
  outputPath: 'packages/react-acl/dist',
  project: 'packages/react-acl/package.json',
  tsConfig: 'packages/react-acl/tsconfig.lib.json',
};

let config = withNx(options, {
  // Provide additional rollup configuration here. See: https://rollupjs.org/configuration-options
  // e.g.
  // output: { sourcemap: true },
});

config = require('@nx/react/plugins/bundle-rollup')(config, options);

module.exports = config;
