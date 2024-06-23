---
title: Input
description: Manages the boilerplate code of connecting an HTML `<input>` element with `react-hook-form`.
sidebar_position: 1
---

# Input

## useHTMLInputAdapter

Manages the boilerplate code of connecting an HTML `<input>` element with `react-hook-form`.

```jsx
import { useHTMLInputAdapter } from '@piplup/rhf-adapters/html';
```

### Usage

```jsx
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useHTMLInputAdapter } from '@piplup/rhf-adapters/html';

function Input(props) {
  const adapter = useHTMLInputAdapter(props);
  return <input {...adapter} />;
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
      <Input control={control} name="user" />
    </form>
  );
}
```

## HTMLInputElement

A wrapper around native html `<input>` pre-configured with `useHTMLInputAdapter`.

```jsx
import { HTMLInputElement } from '@piplup/rhf-adapters/html';
```

## API & Examples

See [Storybook](http://localhost:4401/?path=/docs/htmlinputelement--docs) for API and examples.
