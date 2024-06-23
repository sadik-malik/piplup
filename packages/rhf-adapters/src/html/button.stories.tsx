import { FormContainer } from '@piplup/rhf-core';
import type { Meta, StoryObj } from '@storybook/react';
import { HTMLButtonElement } from './button';
import { HTMLInputElement } from './input';

const meta: Meta<typeof HTMLButtonElement> = {
  component: HTMLButtonElement,
  title: 'HTMLButtonElement',
  tags: ['autodocs'],
  args: {
    type: undefined,
    disabled: false,
    disableOnError: false,
    disableOnIsSubmitting: false,
    classes: {
      disabled: '',
      error: '',
      root: '',
    },
    style: {},
    verbose: false,
  },

  argTypes: {
    type: {
      control: 'radio',
      options: ['button', 'submit', 'reset'],
      description: 'Type of the button element',
      table: {
        type: { summary: 'button | submit | reset' },
        defaultValue: {
          summary: 'Different browsers may use different default types for the <button> element.',
        },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Indicates whether the button is disabled',
      defaultValue: false,
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    disableOnError: {
      control: 'boolean',
      description: 'Disables the button if there is an error in form',
      defaultValue: false,
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    disableOnIsSubmitting: {
      control: 'boolean',
      description: 'Disables the button while the form is submitting',
      defaultValue: false,
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    classes: {
      control: 'object',
      description: 'CSS classes for the button',
      defaultValue: {
        disabled: '',
        error: '',
        root: '',
      },
      table: {
        type: { summary: 'object' },
        defaultValue: { summary: '{ disabled: "", error: "", root: "" }' },
      },
    },
    style: {
      control: 'object',
      description:
        'Inline styles for the button, can be an object or a function returning an object',
      defaultValue: {},
      table: {
        type: { summary: 'object | function' },
        defaultValue: { summary: '{}' },
      },
    },
    verbose: {
      control: 'boolean',
      description: 'Enables verbose logging',
      defaultValue: false,
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A wrapper around the native HTML `<button>` pre-configured with `useHTMLButtonAdapter`. Props of the native component are also available and will be forwarded to the component, if provided.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof HTMLButtonElement>;

export const Button: Story = {
  args: {
    type: 'button',
  },
  render(props) {
    return (
      <FormContainer
        onSubmit={() => {
          alert('Submitted');
        }}
      >
        <HTMLButtonElement {...props}>Button</HTMLButtonElement>
      </FormContainer>
    );
  },
};

export const ResetButton: Story = {
  args: {
    type: 'reset',
  },
  render(props) {
    return (
      <FormContainer
        onSubmit={(values) => {
          alert(JSON.stringify(values));
        }}
        formProps={{
          style: {
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            maxWidth: 200,
          },
        }}
        defaultValues={{
          email: 'test@example.com',
          password: 'password',
        }}
      >
        <HTMLInputElement name="email" type="email" required placeholder="email" />
        <HTMLInputElement name="password" type="password" required placeholder="password" />
        <div style={{ display: 'flex', gap: 8 }}>
          <HTMLButtonElement {...props}>Reset</HTMLButtonElement>
          <HTMLButtonElement type="submit">Submit</HTMLButtonElement>
        </div>
      </FormContainer>
    );
  },
};

export const SubmitButton: Story = {
  args: {
    type: 'submit',
  },
  render(props) {
    return (
      <FormContainer
        onSubmit={() => {
          alert('Submitted');
        }}
      >
        <HTMLButtonElement {...props}>Submit</HTMLButtonElement>
      </FormContainer>
    );
  },
};
