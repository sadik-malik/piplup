import { type Meta, type StoryObj } from '@storybook/react';
import { HtmlButtonElement } from './element';
import { FormContainer } from '../../form';
import { HtmlInputElement } from '../input';

const meta: Meta<typeof HtmlButtonElement> = {
  component: HtmlButtonElement,
  title: 'HTML/HtmlButtonElement',
  tags: ['autodocs'],
  args: {},

  argTypes: {},
  parameters: {
    docs: {
      description: {
        component:
          'A wrapper around the native HTML `<button>` pre-configured with `useHTMLButtonAdapter`. Props of the native component are also available and will be forwarded to the component, if provided.',
      },
    },
  },
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
        onSubmit={() => {
          alert('Submitted');
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
        onSubmit={(values) => {
          alert(JSON.stringify(values));
        }}
        formProps={{
          style: {
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            maxWidth: 250,
          },
        }}
        defaultValues={{
          email: 'test@example.com',
          password: 'password',
        }}
      >
        <HtmlInputElement name="email" type="email" required placeholder="email" />
        <HtmlInputElement name="password" type="password" required placeholder="password" />
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
        onSubmit={() => {
          alert('Submitted');
        }}
      >
        <HtmlButtonElement {...props}>Submit</HtmlButtonElement>
      </FormContainer>
    );
  },
};
