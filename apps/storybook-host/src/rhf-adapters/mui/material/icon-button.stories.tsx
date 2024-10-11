import RestoreIcon from '@mui/icons-material/Restore';
import SaveIcon from '@mui/icons-material/Save';
import { Stack, Tooltip } from '@mui/material';
import { MuiIconButtonElement, MuiTextFieldElement } from '@piplup/rhf-adapters/mui-material';
import { FormContainer } from '@piplup/rhf-core';
import { action } from '@storybook/addon-actions';
import { type Meta, type StoryObj } from '@storybook/react';

/**
 * A wrapper around the `<IconButton>` component pre-configured with `useMuiIconButtonAdapter`.
 *
 * ## <span className="docs-h2">Import</span>
 *
 * ```tsx
 * import { MuiIconButtonElement } from '@piplup/rhf-adapters/mui-material';
 * ```
 *
 * > Note: See the storybook actions panel for form submission results in individual story.
 */
const meta: Meta<typeof MuiIconButtonElement> = {
  args: {},
  argTypes: {},
  component: MuiIconButtonElement,
  tags: ['autodocs'],
  title: 'rhf-adapters/mui-material/MuiIconButtonElement',
};

export default meta;

type Story = StoryObj<typeof MuiIconButtonElement>;

export const BasicIconButton: Story = {
  render() {
    return (
      <FormContainer
        onSubmit={() => {
          action('onSubmit')({ message: 'Submitted' });
        }}
      >
        <Stack direction="row" spacing={2}>
          <MuiIconButtonElement type="button">
            <SaveIcon />
          </MuiIconButtonElement>
        </Stack>
      </FormContainer>
    );
  },
};

export const SubmitIconButton: Story = {
  render() {
    return (
      <FormContainer
        defaultValues={{
          email: 'test@example.com',
          password: 'password',
        }}
        onSubmit={(values) => {
          action('onSubmit')(values);
        }}
      >
        <Stack direction="column" maxWidth={250} spacing={2}>
          <MuiTextFieldElement name="email" placeholder="email" type="email" required />
          <MuiTextFieldElement name="password" placeholder="password" type="password" required />
          <div>
            <Tooltip title="Submit">
              <MuiIconButtonElement type="submit">
                <SaveIcon />
              </MuiIconButtonElement>
            </Tooltip>
          </div>
        </Stack>
      </FormContainer>
    );
  },
};

export const ResetIconButton: Story = {
  render() {
    return (
      <FormContainer
        defaultValues={{
          email: 'test@example.com',
          password: 'password',
        }}
        onSubmit={(values) => {
          action('onSubmit')(values);
        }}
      >
        <Stack direction="column" maxWidth={250} spacing={2}>
          <MuiTextFieldElement name="email" placeholder="email" type="email" required />
          <MuiTextFieldElement name="password" placeholder="password" type="password" required />
          <div>
            <Tooltip title="Reset">
              <MuiIconButtonElement type="reset">
                <RestoreIcon />
              </MuiIconButtonElement>
            </Tooltip>
          </div>
        </Stack>
      </FormContainer>
    );
  },
};
