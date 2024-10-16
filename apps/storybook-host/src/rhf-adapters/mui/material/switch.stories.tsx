import { MuiButtonElement, MuiSwitchElement } from '@piplup/rhf-adapters/mui-material';
import { FormContainer } from '@piplup/rhf-core';
import { action } from '@storybook/addon-actions';
import { type Meta, type StoryObj } from '@storybook/react';

/**
 * A wrapper around the `<Switch>` component pre-configured with `useMuiSwitchAdapter`.
 *
 * ## <span className="docs-h2">Import</span>
 *
 * ```tsx
 * import { MuiSwitchElement } from '@piplup/rhf-adapters/mui-material';
 * ```
 *
 * > Note: See the storybook actions panel for form submission results in individual story.
 */
const meta: Meta<typeof MuiSwitchElement> = {
  args: {},
  argTypes: {},
  component: MuiSwitchElement,
  tags: ['autodocs'],
  title: 'rhf-adapters/mui-material/MuiSwitchElement',
};

export default meta;

type Story = StoryObj<typeof MuiSwitchElement>;

export const BasicSwitches: Story = {
  render() {
    return (
      <FormContainer
        defaultValues={{
          checked: true,
          'checked-disabled': true,
        }}
        onError={action('onError')}
        onSubmit={action('onSubmit')}
      >
        <div>
          <MuiSwitchElement inputProps={{ 'aria-label': 'Switch demo' }} name="checked" />
          <MuiSwitchElement inputProps={{ 'aria-label': 'Switch demo' }} name="unchecked" />
          <MuiSwitchElement
            inputProps={{ 'aria-label': 'Switch demo' }}
            name="checked-disabled"
            disabled
          />
          <MuiSwitchElement
            inputProps={{ 'aria-label': 'Switch demo' }}
            name="unchecked-disabled"
            disabled
          />
        </div>
        <MuiButtonElement sx={{ mt: 2 }} type="submit" variant="contained">
          Submit
        </MuiButtonElement>
      </FormContainer>
    );
  },
};
