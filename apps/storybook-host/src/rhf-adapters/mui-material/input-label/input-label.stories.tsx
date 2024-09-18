import { MuiInputLabelElement } from '@piplup/rhf-adapters/mui-material';
import { type Meta } from '@storybook/react';
import markdown from './input-label.md?raw';

const meta: Meta<typeof MuiInputLabelElement> = {
  args: {},
  argTypes: {},
  component: MuiInputLabelElement,
  parameters: {
    docs: {
      description: {
        component: markdown,
      },
    },
  },
  tags: ['autodocs'],
  title: 'rhf-adapters/mui-material/MuiInputLabelElement',
};

export default meta;

// type Story = StoryObj<typeof MuiInputLabelElement>;
