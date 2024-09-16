import {
  FormContainer,
  type FormContainerProps,
  HtmlButtonElement,
  HtmlFormHelperTextElement,
  HtmlInputElement,
} from '@piplup/rhf-core';
import { action } from '@storybook/addon-actions';
import { type Meta, type StoryObj } from '@storybook/react';

const meta: Meta<typeof HtmlInputElement> = {
  args: {},
  argTypes: {
    type: {
      control: {
        type: 'select',
      },
      defaultValue: 'text',
      description: 'Specifies the type of input',
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
      table: {
        defaultValue: {
          summary:
            'text | checkbox | color | date | datetime-local | email | file | image | month | number | password | radio | range | search | tel | time | url | week',
        },
        type: { summary: 'string' },
      },
    },
  },
  component: HtmlInputElement,
  parameters: {
    docs: {
      description: {
        component:
          'A wrapper around the native HTML `<input>` pre-configured with `useHTMLInputAdapter`.',
      },
    },
  },
  tags: ['autodocs'],
  title: 'HTML/HtmlInputElement',
};

export default meta;

type Story = StoryObj<typeof HtmlInputElement>;

export const Input: Story = {
  argTypes: {},
  render(props) {
    const containerProps: Partial<FormContainerProps> = {
      onError: (errors) => {
        action('onError')(errors);
      },
      onSubmit: (values) => {
        action('onSubmit')(values);
      },
      values: {},
    };
    switch (props.type) {
      case 'radio':
        props.value = 'radio';
        break;
      case 'checkbox':
        props.value = 'checkbox';
        break;
      case 'image':
        containerProps.values = {
          ...containerProps.values,
        };
        break;
      default:
    }
    return (
      <FormContainer {...containerProps}>
        <HtmlInputElement {...props} name="input" placeholder="Type text here" />
        <br />
        <HtmlFormHelperTextElement
          style={({ error }) => ({
            color: error ? 'red' : 'inherit',
          })}
          name="input"
        />
        <HtmlButtonElement style={{ marginTop: 16 }} type="submit">
          Submit
        </HtmlButtonElement>
      </FormContainer>
    );
  },
};
