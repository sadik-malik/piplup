import {
  MuiButtonElement,
  MuiInputBaseElement,
  MuiInputLabelElement,
} from '@piplup/rhf-adapters/mui-material';
import { FormContainer } from '@piplup/rhf-core';
import { type StoryFn, type Meta } from '@storybook/react-vite';
import { action } from 'storybook/actions';

/**
 * A wrapper around the `<InputLabel>` component pre-configured with `useMuiInputLabelAdapter`.
 *
 * ## <span className="docs-h2">Import</span>
 *
 * ```tsx
 * import { MuiInputLabelElement } from '@piplup/rhf-adapters/mui-material';
 * ```
 *
 * > Note: See the storybook actions panel for form submission results in individual story.
 */
const meta: Meta<typeof MuiInputLabelElement> = {
  args: {
    children: 'Input Label',
    required: true,
  },
  argTypes: {
    required: {
      control: 'boolean',
    },
  },
  component: MuiInputLabelElement,
  tags: ['autodocs'],
  title: 'rhf-adapters/mui-material/MuiInputLabelElement',
};

export default meta;

// type Story = StoryObj<typeof MuiInputLabelElement>;

const Template: StoryFn<typeof MuiInputLabelElement> = (props) => {
  return (
    <FormContainer onError={action('onError')} onSubmit={action('onSubmit')}>
      <div>
        <div>
          <MuiInputLabelElement {...props} />
        </div>
        <MuiInputBaseElement
          sx={{
            border: '1px solid #ccc',
            px: 1,
          }}
          control={props.control}
          name={props.name}
          required={props.required}
        />
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
  name: 'default-mui-input-label',
};
