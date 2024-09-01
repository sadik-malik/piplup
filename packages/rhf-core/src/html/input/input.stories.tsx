import { type Meta, type StoryObj } from '@storybook/react';
import { HtmlInputElement } from './element';
import { FormContainer, type FormContainerProps } from '../../form';

const meta: Meta<typeof HtmlInputElement> = {
  component: HtmlInputElement,
  title: 'HTML/HtmlInputElement',
  tags: ['autodocs'],
  args: {},
  parameters: {
    docs: {
      description: {
        component:
          'A wrapper around the native HTML `<input>` pre-configured with `useHTMLInputAdapter`. Props of the native component are also available and will be forwarded to the component, if provided.',
      },
    },
  },
  argTypes: {
    type: {
      control: {
        type: 'select',
      },
      options: [
        'text',
        'checkbox',
        'color',
        'date',
        'datetime-local',
        'email',
        'file',
        'image',
        'month',
        'number',
        'password',
        'radio',
        'range',
        'search',
        'tel',
        'time',
        'url',
        'week',
      ],
      description: 'Specifies the type of input',
      defaultValue: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: {
          summary:
            'text | checkbox | color | date | datetime-local | email | file | image | month | number | password | radio | range | search | tel | time | url | week',
        },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof HtmlInputElement>;

export const Input: Story = {
  args: {
    name: 'input',
  },
  argTypes: {
    name: {
      control: 'text',
      description: 'Name of the input field',
    },
  },
  render(props) {
    const containerProps: Partial<FormContainerProps> = {
      values: {},
    };
    switch (props.type) {
      case 'radio':
      case 'checkbox':
        props.value = '1';
        break;
      case 'image':
        containerProps.values = {
          ...containerProps.values,
          [props.name]:
            'https://images.unsplash.com/photo-1598439210625-5067c578f3f6?q=80&w=150&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        };
        break;
      default:
    }
    return (
      <FormContainer {...containerProps}>
        <HtmlInputElement {...props} placeholder="Type text here" />
      </FormContainer>
    );
  },
};
