import { MuiFilledInputElement } from '@piplup/rhf-adapters/mui-material';
import { type Meta } from '@storybook/react';

const meta: Meta<typeof MuiFilledInputElement> = {
  args: {},
  argTypes: {},
  component: MuiFilledInputElement,
  parameters: {
    docs: {
      description: {
        component: `A wrapper around the \`<FilledInput>\` component pre-configured with \`useMuiFilledInputAdapter\`.`,
      },
    },
  },
  tags: ['autodocs'],
  title: 'MUI-Material/MuiFilledInputElement',
};

export default meta;

// type Story = StoryObj<typeof MuiFilledInputElement>;
