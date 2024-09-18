import { Box, FormControl, FormControlLabel, Radio } from '@mui/material';
import {
  MuiButtonElement,
  MuiFormHelperTextElement,
  MuiFormLabelElement,
  MuiRadioGroupElement,
} from '@piplup/rhf-adapters/mui-material';
import { FormContainer, type FormContainerProps } from '@piplup/rhf-core';
import { action } from '@storybook/addon-actions';
import { type Meta, type StoryObj } from '@storybook/react';
import markdown from './form-label.md?raw';

const meta: Meta<typeof MuiFormLabelElement> = {
  args: {},
  argTypes: {},
  component: MuiFormLabelElement,
  parameters: {
    docs: {
      description: {
        component: markdown,
      },
    },
  },
  tags: ['autodocs'],
  title: 'rhf-adapters/mui-material/MuiFormLabelElement',
};

export default meta;

type Story = StoryObj<typeof MuiFormLabelElement>;

export const BasicFormLabel: Story = {
  render() {
    const containerProps: Partial<FormContainerProps> = {
      onSubmit(values) {
        action('onSubmit')(values);
      },
    };

    return (
      <FormContainer {...containerProps}>
        <Box>
          <FormControl>
            <MuiFormLabelElement id="demo-radio-buttons-group-label" name="radio-buttons-group">
              Gender
            </MuiFormLabelElement>
            <MuiRadioGroupElement name="radio-buttons-group">
              <FormControlLabel control={<Radio />} label="Female" value="female" />
              <FormControlLabel control={<Radio />} label="Male" value="male" />
              <FormControlLabel control={<Radio />} label="Other" value="other" />
            </MuiRadioGroupElement>
            <MuiFormHelperTextElement name="radio-buttons-group" />
          </FormControl>
        </Box>
        <MuiButtonElement sx={{ mt: 2 }} type="submit" variant="contained">
          Submit
        </MuiButtonElement>
      </FormContainer>
    );
  },
};
