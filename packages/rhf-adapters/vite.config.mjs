/// <reference types='vitest' />

// @ts-check
import { readFileSync, existsSync, unlinkSync } from 'node:fs';
import * as path from 'path';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import packageJSON from './package.json';

const license = readFileSync(path.resolve('./LICENSE'), {
  encoding: 'utf-8',
});
const banner = ['/*', '@license', license, '*/', "'use client';"].join('\n');

const external = new Set([
  ...Object.keys(packageJSON.peerDependencies),
  'react',
  'react-dom',
  'react/jsx-runtime',
]);

export default defineConfig({
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },
  // Configuration for building your library.
  // See: https://vitejs.dev/guide/build.html#library-mode
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    emptyOutDir: true,
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: {
        index: 'src/index.ts',
        'mui-chips-input': 'src/mui-chips-input/mui-chips-input.ts',
        'mui-color-input': 'src/mui-color-input/mui-color-input.ts',
        'mui-file-input': 'src/mui-file-input/mui-file-input.ts',
        'mui-lab': 'src/mui/lab/mui-lab.ts',
        'mui-material': 'src/mui/material/mui-material.ts',
        'mui-one-time-password-input':
          'src/mui-one-time-password-input/mui-one-time-password-input.ts',
        'mui-tel-input': 'src/mui-tel-input/mui-tel-input.ts',
        'mui-x-date-pickers': 'src/mui/x-date-pickers/mui-x-date-pickers.ts',
        'react-number-format': 'src/react-number-format/react-number-format.ts',
      },
      fileName: (format, entryName) => {
        const extension = format === 'es' ? 'mjs' : 'js';
        return `${entryName}.${extension}`;
      },
      // Change this to the formats you want to support.
      // Don't forget to update your package.json as well.
      formats: ['es', 'cjs'],
      name: 'test',
    },
    outDir: './dist',
    reportCompressedSize: true,
    rollupOptions: {
      // External packages that should not be bundled into your library.
      external: [...external],
      output: {
        banner,
      },
    },
  },
  cacheDir: '../../node_modules/.vite/packages/rhf-adapters',
  plugins: [
    react(),
    nxViteTsPaths(),
    nxCopyAssetsPlugin([]),
    dts({ entryRoot: 'src', tsconfigPath: path.join(__dirname, 'tsconfig.lib.json') }),
    {
      name: 'remove-package-json',
      writeBundle() {
        const distDir = path.resolve(__dirname, 'dist');
        const packageJsonPath = path.join(distDir, 'package.json');
        if (existsSync(packageJsonPath)) {
          unlinkSync(packageJsonPath);
        }
      },
    },
  ],
  root: __dirname,
});
