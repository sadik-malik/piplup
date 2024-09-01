import { FormControl, InputLabel, MenuItem, OutlinedInput } from '@mui/material';
import { FormContainer, type FormContainerProps } from '@piplup/rhf-core';
import { type Meta, type StoryObj } from '@storybook/react';
import { MuiSelectElement } from './element';

const meta: Meta<typeof MuiSelectElement> = {
  component: MuiSelectElement,
  title: 'MUI-Material/MuiSelectElement',
  tags: ['autodocs'],
  args: {},
  parameters: {
    docs: {
      description: {
        component:
          'A wrapper around the mui `<Select>` pre-configured with `useMuiSelectAdapter`. Props of the Select component are also available and will be forwarded to the component, if provided.',
      },
    },
  },
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof MuiSelectElement>;

export const BasicSelect: Story = {
  render() {
    const containerProps: Partial<FormContainerProps> = {
      values: {},
      onSubmit(values) {
        alert(JSON.stringify(values));
      },
    };
    return (
      <FormContainer {...containerProps}>
        <FormControl fullWidth sx={{ maxWidth: 120 }}>
          <InputLabel id="basic-select-label">Age</InputLabel>
          <MuiSelectElement name="basic-select" label="Age" labelId="basic-select-label">
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
      values: {},
      onSubmit(values) {
        alert(JSON.stringify(values));
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
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="multiple-select-label">Name</InputLabel>
          <MuiSelectElement
            labelId="multiple-select-label"
            name="multiple-select"
            multiple
            input={<OutlinedInput label="Name" />}
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
