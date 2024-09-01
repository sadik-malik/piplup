import { Box, FormControl, FormControlLabel, FormGroup, FormLabel } from '@mui/material';
import { FormContainer, type FormContainerProps } from '@piplup/rhf-core';
import { type Meta, type StoryObj } from '@storybook/react';
import { MuiCheckboxElement } from './element';

const meta: Meta<typeof MuiCheckboxElement> = {
  args: {},
  argTypes: {},
  component: MuiCheckboxElement,
  parameters: {
    docs: {
      description: {
        component: `A wrapper around the \`<Checkbox>\` component pre-configured with \`useMuiCheckboxAdapter\`. Props of the Checkbox component are also available and will be forwarded to the component, if provided. 
          
> **Note**: \`defaultChecked\` prop is not forwarded to the Checkbox component, as we are using a controlled checkbox, which will be managed by react-hook-form. Additionally, the \`checked\` and \`indeterminate\` prop passed to adapter is treated as a function to compute the checked and indeterminate state of the checkbox, respectively, using the values stored in react-hook-form.`,
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
        alert(JSON.stringify(values));
      },
      values: {
        checkbox: ['checked', 'disabled-checked'],
      },
    };

    return (
      <FormContainer {...containerProps}>
        <div>
          <MuiCheckboxElement
            inputProps={{ 'aria-label': 'checkbox' }}
            name="checkbox"
            value="default"
          />
          <MuiCheckboxElement
            inputProps={{ 'aria-label': 'checkbox checked' }}
            name="checkbox"
            value="checked"
          />
          <MuiCheckboxElement
            inputProps={{ 'aria-label': 'checkbox disabled' }}
            name="checkbox"
            value="disabled"
            disabled
          />
          <MuiCheckboxElement
            inputProps={{ 'aria-label': 'Checkbox disabled and checked' }}
            name="checkbox"
            value="disabled-checked"
            disabled
          />
        </div>
      </FormContainer>
    );
  },
};

export const Indeterminate: Story = {
  render() {
    const checkboxes = ['1', '2'];
    const containerProps: Partial<FormContainerProps> = {
      onSubmit(values) {
        alert(JSON.stringify(values));
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
      </FormContainer>
    );
  },
};

export const CheckboxGroup: Story = {
  name: 'Form Group',
  render() {
    const containerProps: Partial<FormContainerProps> = {
      onSubmit(values) {
        alert(JSON.stringify(values));
      },
      values: {
        checkbox: [],
      },
    };
    return (
      <FormContainer {...containerProps}>
        <Box sx={{ display: 'flex' }}>
          <FormControl
            component="fieldset"
            // TODO: replace this with FormControlElement
            sx={{ m: 3 }}
            variant="standard"
          >
            <FormLabel component="legend">Assign responsibility</FormLabel>
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
            {/** TODO: add FormHelperTextElement here */}
            {/* <FormHelperText>Be careful</FormHelperText> */}
          </FormControl>
        </Box>
      </FormContainer>
    );
  },
};
