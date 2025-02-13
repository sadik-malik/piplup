import { Box, MenuItem, textFieldClasses } from '@mui/material';
import { MuiButtonElement, MuiTextFieldElement } from '@piplup/rhf-adapters/mui-material';
import { FormContainer } from '@piplup/rhf-core';
import { action } from '@storybook/addon-actions';
import { type Meta, type StoryObj } from '@storybook/react';

/**
 * A wrapper around the `<TextField>` component pre-configured with `useMuiTextFieldAdapter`.
 *
 * ## <span className="docs-h2">Import</span>
 *
 * ```tsx
 * import { MuiTextFieldElement } from '@piplup/rhf-adapters/mui-material';
 * ```
 *
 * > Note: See the storybook actions panel for form submission results in individual story.
 */
const meta: Meta<typeof MuiTextFieldElement> = {
  args: {
    required: false,
  },
  argTypes: {
    required: {
      control: 'boolean',
      description: 'If true, the label is displayed as required and the input element is required.',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
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
  tags: ['autodocs'],
  title: 'rhf-adapters/mui-material/MuiTextFieldElement',
};

export default meta;

type Story = StoryObj<typeof MuiTextFieldElement>;

export const BasicTextField: Story = {
  render(props) {
    return (
      <FormContainer onError={action('onError')} onSubmit={action('onSubmit')}>
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
        <MuiButtonElement sx={{ mt: 2 }} type="submit" variant="contained">
          Submit
        </MuiButtonElement>
      </FormContainer>
    );
  },
};

export const Multiline: Story = {
  render() {
    return (
      <FormContainer onError={action('onError')} onSubmit={action('onSubmit')}>
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
    return (
      <FormContainer onError={action('onError')} onSubmit={action('onSubmit')}>
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
              slotProps={{
                select: {
                  native: true,
                },
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
              slotProps={{
                select: {
                  native: true,
                },
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
              slotProps={{
                select: {
                  native: true,
                },
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
