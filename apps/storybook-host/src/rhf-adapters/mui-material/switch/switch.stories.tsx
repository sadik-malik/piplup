import { MuiButtonElement, MuiSwitchElement } from '@piplup/rhf-adapters/mui-material';
import { FormContainer } from '@piplup/rhf-core';
import { action } from '@storybook/addon-actions';
import { type Meta, type StoryObj } from '@storybook/react';
import markdown from './switch.md?raw';

const meta: Meta<typeof MuiSwitchElement> = {
  args: {},
  argTypes: {},
  component: MuiSwitchElement,
  parameters: {
    docs: {
      description: {
        component: markdown,
      },
    },
  },
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
