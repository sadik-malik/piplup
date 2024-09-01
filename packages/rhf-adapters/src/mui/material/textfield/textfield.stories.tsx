import { Box, MenuItem, textFieldClasses } from '@mui/material';
import { FormContainer, type FormContainerProps } from '@piplup/rhf-core';
import { type Meta, type StoryObj } from '@storybook/react';
import { MuiTextFieldElement } from './element';

const meta: Meta<typeof MuiTextFieldElement> = {
  component: MuiTextFieldElement,
  title: 'MUI-Material/MuiTextFieldElement',
  tags: ['autodocs'],
  args: {},
  parameters: {
    docs: {
      description: {
        component:
          'A wrapper around the mui `<TextField>` pre-configured with `useMuiTextFieldAdapter`. Props of the TextField component are also available and will be forwarded to the component, if provided.',
      },
    },
  },
  argTypes: {
    type: {
      control: {
        type: 'select',
      },
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
      description: 'Specifies the type of input',
      defaultValue: 'text',
      table: {
        type: { summary: 'string' },
        defaultValue: {
          summary:
            'text | checkbox | color | date | datetime-local | email | file | image | month | number | password | radio | range | search | tel | time | url | week',
        },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof MuiTextFieldElement>;

export const BasicTextField: Story = {
  render(props) {
    const containerProps: Partial<FormContainerProps> = {
      values: {},
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
            name="outlined-basic"
            label="Outlined"
            variant="outlined"
          />
          <MuiTextFieldElement {...props} name="filled-basic" label="Filled" variant="filled" />
          <MuiTextFieldElement
            {...props}
            name="standard-basic"
            label="Standard"
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
      values: {},
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
              name="outlined-multiline-flexible"
              label="Multiline"
              multiline
              maxRows={4}
            />
            <MuiTextFieldElement
              name="outlined-textarea"
              label="Multiline Placeholder"
              placeholder="Placeholder"
              multiline
            />
            <MuiTextFieldElement
              name="outlined-multiline-static"
              label="Multiline"
              multiline
              rows={4}
              defaultValue="Default Value"
            />
          </div>
          <div>
            <MuiTextFieldElement
              name="filled-multiline-flexible"
              label="Multiline"
              multiline
              maxRows={4}
              variant="filled"
            />
            <MuiTextFieldElement
              name="filled-textarea"
              label="Multiline Placeholder"
              placeholder="Placeholder"
              multiline
              variant="filled"
            />
            <MuiTextFieldElement
              name="filled-multiline-static"
              label="Multiline"
              multiline
              rows={4}
              defaultValue="Default Value"
              variant="filled"
            />
          </div>
          <div>
            <MuiTextFieldElement
              name="standard-multiline-flexible"
              label="Multiline"
              multiline
              maxRows={4}
              variant="standard"
            />
            <MuiTextFieldElement
              name="standard-textarea"
              label="Multiline Placeholder"
              placeholder="Placeholder"
              multiline
              variant="standard"
            />
            <MuiTextFieldElement
              name="standard-multiline-static"
              label="Multiline"
              multiline
              rows={4}
              defaultValue="Default Value"
              variant="standard"
            />
          </div>
        </Box>
      </FormContainer>
    );
  },
};

const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];

export const Select: Story = {
  render() {
    const containerProps: Partial<FormContainerProps> = {
      values: {},
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
              name="outlined-select-currency"
              select
              label="Select"
              defaultValue="EUR"
              helperText="Please select your currency"
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </MuiTextFieldElement>
            <MuiTextFieldElement
              name="outlined-select-currency-native"
              select
              label="Native select"
              defaultValue="EUR"
              SelectProps={{
                native: true,
              }}
              helperText="Please select your currency"
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
              name="filled-select-currency"
              select
              label="Select"
              defaultValue="EUR"
              helperText="Please select your currency"
              variant="filled"
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </MuiTextFieldElement>
            <MuiTextFieldElement
              name="filled-select-currency-native"
              select
              label="Native select"
              defaultValue="EUR"
              SelectProps={{
                native: true,
              }}
              helperText="Please select your currency"
              variant="filled"
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
              name="standard-select-currency"
              select
              label="Select"
              defaultValue="EUR"
              helperText="Please select your currency"
              variant="standard"
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </MuiTextFieldElement>
            <MuiTextFieldElement
              name="standard-select-currency-native"
              select
              label="Native select"
              defaultValue="EUR"
              SelectProps={{
                native: true,
              }}
              helperText="Please select your currency"
              variant="standard"
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
