import { Box, FormControl, InputLabel, MenuItem, OutlinedInput } from '@mui/material';
import { MuiButtonElement, MuiSelectElement } from '@piplup/rhf-adapters/mui-material';
import { FormContainer, type FormContainerProps } from '@piplup/rhf-core';
import { action } from '@storybook/addon-actions';
import { type Meta, type StoryObj } from '@storybook/react';

/**
 * A wrapper around the `<Select>` component pre-configured with `useMuiSelectAdapter`.
 *
 * ## <span className="docs-h2">Import</span>
 *
 * ```tsx
 * import { MuiSelectElement } from '@piplup/rhf-adapters/mui-material';
 * ```
 */
const meta: Meta<typeof MuiSelectElement> = {
  args: {},
  argTypes: {},
  component: MuiSelectElement,
  tags: ['autodocs'],
  title: 'rhf-adapters/mui-material/MuiSelectElement',
};

export default meta;

type Story = StoryObj<typeof MuiSelectElement>;

export const BasicSelect: Story = {
  render() {
    const containerProps: Partial<FormContainerProps> = {
      onSubmit(values) {
        action('onSubmit')(values);
      },
    };
    return (
      <FormContainer {...containerProps}>
        <Box>
          <FormControl sx={{ maxWidth: 120 }} fullWidth>
            <InputLabel id="age-label">Age</InputLabel>
            <MuiSelectElement label="Age" labelId="age-label" name="age">
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </MuiSelectElement>
          </FormControl>
        </Box>
        <MuiButtonElement sx={{ mt: 2 }} type="submit" variant="contained">
          Submit
        </MuiButtonElement>
      </FormContainer>
    );
  },
};

export const MultipleSelect: Story = {
  render() {
    const containerProps: Partial<FormContainerProps> = {
      onSubmit(values) {
        action('onSubmit')(values);
      },
    };

    const names = [
      'Oliver Hansen',
      'Van Henry',
      'April Tucker',
      'Ralph Hubbard',
      'Omar Alexander',
      'Carlos Abbott',
      'Miriam Wagner',
      'Bradley Wilkerson',
      'Virginia Andrews',
      'Kelly Snyder',
    ];

    return (
      <FormContainer {...containerProps}>
        <Box>
          <FormControl sx={{ width: 300 }}>
            <InputLabel id="multiple-select-label">Name</InputLabel>
            <MuiSelectElement
              input={<OutlinedInput label="Name" />}
              labelId="multiple-select-label"
              name="multiple-select"
              multiple
            >
              {names.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </MuiSelectElement>
          </FormControl>
        </Box>
        <MuiButtonElement sx={{ mt: 2 }} type="submit" variant="contained">
          Submit
        </MuiButtonElement>
      </FormContainer>
    );
  },
};
