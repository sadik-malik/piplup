import { Box, FormControl } from '@mui/material';
import {
  MuiButtonElement,
  MuiFormHelperTextElement,
  MuiInputLabelElement,
  MuiOutlinedInputElement,
} from '@piplup/rhf-adapters/mui-material';
import { FormContainer } from '@piplup/rhf-core';
import { action } from '@storybook/addon-actions';
import { type Meta, type StoryObj } from '@storybook/react';

/**
 * A wrapper around the `<OutlinedInput>` component pre-configured with `useMuiOutlinedInputAdapter`.
 *
 * ## <span className="docs-h2">Import</span>
 *
 * ```tsx
 * import { MuiOutlinedInputElement } from '@piplup/rhf-adapters/mui-material';
 * ```
 *
 * > Note: See the storybook actions panel for form submission results in individual story.
 */
const meta: Meta<typeof MuiOutlinedInputElement> = {
  args: {},
  argTypes: {},
  component: MuiOutlinedInputElement,
  tags: ['autodocs'],
  title: 'rhf-adapters/mui-material/MuiOutlinedInputElement',
};

export default meta;

type Story = StoryObj<typeof MuiOutlinedInputElement>;

export const BasicOutlinedInput: Story = {
  render() {
    return (
      <FormContainer onError={action('onError')} onSubmit={action('onSubmit')}>
        <Box>
          <FormControl variant="outlined">
            <MuiInputLabelElement name="basic-outlined-input">
              Basic Filled Input
            </MuiInputLabelElement>
            <MuiOutlinedInputElement label="Basic Filled Input" name="basic-outlined-input" />
            <MuiFormHelperTextElement name="basic-outlined-input" />
          </FormControl>
        </Box>
        <MuiButtonElement style={{ marginTop: 16 }} type="submit" variant="contained">
          Submit
        </MuiButtonElement>
      </FormContainer>
    );
  },
};
