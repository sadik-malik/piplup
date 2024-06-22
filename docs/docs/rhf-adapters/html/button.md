---
title: Button
description: Manages the boilerplate code of connecting an HTML `<button>` element with `react-hook-form`.
sidebar_position: 2
---

# Button

## HTMLButtonElement

A wrapper around the native HTML `<button>` pre-configured with `useHTMLButtonAdapter`.

### Import

```jsx
import { HTMLButtonElement } from '@piplup/rhf-adapters/html';
```

### Usage

```jsx
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { HTMLButtonElement } from '@piplup/rhf-adapters/html';

function Form() {
  const { control, handleSubmit } = useForm({});
  return (
    <form
      onSubmit={handleSubmit(() => {
        alert('Submitted');
      })}
    >
      <HTMLButtonElement control={control} type="submit" />
    </form>
  );
}
```

## useHTMLButtonAdapter

Manages the boilerplate code of connecting an HTML `<button>` element with `react-hook-form`.

### Import

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

## API

| Name                    | Required | Default  | Description                                                     |
| ----------------------- | -------- | -------- | --------------------------------------------------------------- |
| `control`               | Yes      | -        | Control object from `react-hook-form`.                          |
| `verbose`               | No       | `true`   | Enable internal console log messages.                           |
| `disableOnIsSubmitting` | No       | `false`  | Disable button when the form is submitting.                     |
| `disableOnError`        | No       | `false`  | Disable button when there is an error.                          |
| `style`                 | No       | -        | CSS styles or style function.                                   |
| `classes`               | No       | -        | Custom class names.                                             |
| `disabled`              | No       | -        | Whether the button is disabled.                                 |
| `type`                  | No       | `button` | Type of the button element (e.g., `button`, `submit`, `reset`). |
| `className`             | No       | -        | Custom class name for the button element.                       |

Props of the native component are also available and will be forwarded to the component, if provided.
