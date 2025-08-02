import { FormControl, Stack } from '@mui/material';
import {
  MuiInputElement,
  MuiButtonElement,
  MuiFormHelperTextElement,
  MuiInputLabelElement,
} from '@piplup/rhf-adapters/mui-material';
import { FormContainer, type FormContainerProps } from '@piplup/rhf-core';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';

/**
 * A wrapper around the `<FormHelperText>` component pre-configured with `useMuiFormHelperTextAdapter`.
 *
 * ## <span class="docs-h2">Import</span>
 *
 * ```tsx
 * import { MuiFormHelperTextElement } from '@piplup/rhf-adapters/mui-material';
 * ```
 *
 * > Note: See the storybook actions panel for form submission results in individual story.
 */
const meta: Meta<typeof MuiFormHelperTextElement> = {
  args: {},
  argTypes: {},
  component: MuiFormHelperTextElement,
  tags: ['autodocs'],
  title: 'rhf-adapters/mui-material/MuiFormHelperTextElement',
};

export default meta;

type Story = StoryObj<typeof MuiFormHelperTextElement>;

export const BasicFormHelperText: Story = {
  render() {
    const containerProps: Partial<FormContainerProps> = {
      onSubmit(values) {
        action('onSubmit')(values);
      },
    };
    return (
      <FormContainer {...containerProps}>
        <Stack direction="column" spacing={2}>
          <FormControl variant="standard" required>
            <MuiInputLabelElement htmlFor="username" name="username">
              Username
            </MuiInputLabelElement>
            <MuiInputElement defaultValue="John Doe" id="username" name="username" />
            <MuiFormHelperTextElement name="username">Enter your username</MuiFormHelperTextElement>
          </FormControl>
          <FormControl variant="standard">
            <MuiInputLabelElement htmlFor="email" name="email">
              Email
            </MuiInputLabelElement>
            <MuiInputElement id="email" name="email" type="email" />
            <MuiFormHelperTextElement name="email">
              Enter your registered email address
            </MuiFormHelperTextElement>
          </FormControl>
        </Stack>
        <MuiButtonElement sx={{ mt: 2 }} type="submit" variant="contained">
          Submit
        </MuiButtonElement>
      </FormContainer>
    );
  },
};
