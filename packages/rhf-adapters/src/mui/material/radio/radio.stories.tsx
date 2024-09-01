import { FormContainer, type FormContainerProps } from '@piplup/rhf-core';
import { type Meta, type StoryObj } from '@storybook/react';
import { MuiRadioElement } from './element';

const meta: Meta<typeof MuiRadioElement> = {
  component: MuiRadioElement,
  title: 'MUI-Material/MuiRadioElement',
  tags: ['autodocs'],
  args: {},
  parameters: {
    docs: {
      description: {
        component: `A wrapper around the \`<Radio>\` component pre-configured with \`useMuiRadioAdapater\`. Props of the Radio component are also available and will be forwarded to the component, if provided. 
          
> **Note**: \`defaultChecked\` prop is not forwarded to the Radio component, as we are using a controlled radio, which will be managed by react-hook-form. Additionally, the \`checked\` prop passed to adapter is treated as a function to compute the checked state of the radio using the value stored in react-hook-form.`,
      },
    },
  },
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof MuiRadioElement>;

export const StandaloneRadioButtons: Story = {
  render() {
    const containerProps: Partial<FormContainerProps> = {
      values: {},
      onSubmit(values) {
        alert(JSON.stringify(values));
      },
    };

    return (
      <FormContainer {...containerProps}>
        <MuiRadioElement value="a" name="radio-buttons" inputProps={{ 'aria-label': 'A' }} />
        <MuiRadioElement value="b" name="radio-buttons" inputProps={{ 'aria-label': 'B' }} />
      </FormContainer>
    );
  },
};
