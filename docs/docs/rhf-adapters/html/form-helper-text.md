---
title: Form Helper Text
description: Manages the boilerplate code of connecting an HTML `<p>` element with `react-hook-form` to display helper or error text.
sidebar_position: 3
---

# Form Helper Text

## HTMLFormHelperTextElement

A wrapper around the native HTML `<p>` element pre-configured with `useHTMLFormHelperTextAdapter`.

### Import

```jsx
import { HTMLFormHelperTextElement } from '@piplup/rhf-adapters/html';
```

### Usage

```jsx
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { HTMLFormHelperTextElement } from '@piplup/rhf-adapters/html';

function UserForm() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      user: 'John Doe',
    },
  });

  return (
    <form
      onSubmit={handleSubmit((values) => {
        alert(JSON.stringify(values));
      })}
    >
      <label for="user">User</label>
      <input id="user" name="user" control={control} />
      <HTMLFormHelperTextElement control={control} name="user" />
    </form>
  );
}
```

## useHTMLFormHelperTextAdapter

Manages the boilerplate code of connecting an HTML `<p>` element with `react-hook-form` to display helper or error text.

### Import

```jsx
import { useHTMLFormHelperTextAdapter } from '@piplup/rhf-adapters/html';
```

### Usage

```jsx
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useHTMLFormHelperTextAdapter } from '@piplup/rhf-adapters/html';

function FormHelperText(props) {
  const adapter = useHTMLFormHelperTextAdapter(props);
  return <p {...adapter} />;
}

function Form() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      user: 'John Doe',
    },
  });

  return (
    <form
      onSubmit={handleSubmit((values) => {
        alert(JSON.stringify(values));
      })}
    >
      <label for="user">User</label>
      <input id="user" name="user" control={control} />
      <FormHelperText control={control} name="user" />
    </form>
  );
}
```

## API

| Name          | Required | Default | Description                                            |
| ------------- | -------- | ------- | ------------------------------------------------------ |
| `control`     | Yes      | -       | Control object from `react-hook-form`.                 |
| `name`        | Yes      | -       | Name of the field to display helper or error text for. |
| `disabled`    | No       | `false` | Whether the helper text should be disabled.            |
| `verbose`     | No       | `true`  | Enable internal console log messages.                  |
| `style`       | No       | -       | Custom styles or style functions.                      |
| `classes`     | No       | -       | Custom class names.                                    |
| `errorParser` | No       | -       | Function to parse error messages.                      |

Props of the native component are also available and will be forwarded to the component, if provided.
