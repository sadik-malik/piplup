import { FormControl, InputLabel, Stack } from '@mui/material';
import {
  MuiInputElement,
  MuiButtonElement,
  MuiFormHelperTextElement,
} from '@piplup/rhf-adapters/mui-material';
import { FormContainer, type FormContainerProps } from '@piplup/rhf-core';
import { action } from '@storybook/addon-actions';
import { type Meta, type StoryObj } from '@storybook/react';

const meta: Meta<typeof MuiFormHelperTextElement> = {
  args: {},
  argTypes: {},
  component: MuiFormHelperTextElement,
  parameters: {
    docs: {
      description: {
        component: `A wrapper around the \`<FormHelperText>\` component pre-configured with \`useMuiFormHelperTextAdapter\`.`,
      },
    },
  },
  tags: ['autodocs'],
  title: 'MUI-Material/MuiFormHelperTextElement',
};

export default meta;

type Story = StoryObj<typeof MuiFormHelperTextElement>;

export const BasicFormHelperText: Story = {
  render() {
    const containerProps: Partial<FormContainerProps> = {
      onSubmit(values) {
        action('onSubmit')(values);
      },
      values: {
        checkbox: [],
      },
    };
    return (
      <FormContainer {...containerProps}>
        <Stack direction="column" spacing={2}>
          <FormControl variant="standard" disabled>
            <InputLabel htmlFor="username">Username</InputLabel>
            <MuiInputElement defaultValue="John Doe" id="username" name="username" />
            <MuiFormHelperTextElement name="username">Enter your username</MuiFormHelperTextElement>
          </FormControl>
          <FormControl variant="standard" disabled>
            <InputLabel htmlFor="email">Email</InputLabel>
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
