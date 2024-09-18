import { Box, MenuItem, textFieldClasses } from '@mui/material';
import { MuiTextFieldElement } from '@piplup/rhf-adapters/mui-material';
import { FormContainer, type FormContainerProps } from '@piplup/rhf-core';
import { type Meta, type StoryObj } from '@storybook/react';
import markdown from './textfield.md?raw';

const meta: Meta<typeof MuiTextFieldElement> = {
  args: {},
  argTypes: {
    type: {
      control: {
        type: 'select',
      },
      defaultValue: 'text',
      description: 'Specifies the type of input',
      options: [
        'text',
        'checkbox',
        'color',
        'date',
        'datetime-local',
        'email',
        'file',
        'image',
        'month',
        'number',
        'password',
        'radio',
        'range',
        'search',
        'tel',
        'time',
        'url',
        'week',
      ],
      table: {
        defaultValue: {
          summary:
            'text | checkbox | color | date | datetime-local | email | file | image | month | number | password | radio | range | search | tel | time | url | week',
        },
        type: { summary: 'string' },
      },
    },
  },
  component: MuiTextFieldElement,
  parameters: {
    docs: {
      description: {
        component: markdown,
      },
    },
  },
  tags: ['autodocs'],
  title: 'rhf-adapters/mui-material/MuiTextFieldElement',
};

export default meta;

type Story = StoryObj<typeof MuiTextFieldElement>;

export const BasicTextField: Story = {
  render(props) {
    const containerProps: Partial<FormContainerProps> = {
      onSubmit(values) {
        alert(JSON.stringify(values));
      },
    };
    return (
      <FormContainer {...containerProps}>
        <Box
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
        >
          <MuiTextFieldElement
            {...props}
            label="Outlined"
            name="outlined-basic"
            variant="outlined"
          />
          <MuiTextFieldElement {...props} label="Filled" name="filled-basic" variant="filled" />
          <MuiTextFieldElement
            {...props}
            label="Standard"
            name="standard-basic"
            variant="standard"
          />
        </Box>
      </FormContainer>
    );
  },
};

export const Multiline: Story = {
  render() {
    const containerProps: Partial<FormContainerProps> = {
      onSubmit(values) {
        alert(JSON.stringify(values));
      },
    };
    return (
      <FormContainer {...containerProps}>
        <Box
          sx={{
            [`& .${textFieldClasses.root}`]: { m: 1, width: '25ch' },
          }}
        >
          <div>
            <MuiTextFieldElement
              label="Multiline"
              maxRows={4}
              name="outlined-multiline-flexible"
              multiline
            />
            <MuiTextFieldElement
              label="Multiline Placeholder"
              name="outlined-textarea"
              placeholder="Placeholder"
              multiline
            />
            <MuiTextFieldElement
              defaultValue="Default Value"
              label="Multiline"
              name="outlined-multiline-static"
              rows={4}
              multiline
            />
          </div>
          <div>
            <MuiTextFieldElement
              label="Multiline"
              maxRows={4}
              name="filled-multiline-flexible"
              variant="filled"
              multiline
            />
            <MuiTextFieldElement
              label="Multiline Placeholder"
              name="filled-textarea"
              placeholder="Placeholder"
              variant="filled"
              multiline
            />
            <MuiTextFieldElement
              defaultValue="Default Value"
              label="Multiline"
              name="filled-multiline-static"
              rows={4}
              variant="filled"
              multiline
            />
          </div>
          <div>
            <MuiTextFieldElement
              label="Multiline"
              maxRows={4}
              name="standard-multiline-flexible"
              variant="standard"
              multiline
            />
            <MuiTextFieldElement
              label="Multiline Placeholder"
              name="standard-textarea"
              placeholder="Placeholder"
              variant="standard"
              multiline
            />
            <MuiTextFieldElement
              defaultValue="Default Value"
              label="Multiline"
              name="standard-multiline-static"
              rows={4}
              variant="standard"
              multiline
            />
          </div>
        </Box>
      </FormContainer>
    );
  },
};

const currencies = [
  {
    label: '$',
    value: 'USD',
  },
  {
    label: '€',
    value: 'EUR',
  },
  {
    label: '฿',
    value: 'BTC',
  },
  {
    label: '¥',
    value: 'JPY',
  },
];

export const Select: Story = {
  render() {
    const containerProps: Partial<FormContainerProps> = {
      onSubmit(values) {
        alert(JSON.stringify(values));
      },
    };
    return (
      <FormContainer {...containerProps}>
        <Box
          sx={{
            [`& .${textFieldClasses.root}`]: { m: 1, width: '25ch' },
          }}
        >
          <div>
            <MuiTextFieldElement
              defaultValue="EUR"
              helperText="Please select your currency"
              label="Select"
              name="outlined-select-currency"
              select
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </MuiTextFieldElement>
            <MuiTextFieldElement
              SelectProps={{
                native: true,
              }}
              defaultValue="EUR"
              helperText="Please select your currency"
              label="Native select"
              name="outlined-select-currency-native"
              select
            >
              {currencies.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </MuiTextFieldElement>
          </div>
          <div>
            <MuiTextFieldElement
              defaultValue="EUR"
              helperText="Please select your currency"
              label="Select"
              name="filled-select-currency"
              variant="filled"
              select
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </MuiTextFieldElement>
            <MuiTextFieldElement
              SelectProps={{
                native: true,
              }}
              defaultValue="EUR"
              helperText="Please select your currency"
              label="Native select"
              name="filled-select-currency-native"
              variant="filled"
              select
            >
              {currencies.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </MuiTextFieldElement>
          </div>
          <div>
            <MuiTextFieldElement
              defaultValue="EUR"
              helperText="Please select your currency"
              label="Select"
              name="standard-select-currency"
              variant="standard"
              select
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </MuiTextFieldElement>
            <MuiTextFieldElement
              SelectProps={{
                native: true,
              }}
              defaultValue="EUR"
              helperText="Please select your currency"
              label="Native select"
              name="standard-select-currency-native"
              variant="standard"
              select
            >
              {currencies.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </MuiTextFieldElement>
          </div>
        </Box>
      </FormContainer>
    );
  },
};
