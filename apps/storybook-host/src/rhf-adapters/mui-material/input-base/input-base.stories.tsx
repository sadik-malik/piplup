import { MuiInputBaseElement } from '@piplup/rhf-adapters/mui-material';
import { type Meta } from '@storybook/react';
import markdown from './input-base.md?raw';

const meta: Meta<typeof MuiInputBaseElement> = {
  args: {},
  argTypes: {},
  component: MuiInputBaseElement,
  parameters: {
    docs: {
      description: {
        component: markdown,
      },
    },
  },
  tags: ['autodocs'],
  title: 'rhf-adapters/mui-material/MuiInputBaseElement',
};

export default meta;

// type Story = StoryObj<typeof MuiInputBaseElement>;
