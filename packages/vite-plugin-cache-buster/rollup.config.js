const { withNx } = require('@nx/rollup/with-nx');

const options = {
  assets: [
    {
      glob: 'packages/vite-plugin-cache-buster/README.md',
      input: '.',
      output: '.',
    },
    {
      glob: 'packages/vite-plugin-cache-buster/LICENSE',
      input: '.',
      output: '.',
    },
  ],
  compiler: 'babel',
  external: ['react', 'react-dom', 'react/jsx-runtime', 'vite'],
  format: ['cjs', 'esm'],
  generateExportsField: true,
  main: 'packages/vite-plugin-cache-buster/src/index.ts',
  outputPath: '../../packages/vite-plugin-cache-buster/dist',
  project: '../../packages/vite-plugin-cache-buster/package.json',
  tsConfig: '../../packages/vite-plugin-cache-buster/tsconfig.lib.json',
};

let config = withNx(options, {
  // Provide additional rollup configuration here. See: https://rollupjs.org/configuration-options
  // e.g.
  // output: { sourcemap: true },
});

config = require('@nx/react/plugins/bundle-rollup')(config, options);

module.exports = config;
