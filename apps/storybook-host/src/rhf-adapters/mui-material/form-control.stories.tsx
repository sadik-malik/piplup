import { MuiFormControlElement } from '@piplup/rhf-adapters/mui-material';
import { type Meta } from '@storybook/react';

const meta: Meta<typeof MuiFormControlElement> = {
  args: {},
  argTypes: {},
  component: MuiFormControlElement,
  parameters: {
    docs: {
      description: {
        component: `A wrapper around the \`<FormControl>\` component pre-configured with \`useMuiFormControlAdapter\`.`,
      },
    },
  },
  tags: ['autodocs'],
  title: 'MUI-Material/MuiFormControlElement',
};

export default meta;

// type Story = StoryObj<typeof MuiFormControlElement>;
