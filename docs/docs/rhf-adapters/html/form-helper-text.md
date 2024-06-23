---
title: Form Helper Text
description: Manages the boilerplate code of connecting an HTML `<p>` element with `react-hook-form` to display helper or error text.
sidebar_position: 3
---

# Form Helper Text

## useHTMLFormHelperTextAdapter

Manages the boilerplate code of connecting an HTML `<p>` element with `react-hook-form` to display helper or error text.

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

## HTMLFormHelperTextElement

A wrapper around the native HTML `<p>` element pre-configured with `useHTMLFormHelperTextAdapter`.

```jsx
import { HTMLFormHelperTextElement } from '@piplup/rhf-adapters/html';
```
