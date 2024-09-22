import { Stack } from '@mui/material';
import { MuiLoadingButtonElement } from '@piplup/rhf-adapters/mui-lab';
import { MuiTextFieldElement } from '@piplup/rhf-adapters/mui-material';
import { FormContainer } from '@piplup/rhf-core';
import { action } from '@storybook/addon-actions';
import { type Meta, type StoryObj } from '@storybook/react';

/**
 * A wrapper around the `<LoadingButton>` component pre-configured with `useMuiLoadingButtonAdapter`.
 *
 * ## <span className="docs-h2">Import</span>
 *
 * ```tsx
 * import { MuiLoadingButtonElement } from '@piplup/rhf-adapters/mui-lab';
 * ```
 */
const meta: Meta<typeof MuiLoadingButtonElement> = {
  args: {},
  argTypes: {},
  component: MuiLoadingButtonElement,
  tags: ['autodocs'],
  title: 'rhf-adapters/mui-lab/MuiLoadingButtonElement',
};

export default meta;

type Story = StoryObj<typeof MuiLoadingButtonElement>;

export const BasicLoadingButton: Story = {
  render() {
    return (
      <FormContainer
        defaultValues={{
          email: 'test@example.com',
          password: 'password',
        }}
        onSubmit={async (values) => {
          // Wait 2 seconds
          await new Promise((resolve) => setTimeout(resolve, 2000));
          action('onSubmit')(values);
        }}
        onError={action('onError')}
      >
        <Stack direction="column" maxWidth={250} spacing={2}>
          <MuiTextFieldElement name="email" placeholder="email" type="email" required />
          <MuiTextFieldElement name="password" placeholder="password" type="password" required />
        </Stack>
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <MuiLoadingButtonElement loading={false} type="reset" variant="outlined">
            Reset
          </MuiLoadingButtonElement>
          <MuiLoadingButtonElement type="submit" variant="contained">
            Submit
          </MuiLoadingButtonElement>
        </Stack>
      </FormContainer>
    );
  },
};
