import {
  HtmlButtonElement,
  HtmlFormHelperTextElement,
  HtmlTextareaElement,
} from '@piplup/rhf-adapters/html';
import { FormContainer, type FormContainerProps } from '@piplup/rhf-core';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';

/**
 * A wrapper around the html `<textarea>` element pre-configured with `useHtmlTextareaAdapter`.
 *
 * ## <span className="docs-h2">Import</span>
 *
 * ```tsx
 * import { HtmlTextareaElement } from '@piplup/rhf-adapters/html';
 * ```
 */
const meta: Meta<typeof HtmlTextareaElement> = {
  component: HtmlTextareaElement,
  tags: ['autodocs'],
  title: 'rhf-adapters/html/HtmlTextareaElement',
};

export default meta;

type Story = StoryObj<typeof HtmlTextareaElement>;

export const BasicTextarea: Story = {
  render() {
    const containerProps: Partial<FormContainerProps> = {
      onError: (errors) => {
        action('onError')(errors);
      },
      onSubmit: (values) => {
        action('onSubmit')(values);
      },
      values: {},
    };
    return (
      <FormContainer {...containerProps}>
        <HtmlTextareaElement name="textarea" placeholder="Type text here" />
        <br />
        <HtmlFormHelperTextElement
          style={({ error }) => ({
            color: error ? 'red' : 'inherit',
          })}
          name="textarea"
        />
        <HtmlButtonElement style={{ marginTop: 16 }} type="submit">
          Submit
        </HtmlButtonElement>
      </FormContainer>
    );
  },
};
