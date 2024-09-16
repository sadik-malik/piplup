import { MuiOutlinedInputElement } from '@piplup/rhf-adapters/mui-material';
import { type Meta } from '@storybook/react';

const meta: Meta<typeof MuiOutlinedInputElement> = {
  args: {},
  argTypes: {},
  component: MuiOutlinedInputElement,
  parameters: {
    docs: {
      description: {
        component: `A wrapper around the \`<OutlinedInput>\` component pre-configured with \`useMuiOutlinedInputAdapter\`.`,
      },
    },
  },
  tags: ['autodocs'],
  title: 'MUI-Material/MuiOutlinedInputElement',
};

export default meta;

// type Story = StoryObj<typeof MuiOutlinedInputElement>;
