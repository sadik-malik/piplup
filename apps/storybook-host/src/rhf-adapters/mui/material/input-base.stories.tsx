import { MuiButtonElement, MuiInputBaseElement } from '@piplup/rhf-adapters/mui-material';
import { FormContainer } from '@piplup/rhf-core';
import { type Meta, type StoryFn } from '@storybook/react-vite';
import { action } from 'storybook/actions';

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
  argTypes: {
    required: {
      control: 'boolean',
    },
  },
  component: MuiInputBaseElement,
  tags: ['autodocs'],
  title: 'rhf-adapters/mui-material/MuiInputBaseElement',
};

export default meta;

// type Story = StoryObj<typeof MuiInputBaseElement>;

const Template: StoryFn<typeof MuiInputBaseElement> = (props) => {
  return (
    <FormContainer onError={action('onError')} onSubmit={action('onSubmit')}>
      <div>
        <MuiInputBaseElement {...props} />
      </div>
      <MuiButtonElement sx={{ mt: 2 }} type="submit" variant="contained">
        Submit
      </MuiButtonElement>
    </FormContainer>
  );
};

export const Default = Template.bind({});
Default.args = {
  defaultValue: 'Hello World!',
  name: 'default-mui-input-base',
};
