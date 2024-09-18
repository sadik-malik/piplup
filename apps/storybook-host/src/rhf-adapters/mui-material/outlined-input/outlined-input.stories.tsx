import { MuiOutlinedInputElement } from '@piplup/rhf-adapters/mui-material';
import { type Meta } from '@storybook/react';
import markdown from './outlined-input.md?raw';

const meta: Meta<typeof MuiOutlinedInputElement> = {
  args: {},
  argTypes: {},
  component: MuiOutlinedInputElement,
  parameters: {
    docs: {
      description: {
        component: markdown,
      },
    },
  },
  tags: ['autodocs'],
  title: 'rhf-adapters/mui-material/MuiOutlinedInputElement',
};

export default meta;

// type Story = StoryObj<typeof MuiOutlinedInputElement>;
