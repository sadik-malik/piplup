import { FormControl, FormControlLabel, FormLabel, Radio } from '@mui/material';
import { FormContainer, type FormContainerProps } from '@piplup/rhf-core';
import { type Meta, type StoryObj } from '@storybook/react';
import { MuiRadioGroupElement } from './element';

const meta: Meta<typeof MuiRadioGroupElement> = {
  component: MuiRadioGroupElement,
  title: 'MUI-Material/MuiRadioGroupElement',
  tags: ['autodocs'],
  args: {},
  parameters: {
    docs: {
      description: {
        component: `A wrapper around the \`<RadioGroup>\` component pre-configured with \`useMuiRadioGroupAdapater\`. Props of the RadioGroup component are also available and will be forwarded to the component, if provided. 
          
> **Note**: \`defaultChecked\` prop is not forwarded to the RadioGroup component, as we are using a controlled radio, which will be managed by react-hook-form. Additionally, the \`checked\` prop passed to adapter is treated as a function to compute the checked state of the radio group using the value stored in react-hook-form.`,
      },
    },
  },
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof MuiRadioGroupElement>;

export const RadioGroup: Story = {
  render() {
    const containerProps: Partial<FormContainerProps> = {
      values: {},
      onSubmit(values) {
        alert(JSON.stringify(values));
      },
    };

    return (
      <FormContainer {...containerProps}>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
          <MuiRadioGroupElement name="radio-buttons-group">
            <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </MuiRadioGroupElement>
        </FormControl>
      </FormContainer>
    );
  },
};
