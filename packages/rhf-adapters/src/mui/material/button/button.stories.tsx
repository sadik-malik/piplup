import { ButtonGroup, Stack } from '@mui/material';
import { FormContainer } from '@piplup/rhf-core';
import { type Meta, type StoryObj } from '@storybook/react';
import { MuiButtonElement } from './element';
import { MuiTextFieldElement } from '../textfield';

const meta: Meta<typeof MuiButtonElement> = {
  component: MuiButtonElement,
  title: 'MUI-Material/MuiButtonElement',
  tags: ['autodocs'],
  args: {},
  parameters: {
    docs: {
      description: {
        component: `A wrapper around the \`<Button>\` component pre-configured with \`useMuiButtonAdapter\`. Props of the Button component are also available and will be forwarded to the component, if provided.`,
      },
    },
  },
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof MuiButtonElement>;

export const BasicButton: Story = {
  args: {
    type: 'button',
  },
  render(props) {
    return (
      <FormContainer
        onSubmit={() => {
          alert('Submitted');
        }}
      >
        <Stack spacing={2} direction="row">
          <MuiButtonElement variant="text">Text</MuiButtonElement>
          <MuiButtonElement variant="contained">Contained</MuiButtonElement>
          <MuiButtonElement variant="outlined">Outlined</MuiButtonElement>
        </Stack>
      </FormContainer>
    );
  },
};

export const SubmitButton: Story = {
  args: {
    type: 'submit',
  },
  render(props) {
    return (
      <FormContainer
        onSubmit={() => {
          alert('Submitted');
        }}
      >
        <Stack spacing={2} direction="row">
          <MuiButtonElement {...props}>Submit</MuiButtonElement>
          <MuiButtonElement {...props} variant="contained">
            Submit
          </MuiButtonElement>
          <MuiButtonElement {...props} variant="outlined">
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
        onSubmit={(values) => {
          alert(JSON.stringify(values));
        }}
        defaultValues={{
          email: 'test@example.com',
          password: 'password',
        }}
      >
        <Stack direction="column" spacing={2} maxWidth={250}>
          <MuiTextFieldElement name="email" type="email" required placeholder="email" />
          <MuiTextFieldElement name="password" type="password" required placeholder="password" />
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
        onSubmit={(values) => {
          alert(JSON.stringify(values));
        }}
        defaultValues={{
          email: 'test@example.com',
          password: 'password',
        }}
      >
        <Stack direction="column" spacing={2} maxWidth={250}>
          <MuiTextFieldElement name="email" type="email" required placeholder="email" />
          <MuiTextFieldElement name="password" type="password" required placeholder="password" />
          <ButtonGroup aria-label="Button group" fullWidth>
            <MuiButtonElement type="reset">Reset</MuiButtonElement>
            <MuiButtonElement variant="contained">Submit</MuiButtonElement>
          </ButtonGroup>
        </Stack>
      </FormContainer>
    );
  },
};
