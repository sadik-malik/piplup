# @piplup/cache-buster

React library that helps in busting cache by checking changes for a unique release ID and reloading the page when a change is detected.

## Installation

You can install the @piplup/cache-buster using:

```bash
npm install @piplup/cache-buster

// or

yarn add @piplup/cache-buster

// or

pnpm add @piplup/cache-buster
```

## Usage
1. Update your build script
```json
{
  "scripts": {
    "generate-release-id": "node ./node_modules/@piplup/cache-buster/dist/generate-release-id --publicDir=public",
    "build": "npm run generate-release-id && react-scripts build"
  }
}
```

2. Wrap your application with CacheBuster
```jsx
import { CacheBuster } from '@piplup/cache-buster';

function App(){
  return (
    <CacheBuster 
      loading={null} // Optional: Add a loading component to display loading.
      verbose={false} // Optional: If true, logs will be visible.
      enabled={process.env.NODE_ENV === 'production'}
    >
      <YourApp />
    </CacheBuster>
  );
}

export default App;
```

## Props

- `enabled` (optional): Boolean indicating whether the cache busting functionality should be enabled. Default is `false`.
- `loading` (optional): React node to be displayed while checking for updates. Default is `null`.
- `verbose` (optional): Boolean indicating whether verbose logging should be enabled. Default is `false`.
- `storageKey` (optional): local storage key for storing the unique release ID. Default is `RELEASE`
- `children`: The child components to render within the cache buster.

## How It Works

`CacheBuster` fetches a release ID from the public folder using a predefined file name. It then compares this ID with the one stored in the browser's local storage. If a new release is detected, it reloads the page. Otherwise, it proceeds to render the child components.

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
