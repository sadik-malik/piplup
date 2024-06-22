---
title: Input
description: Manages the boilerplate code of connecting an HTML `<input>` element with `react-hook-form`.
sidebar_position: 1
---

# Input

## HTMLInputElement

A wrapper around native html `<input>` pre-configured with `useHTMLInputAdapter`.

### Import

```jsx
import { HTMLInputElement } from '@piplup/rhf-adapters/html';
```

### Usage

```jsx
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { HTMLInputElement } from '@piplup/rhf-adapters/html';

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
      <HTMLInputElement control={control} name="user" />
    </form>
  );
}
```

## useHTMLInputAdapter

Manages the boilerplate code of connecting an HTML `<input>` element with `react-hook-form`.

### Import

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

## API

| Name                    | Required                                  | Default | Description                                                                             |
| ----------------------- | ----------------------------------------- | ------- | --------------------------------------------------------------------------------------- |
| `control`               | Yes, Optional when using `FormContainer`. | -       | Control object from `react-hook-form`.                                                  |
| `name`                  | Yes                                       | -       | Name of the input field.                                                                |
| `defaultValue`          | No                                        | -       | Default value for the input field.                                                      |
| `transform`             | No                                        | -       | Transformation functions for input and output values.                                   |
| `verbose`               | No                                        | `true`  | Enable internal console log messages                                                    |
| `disableOnIsSubmitting` | No                                        | `false` | Disable input when the form is submitting.                                              |
| `style`                 | No                                        | -       | Custom styles or style functions.                                                       |
| `classes`               | No                                        | -       | Custom class names.                                                                     |
| `messages`              | No                                        | -       | Custom validation messages.                                                             |
| `type`                  | No                                        | -       | Type of the input element (e.g., `text`, `number`, `file` etc.).                        |
| `rules`                 | No                                        | -       | Validation rules from `react-hook-form`.                                                |
| `disabled`              | No                                        | -       | Whether the input is disabled.                                                          |
| `shouldUnregister`      | No                                        | -       | Whether the input should be unregistered from the form when it is removed from the DOM. |
| `onChange`              | No                                        | -       | Callback function to handle change events.                                              |
| `onBlur`                | No                                        | -       | Callback function to handle blur events.                                                |
| `className`             | No                                        | -       | Custom class name for the input element.                                                |
| `required`              | No                                        | -       | Whether the input is required.                                                          |
| `min`                   | No                                        | -       | Minimum value for the input element (for `number` type).                                |
| `minLength`             | No                                        | -       | Minimum length for the input element.                                                   |
| `max`                   | No                                        | -       | Maximum value for the input element (for `number` type).                                |
| `maxLength`             | No                                        | -       | Maximum length for the input element.                                                   |
| `pattern`               | No                                        | -       | Regular expression pattern for the input element.                                       |
| `title`                 | No                                        | -       | Title attribute for the input element.                                                  |

Props of the native component are also available and will be forwarded to the component, if provided.
