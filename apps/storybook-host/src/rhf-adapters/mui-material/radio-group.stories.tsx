import { FormControl, FormControlLabel, FormLabel, Radio } from '@mui/material';
import { MuiRadioGroupElement } from '@piplup/rhf-adapters/mui-material';
import { FormContainer, type FormContainerProps } from '@piplup/rhf-core';
import { type Meta, type StoryObj } from '@storybook/react';

const meta: Meta<typeof MuiRadioGroupElement> = {
  args: {},
  argTypes: {},
  component: MuiRadioGroupElement,
  parameters: {
    docs: {
      description: {
        component: `A wrapper around the \`<RadioGroup>\` component pre-configured with \`useMuiRadioGroupAdapater\`.`,
      },
    },
  },
  tags: ['autodocs'],
  title: 'MUI-Material/MuiRadioGroupElement',
};

export default meta;

type Story = StoryObj<typeof MuiRadioGroupElement>;

export const RadioGroup: Story = {
  render() {
    const containerProps: Partial<FormContainerProps> = {
      onSubmit(values) {
        alert(JSON.stringify(values));
      },
      values: {},
    };

    return (
      <FormContainer {...containerProps}>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
          <MuiRadioGroupElement name="radio-buttons-group">
            <FormControlLabel control={<Radio />} label="Female" value="female" />
            <FormControlLabel control={<Radio />} label="Male" value="male" />
            <FormControlLabel control={<Radio />} label="Other" value="other" />
          </MuiRadioGroupElement>
        </FormControl>
      </FormContainer>
    );
  },
};
