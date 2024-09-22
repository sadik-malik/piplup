import { Box, FormControl, FormControlLabel, FormLabel, Radio } from '@mui/material';
import { MuiButtonElement, MuiRadioGroupElement } from '@piplup/rhf-adapters/mui-material';
import { FormContainer, type FormContainerProps } from '@piplup/rhf-core';
import { action } from '@storybook/addon-actions';
import { type Meta, type StoryObj } from '@storybook/react';

/**
 * A wrapper around the `<RadioGroup>` component pre-configured with `useMuiRadioGroupAdapter`.
 *
 * ## <span className="docs-h2">Import</span>
 *
 * ```tsx
 * import { MuiRadioGroupElement } from '@piplup/rhf-adapters/mui-material';
 * ```
 */
const meta: Meta<typeof MuiRadioGroupElement> = {
  args: {},
  argTypes: {},
  component: MuiRadioGroupElement,
  tags: ['autodocs'],
  title: 'rhf-adapters/mui-material/MuiRadioGroupElement',
};

export default meta;

type Story = StoryObj<typeof MuiRadioGroupElement>;

export const RadioGroup: Story = {
  render() {
    const containerProps: Partial<FormContainerProps> = {
      onSubmit(values) {
        action('onSubmit')(values);
      },
    };

    return (
      <FormContainer {...containerProps}>
        <Box>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
            <MuiRadioGroupElement name="radio-buttons-group">
              <FormControlLabel control={<Radio />} label="Female" value="female" />
              <FormControlLabel control={<Radio />} label="Male" value="male" />
              <FormControlLabel control={<Radio />} label="Other" value="other" />
            </MuiRadioGroupElement>
          </FormControl>
        </Box>
        <MuiButtonElement sx={{ mt: 2 }} type="submit" variant="contained">
          Submit
        </MuiButtonElement>
      </FormContainer>
    );
  },
};
