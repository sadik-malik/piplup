import { MuiFilledInputElement } from '@piplup/rhf-adapters/mui-material';
import { type Meta } from '@storybook/react';
import markdown from './filled-input.md?raw';

const meta: Meta<typeof MuiFilledInputElement> = {
  args: {},
  argTypes: {},
  component: MuiFilledInputElement,
  parameters: {
    docs: {
      description: {
        component: markdown,
      },
    },
  },
  tags: ['autodocs'],
  title: 'rhf-adapters/mui-material/MuiFilledInputElement',
};

export default meta;

// type Story = StoryObj<typeof MuiFilledInputElement>;
