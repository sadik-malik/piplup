import { FormContainer } from '@piplup/rhf-core';
import {
  HtmlInputElement,
  HtmlButtonElement,
  HtmlFormHelperTextElement,
  HtmlFormLabelElement,
} from '@piplup/rhf-core/html';
import { action } from '@storybook/addon-actions';
import { type Meta, type StoryObj } from '@storybook/react';

/**
 * A wrapper around the html `<label>` element pre-configured with `useHtmlFormLabelAdapter`.
 *
 * ## <span className="docs-h2">Import</span>
 *
 * ```tsx
 * import { HtmlFormLabelElement } from '@piplup/rhf-core/html';
 * ```
 */
const meta: Meta<typeof HtmlFormHelperTextElement> = {
  args: {},
  argTypes: {},
  component: HtmlFormHelperTextElement,
  tags: ['autodocs'],
  title: 'rhf-core/html/HtmlFormLabelElement',
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
