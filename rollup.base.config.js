// @ts-check

const { default: terser } = require('@rollup/plugin-terser');
const { default: url } = require('@rollup/plugin-url');

const banner = `/*
* Piplup
* {@link https://github.com/sadik-malik/piplup}
* @copyright Sadik Malik (@sadik-malik)
* @license MIT
*/
'use client';`;

/**
 * @typedef {import("rollup").RollupOptions}
 */
const options = {
  onwarn(warning, warn) {
    if (warning.code !== 'MODULE_LEVEL_DIRECTIVE') {
      warn(warning);
    }
  },
  // Provide additional rollup configuration here. See: https://rollupjs.org/configuration-options
  output: {
    banner,
  },
  plugins: [
    url({
      limit: 10000, // 10kB
    }),
    terser({
      compress: { directives: false },
    }),
  ],
};

module.exports = options;