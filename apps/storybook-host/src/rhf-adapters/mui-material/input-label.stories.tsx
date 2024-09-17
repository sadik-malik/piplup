import { MuiInputLabelElement } from '@piplup/rhf-adapters/mui-material';
import { type Meta } from '@storybook/react';

const meta: Meta<typeof MuiInputLabelElement> = {
  args: {},
  argTypes: {},
  component: MuiInputLabelElement,
  parameters: {
    docs: {
      description: {
        component: `A wrapper around the \`<InputLabel>\` component pre-configured with \`useMuiInputLabelAdapter\`.`,
      },
    },
  },
  tags: ['autodocs'],
  title: 'MUI-Material/MuiInputLabelElement',
};

export default meta;

// type Story = StoryObj<typeof MuiInputLabelElement>;
