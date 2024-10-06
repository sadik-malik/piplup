import { Box, FormControl } from '@mui/material';
import {
  MuiButtonElement,
  MuiFilledInputElement,
  MuiFormHelperTextElement,
  MuiInputLabelElement,
} from '@piplup/rhf-adapters/mui-material';
import { FormContainer } from '@piplup/rhf-core';
import { action } from '@storybook/addon-actions';
import { type Meta, type StoryObj } from '@storybook/react';

/**
 * A wrapper around the `<FilledInput>` component pre-configured with `useMuiFilledInputAdapter`.
 *
 * ## <span className="docs-h2">Import</span>
 *
 * ```tsx
 * import { MuiFilledInputElement } from '@piplup/rhf-adapters/mui-material';
 * ```
 */
const meta: Meta<typeof MuiFilledInputElement> = {
  args: {},
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
  },
  component: MuiFilledInputElement,
  tags: ['autodocs'],
  title: 'rhf-adapters/mui-material/MuiFilledInputElement',
};

export default meta;

type Story = StoryObj<typeof MuiFilledInputElement>;

export const BasicFilledInput: Story = {
  render() {
    return (
      <FormContainer onError={action('onError')} onSubmit={action('onSubmit')}>
        <Box>
          <FormControl variant="filled">
            <MuiInputLabelElement name="basic-filled-input">
              Basic Filled Input
            </MuiInputLabelElement>
            <MuiFilledInputElement name="basic-filled-input" />
            <MuiFormHelperTextElement name="basic-filled-input" />
          </FormControl>
        </Box>
        <MuiButtonElement style={{ marginTop: 16 }} type="submit" variant="contained">
          Submit
        </MuiButtonElement>
      </FormContainer>
    );
  },
};
