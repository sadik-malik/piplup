const { withNx } = require('@nx/rollup/with-nx');
const url = require('@rollup/plugin-url');

module.exports = withNx(
  {
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
