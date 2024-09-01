import { type Meta, type StoryObj } from '@storybook/react';
import { HtmlFormHelperTextElement } from './element';
import { FormContainer } from '../../form';
import { HtmlInputElement } from '../input';

const meta: Meta<typeof HtmlFormHelperTextElement> = {
  component: HtmlFormHelperTextElement,
  title: 'HTML/HtmlFormHelperTextElement',
  tags: ['autodocs'],
  args: {},

  argTypes: {},
  parameters: {
    docs: {
      description: {
        component:
          'A wrapper around the native HTML `<p>` pre-configured with `useHtmlFormHelperTextAdapter`. Props of the native component are also available and will be forwarded to the component, if provided.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof HtmlFormHelperTextElement>;

export const BasicFormHelperText: Story = {
  render() {
    return (
      <FormContainer
        onSubmit={() => {
          alert('Submitted');
        }}
      >
        <HtmlInputElement
          name="email"
          pattern={/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/}
        />
        <HtmlFormHelperTextElement name="email">
          error message will appear here
        </HtmlFormHelperTextElement>
      </FormContainer>
    );
  },
};
