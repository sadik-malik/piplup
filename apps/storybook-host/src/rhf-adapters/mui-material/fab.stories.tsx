import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigationIcon from '@mui/icons-material/Navigation';
import RestoreIcon from '@mui/icons-material/Restore';
import SaveIcon from '@mui/icons-material/Save';
import { Stack } from '@mui/material';
import { MuiFabElement, MuiTextFieldElement } from '@piplup/rhf-adapters/mui-material';
import { FormContainer } from '@piplup/rhf-core';
import { action } from '@storybook/addon-actions';
import { type Meta, type StoryObj } from '@storybook/react';

const meta: Meta<typeof MuiFabElement> = {
  args: {},
  argTypes: {},
  component: MuiFabElement,
  parameters: {
    docs: {
      description: {
        component: `A wrapper around the \`<Fab>\` component pre-configured with \`useMuiFabAdapter\`.`,
      },
    },
  },
  tags: ['autodocs'],
  title: 'MUI-Material/MuiFabElement',
};

export default meta;

type Story = StoryObj<typeof MuiFabElement>;

export const BasicFab: Story = {
  render() {
    return (
      <FormContainer
        onSubmit={() => {
          action('onSubmit')({ message: 'Submitted' });
        }}
      >
        <Stack direction="row" spacing={2}>
          <MuiFabElement aria-label="add" color="primary" type="button">
            <AddIcon />
          </MuiFabElement>
          <MuiFabElement aria-label="edit" color="secondary" type="submit">
            <EditIcon />
          </MuiFabElement>
          <MuiFabElement type="reset" variant="extended">
            <NavigationIcon sx={{ mr: 1 }} />
            Navigate
          </MuiFabElement>
          <MuiFabElement aria-label="like" disabled>
            <FavoriteIcon />
          </MuiFabElement>
        </Stack>
      </FormContainer>
    );
  },
};

export const SubmitFab: Story = {
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
            <MuiFabElement type="submit">
              <SaveIcon />
            </MuiFabElement>
          </div>
        </Stack>
      </FormContainer>
    );
  },
};

export const ResetFab: Story = {
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
            <MuiFabElement type="reset">
              <RestoreIcon />
            </MuiFabElement>
          </div>
        </Stack>
      </FormContainer>
    );
  },
};
