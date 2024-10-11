import { MuiInputBaseElement } from '@piplup/rhf-adapters/mui-material';
import { type Meta } from '@storybook/react';

/**
 * A wrapper around the `<InputBase>` component pre-configured with `useMuiInputBaseAdapter`.
 *
 * ## <span className="docs-h2">Import</span>
 *
 * ```tsx
 * import { MuiInputBaseElement } from '@piplup/rhf-adapters/mui-material';
 * ```
 *
 * > Note: See the storybook actions panel for form submission results in individual story.
 */
const meta: Meta<typeof MuiInputBaseElement> = {
  args: {},
  argTypes: {},
  component: MuiInputBaseElement,
  tags: ['autodocs'],
  title: 'rhf-adapters/mui-material/MuiInputBaseElement',
};

export default meta;

// type Story = StoryObj<typeof MuiInputBaseElement>;
