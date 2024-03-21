// @ts-check

import { mkdir, rm, writeFile } from 'fs/promises';
import path from 'path';
import getWorkspaceRoot from './get-workspace-root.mjs';

// Define folder paths
const appsFolderPath = path.resolve(getWorkspaceRoot(), 'apps');
const playgroundFolderPath = path.resolve(appsFolderPath, 'playground');
const playgroundPublicFolderPath = path.resolve(playgroundFolderPath, 'public');
const playgroundSrcFolderPath = path.resolve(playgroundFolderPath, 'src');

// Task functions
async function createFolder(folderPath) {
  try {
    await mkdir(folderPath);
    console.log(`Created folder: ${folderPath}`);
  } catch (error) {
    if (error.code === 'EEXIST') {
      console.log(`Folder already exists: ${folderPath}`);
    } else {
      console.error(`Error creating folder ${folderPath}: ${error.message}`);
    }
  }
}

async function createFile(filePath, content = '') {
  try {
    await writeFile(filePath, content.trim());
    console.log(`Created file: ${filePath}`);
  } catch (error) {
    console.error(`Error creating file ${filePath}: ${error.message}`);
  }
}

async function deleteFolder(folderPath) {
  try {
    await rm(folderPath, { recursive: true });
    console.log(`Deleted folder: ${folderPath}`);
  } catch (error) {
    console.error(`Error deleting folder ${folderPath}: ${error.message}`);
  }
}

// Main function
async function createProjectStructure() {
  await createFolder(appsFolderPath);
  await deleteFolder(playgroundFolderPath);
  await createFolder(playgroundFolderPath);
  await createFolder(playgroundPublicFolderPath);
  await createFolder(playgroundSrcFolderPath);
  await createFile(path.resolve(playgroundFolderPath, '.eslintignore'), 'dist');
  await createFile(
    path.resolve(playgroundFolderPath, '.eslintrc.json'),
    `
{
  "extends": ["plugin:@nx/react", "../../.eslintrc.json"],
  "ignorePatterns": ["!**/*"],
  "overrides": [
    {
      "files": ["*.ts", "*.tsx", "*.js", "*.jsx"],
      "rules": {}
    },
    {
      "files": ["*.ts", "*.tsx"],
      "rules": {}
    },
    {
      "files": ["*.js", "*.jsx"],
      "rules": {}
    }
  ]
}
  `
  );
  await createFile(
    path.resolve(playgroundFolderPath, 'index.html'),
    `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Playground</title>
    <base href="/" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
  `
  );
  await createFile(
    path.resolve(playgroundFolderPath, 'project.json'),
    `
{
  "name": "playground",
  "$schema": "../../node_modules/nx/schemas/project-schema.json",
  "sourceRoot": "apps/playground/src",
  "projectType": "application",
  "tags": [],
  "implicitDependencies": ["@piplup/cache-buster"],
  "// targets": "to see all targets run: nx show project playground --web",
  "targets": {
    "generate-release-id": {
      "command": "node packages/cache-buster/dist/generate-release-id --publicDir=apps/playground/public",
      "cache": true,
      "dependsOn": [
        {
          "target": "build",
          "projects": "@piplup/cache-buster",
          "params": "ignore"
        }
      ]
    }
  }
}
    
  `
  );
  await createFile(
    path.resolve(playgroundFolderPath, 'tsconfig.app.json'),
    `
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist/out-tsc",
    "types": [
      "node",
      "@nx/react/typings/cssmodule.d.ts",
      "@nx/react/typings/image.d.ts",
      "vite/client"
    ]
  },
  "exclude": [
    "src/**/*.spec.ts",
    "src/**/*.test.ts",
    "src/**/*.spec.tsx",
    "src/**/*.test.tsx",
    "src/**/*.spec.js",
    "src/**/*.test.js",
    "src/**/*.spec.jsx",
    "src/**/*.test.jsx"
  ],
  "include": ["src/**/*.js", "src/**/*.jsx", "src/**/*.ts", "src/**/*.tsx"]
}
  `
  );
  await createFile(
    path.resolve(playgroundFolderPath, 'tsconfig.json'),
    `
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "allowJs": false,
    "esModuleInterop": false,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "types": ["vite/client", "vitest"]
  },
  "files": [],
  "include": [],
  "references": [
    {
      "path": "./tsconfig.app.json"
    },
    {
      "path": "./tsconfig.spec.json"
    }
  ],
  "extends": "../../tsconfig.base.json"
}
  `
  );
  await createFile(
    path.resolve(playgroundFolderPath, 'tsconfig.spec.json'),
    `
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist/out-tsc",
    "types": [
      "vitest/globals",
      "vitest/importMeta",
      "vite/client",
      "node",
      "vitest",
      "@nx/react/typings/cssmodule.d.ts",
      "@nx/react/typings/image.d.ts"
    ]
  },
  "include": [
    "vite.config.ts",
    "vitest.config.ts",
    "src/**/*.test.ts",
    "src/**/*.spec.ts",
    "src/**/*.test.tsx",
    "src/**/*.spec.tsx",
    "src/**/*.test.js",
    "src/**/*.spec.js",
    "src/**/*.test.jsx",
    "src/**/*.spec.jsx",
    "src/**/*.d.ts"
  ]
}
  `
  );
  await createFile(
    path.resolve(playgroundFolderPath, 'vite.config.ts'),
    `
/// <reference types='vitest' />
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/playground',

  server: {
    port: 4200,
    host: 'localhost',
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  plugins: [react(), nxViteTsPaths()],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  build: {
    outDir: './dist',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },

  test: {
    globals: true,
    cache: {
      dir: '../../node_modules/.vitest',
    },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],

    reporters: ['default'],
    coverage: {
      reportsDirectory: './coverage',
      provider: 'v8',
    },
  },
});
  `
  );
  await createFile(
    path.resolve(playgroundSrcFolderPath, 'main.tsx'),
    `
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`
  );
  await createFile(
    path.resolve(playgroundSrcFolderPath, 'app.tsx'),
    `
import { CacheBuster } from '@piplup/cache-buster';

export function App() {
  return (
    <CacheBuster>
      <div>
        Playground
      </div>
    </CacheBuster>
  );
}

export default App;
    `
  );
}

// Run the main function
createProjectStructure();
