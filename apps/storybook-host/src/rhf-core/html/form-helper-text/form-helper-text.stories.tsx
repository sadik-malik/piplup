import {
  HtmlInputElement,
  HtmlButtonElement,
  FormContainer,
  HtmlFormHelperTextElement,
} from '@piplup/rhf-core';
import { action } from '@storybook/addon-actions';
import { type Meta, type StoryObj } from '@storybook/react';
import markdown from './form-helper-text.md?raw';

const meta: Meta<typeof HtmlFormHelperTextElement> = {
  args: {},
  argTypes: {},
  component: HtmlFormHelperTextElement,
  parameters: {
    docs: {
      description: {
        component: markdown,
      },
    },
  },

  tags: ['autodocs'],
  title: 'rhf-core/html/HtmlFormHelperTextElement',
};

export default meta;

type Story = StoryObj<typeof HtmlFormHelperTextElement>;

export const BasicFormHelperText: Story = {
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
        <label htmlFor="email">Email:</label>
        <br />
        <HtmlInputElement
          id="email"
          name="email"
          pattern={/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/}
        />
        <HtmlFormHelperTextElement
          style={({ error }) => ({
            color: error ? 'red' : 'inherit',
          })}
          name="email"
        >
          Error message will appear here
        </HtmlFormHelperTextElement>
        <HtmlButtonElement type="submit">Submit</HtmlButtonElement>
      </FormContainer>
    );
  },
};
