import {
  HtmlInputElement,
  HtmlButtonElement,
  FormContainer,
  HtmlFormHelperTextElement,
  HtmlFormLabelElement,
} from '@piplup/rhf-core';
import { action } from '@storybook/addon-actions';
import { type Meta, type StoryObj } from '@storybook/react';

const meta: Meta<typeof HtmlFormHelperTextElement> = {
  args: {},
  argTypes: {},
  component: HtmlFormHelperTextElement,
  parameters: {
    docs: {
      description: {
        component:
          'A wrapper around the native HTML `<label>` pre-configured with `useHtmlFormLabelAdapter`.',
      },
    },
  },

  tags: ['autodocs'],
  title: 'HTML/HtmlFormLabelElement',
};

export default meta;

type Story = StoryObj<typeof HtmlFormHelperTextElement>;

export const BasicFormLabel: Story = {
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
        <HtmlFormLabelElement
          style={({ error }) => ({
            color: error ? 'red' : 'inherit',
          })}
          htmlFor="email"
          name="email"
        >
          Email:
        </HtmlFormLabelElement>
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
