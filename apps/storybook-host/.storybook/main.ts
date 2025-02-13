import { dirname, join } from 'path';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { type StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  addons: [
    {
      name: getAbsolutePath('@storybook/addon-essentials'),
    },
  ],
  docs: {},
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },
  staticDirs: ['../public'],
  stories: [
    '../src/**/introduction.mdx',
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
  viteFinal: async (config) =>
    mergeConfig(config, {
      build: {
        rollupOptions: {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          onwarn(warning, warn) {
            if (warning.code !== 'MODULE_LEVEL_DIRECTIVE') {
              warn(warning);
            }
          },
        },
      },
      plugins: [nxViteTsPaths()],
    }),
};

export default config;

// To customize your Vite configuration you can use the viteFinal field.
// Check https://storybook.js.org/docs/react/builders/vite#configuration
// and https://nx.dev/recipes/storybook/custom-builder-configs
function getAbsolutePath(value: string): string {
  return dirname(require.resolve(join(value, 'package.json')));
}
