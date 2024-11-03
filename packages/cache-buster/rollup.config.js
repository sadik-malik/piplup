const { withNx } = require('@nx/rollup/with-nx');
const url = require('@rollup/plugin-url');

module.exports = withNx(
  {
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
    main: './src/index.ts',
    outputPath: './dist',
    project: './package.json',
    tsConfig: './tsconfig.lib.json',
  },
  {
    // Provide additional rollup configuration here. See: https://rollupjs.org/configuration-options
    plugins: [
      url({
        limit: 10000, // 10kB
      }),
    ],
  },
);
