import { FormContainer, HtmlButtonElement, HtmlInputElement } from '@piplup/rhf-core';
import { action } from '@storybook/addon-actions';
import { type Meta, type StoryObj } from '@storybook/react';
import markdown from './button.md?raw';

const meta: Meta<typeof HtmlButtonElement> = {
  args: {},
  argTypes: {},
  component: HtmlButtonElement,
  parameters: {
    docs: {
      description: {
        component: markdown,
      },
    },
  },

  tags: ['autodocs'],
  title: 'rhf-core/html/HtmlButtonElement',
};

export default meta;

type Story = StoryObj<typeof HtmlButtonElement>;

export const Button: Story = {
  render() {
    return (
      <FormContainer
        onError={(errors) => {
          action('onError')(errors);
        }}
        onSubmit={(values) => {
          action('onSubmit')(values);
        }}
      >
        <HtmlButtonElement type="button">Button</HtmlButtonElement>
      </FormContainer>
    );
  },
};

export const ResetButton: Story = {
  render() {
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
          <HtmlButtonElement type="reset">Reset</HtmlButtonElement>
          <HtmlButtonElement type="submit">Submit</HtmlButtonElement>
        </div>
      </FormContainer>
    );
  },
};

export const SubmitButton: Story = {
  render() {
    return (
      <FormContainer
        onError={(errors) => {
          action('onError')(errors);
        }}
        onSubmit={(values) => {
          action('onSubmit')(values);
        }}
      >
        <HtmlButtonElement type="submit">Submit</HtmlButtonElement>
      </FormContainer>
    );
  },
};
