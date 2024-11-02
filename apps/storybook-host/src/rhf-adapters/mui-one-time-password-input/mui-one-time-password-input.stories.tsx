import { MuiButtonElement, MuiFormHelperTextElement } from '@piplup/rhf-adapters/mui-material';
import { MuiOtpInputElement } from '@piplup/rhf-adapters/mui-one-time-password-input';
import { FormContainer } from '@piplup/rhf-core';
import { action } from '@storybook/addon-actions';
import { type Meta, type StoryFn } from '@storybook/react';

/**
 * A wrapper around the [\<MuiOtpInput /\>](https://viclafouch.github.io/mui-otp-input/) component pre-configured with `useMuiOtpInputAdapter`.
 *
 * ## <span className="docs-h2">Import</span>
 *
 * ```tsx
 * import { MuiOtpInputElement } from '@piplup/rhf-adapters/mui-one-time-password-input';
 * ```
 *
 * > Note: See the storybook actions panel for form submission results in individual story.
 */
const meta: Meta<typeof MuiOtpInputElement> = {
  args: {},
  argTypes: {},
  component: MuiOtpInputElement,
  tags: ['autodocs'],
  title: 'rhf-adapters/mui-one-time-password-input/MuiOtpInputElement',
};

export default meta;

const Template: StoryFn<typeof MuiOtpInputElement> = (props) => {
  return (
    <FormContainer onError={action('onError')} onSubmit={action('onSubmit')}>
      <div style={{ maxWidth: 300 }}>
        <MuiOtpInputElement {...props} />
        <MuiFormHelperTextElement name={props.name} renderOnError />
      </div>
      <MuiButtonElement sx={{ mt: 2 }} type="submit" variant="contained">
        Submit
      </MuiButtonElement>
    </FormContainer>
  );
};

export const Default = Template.bind({});
Default.args = {
  name: 'default-mui-otp-input',
};

export const WithPlaceholder = Template.bind({});
WithPlaceholder.args = {
  name: 'with-placeholder-mui-otp-input',
  TextFieldsProps: { placeholder: '-' },
};
