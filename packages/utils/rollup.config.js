const { withNx } = require('@nx/rollup/with-nx');

const options = {
  assets: [
    {
      glob: '{projectRoot}/README.md',
      input: '.',
      output: '.',
    },
  ],
  compiler: 'babel',
  external: ['react', 'react-dom', 'react/jsx-runtime'],
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
