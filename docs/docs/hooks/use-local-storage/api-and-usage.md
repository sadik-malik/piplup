---
title: API & Usage
sidebar_position: 2
---

# API & Usage

API and usage reference docs for the `@piplup/use-local-storage`. Learn about the props and other APIs of this package.

## API

### `useLocalStorage(key: string, initialValue: null | string = null): null | string`

A hook for reading from and listening to changes in `localStorage`.

- `key`: The key under which to store the value in `localStorage`.
- `initialValue`: The initial value to be used if no value is stored in `localStorage` under the specified key.

Returns the stored value or `null` if no value is stored.

### `getItem(key: string): null | string`

A wrapper around `localStorage.getItem`. On the server, `localStorage` is not available so a `null` value is returned. On the client side, the actual value will be read and returned.

### `setItem(key: string, value: string): void`

A wrapper around `localStorage.setItem`. On the server, `localStorage` is not available so no operation will be performed. On the client side, the value will be set in `localStorage`, and an event will be dispatched which will be helpful for triggering side effects in the `useLocalStorage` hook.

### `removeItem(key: string): void`

A wrapper around `localStorage.removeItem`. On the server, `localStorage` is not available so no operation will be performed. On the client side, the value will be removed from `localStorage`, and an event will be dispatched which will be helpful for triggering side effects in the `useLocalStorage` hook.

## Usage

```jsx
import * as React from 'react';
import { useLocalStorage } from '@piplup/use-local-storage';

function App() {
  // Usage
  const value = useLocalStorage('myKey', 'defaultValue');

  return (
    <div>
      <p>Stored Value: {value}</p>
    </div>
  );
}
```
