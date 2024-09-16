import { MuiInputBaseElement } from '@piplup/rhf-adapters/mui-material';
import { type Meta } from '@storybook/react';

const meta: Meta<typeof MuiInputBaseElement> = {
  args: {},
  argTypes: {},
  component: MuiInputBaseElement,
  parameters: {
    docs: {
      description: {
        component: `A wrapper around the \`<InputBase>\` component pre-configured with \`useMuiInputBaseAdapter\`.`,
      },
    },
  },
  tags: ['autodocs'],
  title: 'MUI-Material/MuiInputBaseElement',
};

export default meta;

// type Story = StoryObj<typeof MuiInputBaseElement>;
