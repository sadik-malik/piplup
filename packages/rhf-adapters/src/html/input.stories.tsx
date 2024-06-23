import { FormContainer, FormContainerProps } from '@piplup/rhf-core';
import type { Meta, StoryObj } from '@storybook/react';
import { HTMLInputElement } from './input';

const meta: Meta<typeof HTMLInputElement> = {
  component: HTMLInputElement,
  title: 'HTMLInputElement',
  tags: ['autodocs'],
  args: {
    id: undefined,
    name: undefined,
    control: undefined,
    defaultValue: undefined,
    disabled: false,
    rules: {},
    shouldUnregister: false,
    onChange: undefined,
    onBlur: undefined,
    type: 'text',
    transform: {
      input: undefined,
      output: undefined,
    },
    verbose: true,
    disableOnIsSubmitting: false,
    className: '',
    style: {},
    classes: {
      root: undefined,
      disabled: undefined,
      error: undefined,
    },
    required: false,
    messages: {
      required: undefined,
      minLength: undefined,
      maxLength: undefined,
      min: undefined,
      max: undefined,
      pattern: undefined,
      email: undefined,
    },
    value: undefined,
  },
  parameters: {
    docs: {
      description: {
        component:
          'A wrapper around the native HTML `<input>` pre-configured with `useHTMLInputAdapter`. Props of the native component are also available and will be forwarded to the component, if provided.',
      },
    },
  },
  argTypes: {
    id: {
      control: {
        type: 'text',
      },
      description: 'The unique identifier for the input element',
      table: {
        type: { summary: 'string' },
      },
    },
    name: {
      control: {
        type: 'text',
      },
      description: 'Name of the input field',
      table: {
        type: { summary: 'string' },
      },
    },
    control: {
      control: { type: null },
      description: 'Control object from react-hook-form',
      table: {
        type: { summary: 'object' },
      },
    },
    defaultValue: {
      control: {
        type: 'text',
      },
      description: 'Default value of the input',
      table: {
        type: { summary: 'string' },
      },
    },
    value: {
      control: {
        type: 'text',
      },
      description: 'Value for input field. Used in case of checkbox and radio type only.',
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      description: 'Disables the input field',
      defaultValue: false,
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    rules: {
      control: {
        type: 'object',
      },
      description: 'Validation rules for the input field',
      table: {
        type: { summary: 'object' },
      },
    },
    shouldUnregister: {
      control: {
        type: 'boolean',
      },
      description: 'Unregister input when unmounted',
      defaultValue: false,
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    onChange: {
      control: {
        type: 'function',
      },
      description: 'Function to call on input change',
      table: {
        type: { summary: 'function' },
      },
    },
    onBlur: {
      control: {
        type: 'function',
      },
      description: 'Function to call on input blur',
      table: {
        type: { summary: 'function' },
      },
    },
    type: {
      control: {
        type: 'select',
      },
      options: [
        'text',
        'checkbox',
        'color',
        'date',
        'datetime-local',
        'email',
        'file',
        'image',
        'month',
        'number',
        'password',
        'radio',
        'range',
        'search',
        'tel',
        'time',
        'url',
        'week',
      ],
      description: 'Specifies the type of input',
      defaultValue: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: {
          summary:
            'text | checkbox | color | date | datetime-local | email | file | image | month | number | password | radio | range | search | tel | time | url | week',
        },
      },
    },
    transform: {
      control: {
        type: 'object',
      },
      description: 'Functions to transform input value',
      table: {
        type: { summary: 'object' },
      },
    },
    verbose: {
      control: {
        type: 'boolean',
      },
      description: 'Enables verbose logging',
      defaultValue: true,
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      },
    },
    disableOnIsSubmitting: {
      control: {
        type: 'boolean',
      },
      description: 'Disables the input while the form is submitting',
      defaultValue: false,
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    className: {
      control: {
        type: 'text',
      },
      description: 'CSS class for the input field',
      table: {
        type: { summary: 'string' },
      },
    },
    style: {
      control: {
        type: 'object',
      },
      description:
        'Inline styles for the input field, can be an object or a function returning an object',
      defaultValue: {},
      table: {
        type: { summary: 'object | function' },
        defaultValue: { summary: '{}' },
      },
    },
    classes: {
      control: {
        type: 'object',
      },
      description: 'CSS classes for the input field',
      table: {
        type: { summary: 'object' },
        defaultValue: { summary: '{ root?: string, disabled?: string, error?: string }' },
      },
    },
    required: {
      control: {
        type: 'boolean',
      },
      description: 'Marks the input as required',
      defaultValue: false,
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    messages: {
      control: {
        type: 'object',
      },
      description: 'Validation messages for the input field',
      table: {
        type: { summary: 'object' },
        defaultValue: {
          summary: [
            '{',
            'required?: string,',
            'minLength?: string | ((minLength: number) => string),',
            'maxLength?: string | ((minLength: number) => string),',
            'min?: string | ((min: number) => string),',
            'max?: string | ((max: number) => string),',
            'pattern?:  string | ((pattern: RegExp, title?: string) => string)',
            'email?: string,',
            '}',
          ].join('\n'),
        },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof HTMLInputElement>;

export const Input: Story = {
  args: {
    name: 'input',
  },
  argTypes: {
    name: {
      control: 'text',
      description: 'Name of the input field',
    },
  },
  render(props) {
    const containerProps: Partial<FormContainerProps> = {
      values: {},
    };
    switch (props.type) {
      case 'radio':
      case 'checkbox':
        props.value = '1';
        break;
      case 'image':
        containerProps.values = {
          ...containerProps.values,
          [props.name]:
            'https://images.unsplash.com/photo-1598439210625-5067c578f3f6?q=80&w=150&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        };
        break;
      default:
    }
    return (
      <FormContainer {...containerProps}>
        <HTMLInputElement {...props} placeholder="Type text here" />
      </FormContainer>
    );
  },
};
