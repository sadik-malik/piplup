import { MuiFormLabelElement } from '@piplup/rhf-adapters/mui-material';
import { type Meta } from '@storybook/react';

const meta: Meta<typeof MuiFormLabelElement> = {
  args: {},
  argTypes: {},
  component: MuiFormLabelElement,
  parameters: {
    docs: {
      description: {
        component: `A wrapper around the \`<FormLabel>\` component pre-configured with \`useMuiFormLabelAdapter\`.`,
      },
    },
  },
  tags: ['autodocs'],
  title: 'MUI-Material/MuiFormLabelElement',
};

export default meta;

// type Story = StoryObj<typeof MuiFormLabelElement>;
