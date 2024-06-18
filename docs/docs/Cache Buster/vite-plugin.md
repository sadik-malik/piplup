---
title: Vite Plugin
sidebar_position: 3
---

# Vite Plugin

`@piplup/vite-plugin-cache-buster` is a Vite plugin that automatically performs cache busting during the build process using `@piplup/cache-buster`.

## Installation

You can install the plugin via npm or yarn:

```bash
npm install -D @piplup/vite-plugin-cache-buster

# or

yarn add -D @piplup/vite-plugin-cache-buster

#or

pnpm add -D @piplup/vite-plugin-cache-buster
```

## Usage

In your Vite configuration file (usually `vite.config.js` or `vite.config.ts`), import and use the plugin:

```javascript
import { vitePluginCacheBuster } from '@piplup/vite-plugin-cache-buster';

export default {
  // Other Vite config options...
  plugins: [vitePluginCacheBuster()],
};
```

## Options

The plugin accepts the following options:

- `publicDir` (string, optional): Specifies the directory containing the public files. Default is `public`.
- `debug` (boolean, optional): Enables debug mode. Default is `false`.

You can pass options to the plugin when importing it:

```javascript
import { vitePluginCacheBuster } from '@piplup/vite-plugin-cache-buster';

export default {
  // ...Other Vite options
  plugins: [
    // ...Other vite plugins
    vitePluginCacheBuster({ publicDir: '<your_public_path_here>' }),
  ],
};
```

## How It Works

The plugin hooks into Vite's build process and runs the `piplup-cache-buster` command from `@piplup/cache-buster` during the build if it's a production build (`NODE_ENV=production`) or when debug mode is enabled.
