import { FormContainer, type FormContainerProps } from '@piplup/rhf-core';
import { action } from '@storybook/addon-actions';
import { type Meta, type StoryObj } from '@storybook/react';
import { MuiSwitchElement } from './element';
import { MuiButtonElement } from '../button';

const meta: Meta<typeof MuiSwitchElement> = {
  args: {},
  argTypes: {},
  component: MuiSwitchElement,
  parameters: {
    docs: {
      description: {
        component: `A wrapper around the \`<Switch>\` component pre-configured with \`useMuiSwitchAdapter\`. Props of the Switch component are also available and will be forwarded to the component, if provided.`,
      },
    },
  },
  tags: ['autodocs'],
  title: 'MUI-Material/MuiSwitchElement',
};

export default meta;

type Story = StoryObj<typeof MuiSwitchElement>;

export const BasicSwitches: Story = {
  render() {
    const containerProps: Partial<FormContainerProps> = {
      defaultValues: {
        checked: true,
        'checked-disabled': true,
      },
      onSubmit(values) {
        action('onSubmit')(values);
      },
    };

    return (
      <FormContainer {...containerProps}>
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
