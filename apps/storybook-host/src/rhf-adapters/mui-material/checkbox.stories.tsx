import { Box, FormControl, FormControlLabel, FormGroup } from '@mui/material';
import {
  MuiCheckboxElement,
  MuiButtonElement,
  MuiFormHelperTextElement,
  MuiFormLabelElement,
} from '@piplup/rhf-adapters/mui-material';
import { FormContainer, type FormContainerProps } from '@piplup/rhf-core';
import { action } from '@storybook/addon-actions';
import { type Meta, type StoryObj } from '@storybook/react';

const meta: Meta<typeof MuiCheckboxElement> = {
  args: {},
  argTypes: {},
  component: MuiCheckboxElement,
  parameters: {
    docs: {
      description: {
        component: `A wrapper around the \`<Checkbox>\` component pre-configured with \`useMuiCheckboxAdapter\`.`,
      },
    },
  },
  tags: ['autodocs'],
  title: 'MUI-Material/MuiCheckboxElement',
};

export default meta;

type Story = StoryObj<typeof MuiCheckboxElement>;

export const BasicCheckboxes: Story = {
  render() {
    const containerProps: Partial<FormContainerProps> = {
      onSubmit(values) {
        action('onSubmit')(values);
      },
      values: {
        checkboxes: ['checked'],
        'checkboxes-disabled': ['disabled-checked'],
      },
    };

    return (
      <FormContainer {...containerProps}>
        <div>
          <MuiCheckboxElement
            inputProps={{ 'aria-label': 'checkbox' }}
            name="checkboxes"
            value="default"
          />
          <MuiCheckboxElement
            inputProps={{ 'aria-label': 'checkbox checked' }}
            name="checkboxes"
            value="checked"
          />
          <MuiCheckboxElement
            inputProps={{ 'aria-label': 'checkbox disabled' }}
            name="checkboxes-disabled"
            value="disabled"
            disabled
          />
          <MuiCheckboxElement
            inputProps={{ 'aria-label': 'Checkbox disabled and checked' }}
            name="checkboxes-disabled"
            value="disabled-checked"
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

export const Indeterminate: Story = {
  render() {
    const checkboxes = ['1', '2'];
    const containerProps: Partial<FormContainerProps> = {
      onSubmit(values) {
        action('onSubmit')(values);
      },
      values: {
        checkbox: ['1'],
      },
    };

    return (
      <FormContainer {...containerProps}>
        <FormControlLabel
          control={
            <MuiCheckboxElement
              checked={(newValues) => {
                if (Array.isArray(newValues) && newValues.length === checkboxes.length) {
                  return true;
                }
                return false;
              }}
              indeterminate={(newValues) => {
                if (
                  Array.isArray(newValues) &&
                  newValues.length !== 0 &&
                  newValues.length !== checkboxes.length
                ) {
                  return true;
                }
                return false;
              }}
              transform={{
                output(_event: React.ChangeEvent<HTMLInputElement>, checked: boolean) {
                  if (checked) {
                    return checkboxes;
                  }
                  return [];
                },
              }}
              name="checkbox"
              value={checkboxes}
            />
          }
          label="Parent"
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
          <FormControlLabel
            control={<MuiCheckboxElement name="checkbox" value={checkboxes[0]} />}
            label="Child 1"
          />
          <FormControlLabel
            control={<MuiCheckboxElement name="checkbox" value={checkboxes[1]} />}
            label="Child 2"
          />
        </Box>
        <MuiButtonElement sx={{ mt: 2 }} type="submit" variant="contained">
          Submit
        </MuiButtonElement>
      </FormContainer>
    );
  },
};

export const CheckboxGroup: Story = {
  name: 'Form Group',
  render() {
    const containerProps: Partial<FormContainerProps> = {
      onSubmit(values) {
        action('onSubmit')(values);
      },
    };
    return (
      <FormContainer {...containerProps}>
        <Box sx={{ display: 'flex' }}>
          <FormControl
            component="fieldset"
            name="assign_responsibility"
            variant="standard"
            required
          >
            <MuiFormLabelElement component="legend" name="assign_responsibility">
              Assign responsibility
            </MuiFormLabelElement>
            <FormGroup>
              <FormControlLabel
                control={<MuiCheckboxElement name="assign_responsibility" value="gilad" />}
                label="Gilad Gray"
              />
              <FormControlLabel
                control={<MuiCheckboxElement name="assign_responsibility" value="jason" />}
                label="Jason Killian"
              />
              <FormControlLabel
                control={<MuiCheckboxElement name="assign_responsibility" value="antoine" />}
                label="Antoine Llorca"
              />
            </FormGroup>
            <MuiFormHelperTextElement name="assign_responsibility">
              Be careful
            </MuiFormHelperTextElement>
          </FormControl>
        </Box>
        <MuiButtonElement sx={{ mt: 2 }} type="submit" variant="contained">
          Submit
        </MuiButtonElement>
      </FormContainer>
    );
  },
};
