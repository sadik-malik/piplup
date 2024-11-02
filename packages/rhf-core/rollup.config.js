const { withNx } = require('@nx/rollup/with-nx');
const url = require('@rollup/plugin-url');

module.exports = withNx(
  {
    additionalEntryPoints: [
      'packages/rhf-core/src/html/html.ts',
      'packages/rhf-core/src/utils.ts',
      'packages/rhf-core/src/hooks/internals/internals.ts',
    ],
    assets: [
      {
        glob: './README.md',
        input: '.',
        output: '.',
      },
    ],
    compiler: 'babel',
    external: ['react', 'react-dom', 'react/jsx-runtime', 'react-hook-form'],
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
