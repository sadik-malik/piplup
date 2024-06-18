import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import { themes as prismThemes } from 'prism-react-renderer';
import { ASSETS, ROUTES } from './src/constants';

const config: Config = {
  title: 'Piplup',
  tagline:
    "Explore an ever-expanding collection of React components and utilities that are free to use forever. We've developed the core utilities and components for your design system, so you don't have to.",
  favicon: ASSETS.FAVICON,

  // Set the production url of your site here
  url: 'https://piplup.vercel.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'sadik-malik', // Usually your GitHub org/user name.
  projectName: 'piplup', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: ASSETS.SOCIAL_CARD,
    navbar: {
      title: 'Piplup',
      logo: {
        alt: 'Piplup Logo',
        src: ASSETS.LOGO_SVG,
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        { to: ROUTES.BLOG, label: 'Blog', position: 'left' },
        {
          href: ROUTES.GITHUB_REPO,
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
