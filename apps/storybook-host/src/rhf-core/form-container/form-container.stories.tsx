import { FormContainer, HtmlButtonElement, HtmlInputElement } from '@piplup/rhf-core';
import { action } from '@storybook/addon-actions';
import { type Meta, type StoryObj } from '@storybook/react';
import markdown from './form-container.md?raw';

const meta: Meta<typeof FormContainer> = {
  args: {},
  argTypes: {},
  component: FormContainer,
  parameters: {
    docs: {
      description: {
        component: markdown,
      },
    },
  },

  tags: ['autodocs'],
  title: 'rhf-core/FormContainer',
};

export default meta;

type Story = StoryObj<typeof FormContainer>;

export const BasicForm: Story = {
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
          <HtmlButtonElement>Reset</HtmlButtonElement>
          <HtmlButtonElement type="submit">Submit</HtmlButtonElement>
        </div>
      </FormContainer>
    );
  },
};
