const { withNx } = require('@nx/rollup/with-nx');
const baseRollupConfig = require('../../rollup.base.config');

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
    external: ['react', 'react-dom', 'react/jsx-runtime', 'vite', '@piplup/cache-buster'],
    format: ['cjs', 'esm'],
    generateExportsField: true,
    main: './src/index.ts',
    outputPath: './dist',
    project: './package.json',
    tsConfig: './tsconfig.lib.json',
  },
  baseRollupConfig,
);
