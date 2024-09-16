import { MuiRadioElement } from '@piplup/rhf-adapters/mui-material';
import { FormContainer, type FormContainerProps } from '@piplup/rhf-core';
import { type Meta, type StoryObj } from '@storybook/react';

const meta: Meta<typeof MuiRadioElement> = {
  args: {},
  argTypes: {},
  component: MuiRadioElement,
  parameters: {
    docs: {
      description: {
        component: `A wrapper around the \`<Radio>\` component pre-configured with \`useMuiRadioAdapater\`.`,
      },
    },
  },
  tags: ['autodocs'],
  title: 'MUI-Material/MuiRadioElement',
};

export default meta;

type Story = StoryObj<typeof MuiRadioElement>;

export const StandaloneRadioButtons: Story = {
  render() {
    const containerProps: Partial<FormContainerProps> = {
      onSubmit(values) {
        alert(JSON.stringify(values));
      },
      values: {},
    };

    return (
      <FormContainer {...containerProps}>
        <MuiRadioElement inputProps={{ 'aria-label': 'A' }} name="radio-buttons" value="a" />
        <MuiRadioElement inputProps={{ 'aria-label': 'B' }} name="radio-buttons" value="b" />
      </FormContainer>
    );
  },
};
