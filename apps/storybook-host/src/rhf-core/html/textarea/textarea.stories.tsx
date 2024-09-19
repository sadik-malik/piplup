import {
  FormContainer,
  type FormContainerProps,
  HtmlButtonElement,
  HtmlFormHelperTextElement,
  HtmlTextareaElement,
} from '@piplup/rhf-core';
import { action } from '@storybook/addon-actions';
import { type Meta, type StoryObj } from '@storybook/react';
import markdown from './textarea.md?raw';

const meta: Meta<typeof HtmlTextareaElement> = {
  component: HtmlTextareaElement,
  parameters: {
    docs: {
      description: {
        component: markdown,
      },
    },
  },
  tags: ['autodocs'],
  title: 'rhf-core/html/HtmlTextareaElement',
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
