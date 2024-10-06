import { ButtonGroup, Stack } from '@mui/material';
import { MuiTextFieldElement, MuiButtonElement } from '@piplup/rhf-adapters/mui-material';
import { FormContainer } from '@piplup/rhf-core';
import { action } from '@storybook/addon-actions';
import { type Meta, type StoryObj } from '@storybook/react';

/**
 * A wrapper around the `<Button>` component pre-configured with `useMuiButtonAdapter`.
 *
 * ## <span className="docs-h2">Import</span>
 *
 * ```tsx
 * import { MuiButtonElement } from '@piplup/rhf-adapters/mui-material';
 * ```
 */
const meta: Meta<typeof MuiButtonElement> = {
  args: {},
  argTypes: {},
  component: MuiButtonElement,
  tags: ['autodocs'],
  title: 'rhf-adapters/mui-material/MuiButtonElement',
};

export default meta;

type Story = StoryObj<typeof MuiButtonElement>;

export const BasicButton: Story = {
  render() {
    return (
      <FormContainer
        onSubmit={() => {
          action('onSubmit')({ message: 'Submitted' });
        }}
      >
        <Stack direction="row" spacing={2}>
          <MuiButtonElement variant="text">Text</MuiButtonElement>
          <MuiButtonElement variant="contained">Contained</MuiButtonElement>
          <MuiButtonElement variant="outlined">Outlined</MuiButtonElement>
        </Stack>
      </FormContainer>
    );
  },
};

export const SubmitButton: Story = {
  render() {
    return (
      <FormContainer
        onSubmit={() => {
          action('onSubmit')({ message: 'Submitted' });
        }}
      >
        <Stack direction="row" spacing={2}>
          <MuiButtonElement type="submit">Submit</MuiButtonElement>
          <MuiButtonElement type="submit" variant="contained">
            Submit
          </MuiButtonElement>
          <MuiButtonElement type="submit" variant="outlined">
            Submit
          </MuiButtonElement>
        </Stack>
      </FormContainer>
    );
  },
};

export const ResetButton: Story = {
  args: {
    type: 'reset',
  },
  render(props) {
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
          <Stack direction="row" spacing={2}>
            <MuiButtonElement {...props}>Reset</MuiButtonElement>
            <MuiButtonElement {...props} variant="contained">
              Reset
            </MuiButtonElement>
            <MuiButtonElement {...props} variant="outlined">
              Reset
            </MuiButtonElement>
          </Stack>
        </Stack>
      </FormContainer>
    );
  },
};

export const ButtonGroupStory: Story = {
  name: 'Button Group',
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
          <ButtonGroup aria-label="Button group" fullWidth>
            <MuiButtonElement type="reset">Reset</MuiButtonElement>
            <MuiButtonElement type="submit" variant="contained">
              Submit
            </MuiButtonElement>
          </ButtonGroup>
        </Stack>
      </FormContainer>
    );
  },
};
