---
title: Button
description: Manages the boilerplate code of connecting an HTML `<button>` element with `react-hook-form`.
sidebar_position: 2
---

# Button

## useHTMLButtonAdapter

Manages the boilerplate code of connecting an HTML `<button>` element with `react-hook-form`.

```jsx
import { useHTMLButtonAdapter } from '@piplup/rhf-adapters/html';
```

### Usage

```jsx
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useHTMLButtonAdapter } from '@piplup/rhf-adapters/html';

function Button(props) {
  const adapter = useHTMLButtonAdapter(props);

  return <button {...adapter}>Submit</button>;
}

function Form() {
  const { control, handleSubmit } = useForm({});
  return (
    <form
      onSubmit={handleSubmit(() => {
        alert('Submitted');
      })}
    >
      <Button control={control} type="submit" />
    </form>
  );
}
```

## HTMLButtonElement

A wrapper around the native HTML `<button>` pre-configured with `useHTMLButtonAdapter`.

```jsx
import { HTMLButtonElement } from '@piplup/rhf-adapters/html';
```

## API & Examples

See [Storybook](http://localhost:4401/?path=/docs/htmlbuttonelement--docs) for API and examples.
