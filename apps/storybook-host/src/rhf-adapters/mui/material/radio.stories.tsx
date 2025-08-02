import { Box, FormControlLabel } from '@mui/material';
import { MuiButtonElement, MuiRadioElement } from '@piplup/rhf-adapters/mui-material';
import { FormContainer, type FormContainerProps } from '@piplup/rhf-core';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';

/**
 * A wrapper around the `<Radio>` component pre-configured with `useMuiRadioAdapter`.
 *
 * ## <span className="docs-h2">Import</span>
 *
 * ```tsx
 * import { MuiRadioElement } from '@piplup/rhf-adapters/mui-material';
 * ```
 *
 * > Note: See the storybook actions panel for form submission results in individual story.
 */
const meta: Meta<typeof MuiRadioElement> = {
  args: {},
  argTypes: {},
  component: MuiRadioElement,
  tags: ['autodocs'],
  title: 'rhf-adapters/mui-material/MuiRadioElement',
};

export default meta;

type Story = StoryObj<typeof MuiRadioElement>;

export const StandaloneRadioButtons: Story = {
  render() {
    const containerProps: Partial<FormContainerProps> = {
      onSubmit(values) {
        action('onSubmit')(values);
      },
    };

    return (
      <FormContainer {...containerProps}>
        <Box>
          <FormControlLabel
            control={
              <MuiRadioElement inputProps={{ 'aria-label': 'A' }} name="radio-buttons" value="a" />
            }
            label="A"
          />
          <FormControlLabel
            control={
              <MuiRadioElement inputProps={{ 'aria-label': 'B' }} name="radio-buttons" value="b" />
            }
            label="B"
          />
        </Box>
        <MuiButtonElement sx={{ mt: 2 }} type="submit" variant="contained">
          Submit
        </MuiButtonElement>
      </FormContainer>
    );
  },
};
