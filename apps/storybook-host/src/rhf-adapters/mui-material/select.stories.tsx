import { FormControl, InputLabel, MenuItem, OutlinedInput } from '@mui/material';
import { MuiSelectElement } from '@piplup/rhf-adapters/mui-material';
import { FormContainer, type FormContainerProps } from '@piplup/rhf-core';
import { type Meta, type StoryObj } from '@storybook/react';

const meta: Meta<typeof MuiSelectElement> = {
  args: {},
  argTypes: {},
  component: MuiSelectElement,
  parameters: {
    docs: {
      description: {
        component: 'A wrapper around the mui `<Select>` pre-configured with `useMuiSelectAdapter`.',
      },
    },
  },
  tags: ['autodocs'],
  title: 'MUI-Material/MuiSelectElement',
};

export default meta;

type Story = StoryObj<typeof MuiSelectElement>;

export const BasicSelect: Story = {
  render() {
    const containerProps: Partial<FormContainerProps> = {
      onSubmit(values) {
        alert(JSON.stringify(values));
      },
      values: {},
    };
    return (
      <FormContainer {...containerProps}>
        <FormControl sx={{ maxWidth: 120 }} fullWidth>
          <InputLabel id="basic-select-label">Age</InputLabel>
          <MuiSelectElement label="Age" labelId="basic-select-label" name="basic-select">
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </MuiSelectElement>
        </FormControl>
      </FormContainer>
    );
  },
};

export const MultipleSelect: Story = {
  render() {
    const containerProps: Partial<FormContainerProps> = {
      onSubmit(values) {
        alert(JSON.stringify(values));
      },
      values: {},
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
        <FormControl sx={{ m: 1, width: 300 }}>
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
      </FormContainer>
    );
  },
};
