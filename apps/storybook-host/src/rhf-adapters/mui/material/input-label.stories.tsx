import { MuiInputLabelElement } from '@piplup/rhf-adapters/mui-material';
import { type Meta } from '@storybook/react';

/**
 * A wrapper around the `<InputLabel>` component pre-configured with `useMuiInputLabelAdapter`.
 *
 * ## <span className="docs-h2">Import</span>
 *
 * ```tsx
 * import { MuiInputLabelElement } from '@piplup/rhf-adapters/mui-material';
 * ```
 */
const meta: Meta<typeof MuiInputLabelElement> = {
  args: {},
  argTypes: {},
  component: MuiInputLabelElement,
  tags: ['autodocs'],
  title: 'rhf-adapters/mui-material/MuiInputLabelElement',
};

export default meta;

// type Story = StoryObj<typeof MuiInputLabelElement>;
