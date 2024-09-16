import { FormContainer, HtmlButtonElement, HtmlInputElement } from '@piplup/rhf-core';
import { action } from '@storybook/addon-actions';
import { type Meta, type StoryObj } from '@storybook/react';

const meta: Meta<typeof HtmlButtonElement> = {
  args: {},
  argTypes: {},
  component: HtmlButtonElement,
  parameters: {
    docs: {
      description: {
        component:
          'A wrapper around the native HTML `<button>` pre-configured with `useHTMLButtonAdapter`.',
      },
    },
  },

  tags: ['autodocs'],
  title: 'HTML/HtmlButtonElement',
};

export default meta;

type Story = StoryObj<typeof HtmlButtonElement>;

export const Button: Story = {
  args: {
    type: 'button',
  },
  render(props) {
    return (
      <FormContainer
        onError={(errors) => {
          action('onError')(errors);
        }}
        onSubmit={(values) => {
          action('onSubmit')(values);
        }}
      >
        <HtmlButtonElement {...props}>Button</HtmlButtonElement>
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
        defaultValues={{
          email: 'test@example.com',
          password: 'password',
        }}
        formProps={{
          style: {
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            maxWidth: 250,
          },
        }}
        onError={(errors) => {
          action('onError')(errors);
        }}
        onSubmit={(values) => {
          action('onSubmit')(values);
        }}
      >
        <HtmlInputElement name="email" placeholder="email" type="email" required />
        <HtmlInputElement name="password" placeholder="password" type="password" required />
        <div style={{ display: 'flex', gap: 8 }}>
          <HtmlButtonElement {...props}>Reset</HtmlButtonElement>
          <HtmlButtonElement type="submit">Submit</HtmlButtonElement>
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
        onError={(errors) => {
          action('onError')(errors);
        }}
        onSubmit={(values) => {
          action('onSubmit')(values);
        }}
      >
        <HtmlButtonElement {...props}>Submit</HtmlButtonElement>
      </FormContainer>
    );
  },
};
