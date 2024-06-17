import { execSync } from 'child_process';
import path from 'path';
import type { Logger, Plugin, PluginOption } from 'vite';

export type VitePluginCacheBusterOptions = {
  publicDir?: string;
  debug?: boolean;
};

export default function vitePluginCacheBuster(
  options: VitePluginCacheBusterOptions = {}
): PluginOption[] {
  let publicDir = path.resolve(process.cwd(), 'public');
  let enabled = false;
  let command = '';
  let logger: Logger;

  const plugin: Plugin = {
    name: 'vite-plugin-cache-buster',
    configResolved(config) {
      enabled = config.isProduction || !!options.debug;
      command = config.command;
      publicDir = options.publicDir || path.join('public');
      logger = config.logger;
    },
    buildStart() {
      if ((enabled && command === 'build') || command === 'serve') {
        try {
          execSync(`piplup-cache-buster --publicDir=${publicDir}`, {
            stdio: 'inherit',
          });
        } catch (error) {
          logger.error('Error running piplup-cache-buster');
        }
      }
    },
  };
  return [plugin];
}
