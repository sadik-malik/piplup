---
title: API & Usage
sidebar_position: 2
---

# API & Usage

API and usage reference docs for the `@piplup/use-event-listener`. Learn about the props and other APIs of this package.

## API

### `useEventListener(eventName, handler, element, options)`

- `eventName` (`string`): The name of the event to listen for, such as `'click'`, `'resize'`, etc.
- `handler` (`function`): The event handler function that will be called when the event is triggered.
- `element` (`RefObject`): A React ref object referencing the DOM element to which the event listener will be attached. If not provided, the event listener will be attached to the `window` object.
- `options` (`AddEventListenerOptions | boolean`, optional): Additional options to pass to the `addEventListener` function.

## Usage

```jsx
import * as React from 'react';
import { useEventListener } from '@piplup/use-event-listener';

function App() {
  const handleResize = (event) => {
    console.log('Window has been resized!', event);
  };

  useEventListener('resize', handleResize);

  return <div>useEventListener Demo</div>;
}
```
