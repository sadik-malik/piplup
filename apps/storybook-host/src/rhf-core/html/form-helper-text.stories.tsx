import { FormContainer } from '@piplup/rhf-core';
import {
  HtmlInputElement,
  HtmlButtonElement,
  HtmlFormHelperTextElement,
} from '@piplup/rhf-core/html';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';

/**
 * A wrapper around the html `<p>` element pre-configured with `useHtmlFormHelperTextAdapter`.
 *
 * ## <span className="docs-h2">Import</span>
 *
 * ```tsx
 * import { HtmlFormHelperTextElement } from '@piplup/rhf-core/html';
 * ```
 */
const meta: Meta<typeof HtmlFormHelperTextElement> = {
  args: {},
  argTypes: {},
  component: HtmlFormHelperTextElement,
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
