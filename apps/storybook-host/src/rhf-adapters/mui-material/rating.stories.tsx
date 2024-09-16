import { Box, Typography } from '@mui/material';
import { MuiRatingElement } from '@piplup/rhf-adapters/mui-material';
import { FormContainer, type FormContainerProps } from '@piplup/rhf-core';
import { type Meta, type StoryObj } from '@storybook/react';

const meta: Meta<typeof MuiRatingElement> = {
  args: {},
  argTypes: {},
  component: MuiRatingElement,
  parameters: {
    docs: {
      description: {
        component: `A wrapper around the \`<Rating>\` component pre-configured with \`useMuiRatingAdapter\`.`,
      },
    },
  },
  tags: ['autodocs'],
  title: 'MUI-Material/MuiRatingElement',
};

export default meta;

type Story = StoryObj<typeof MuiRatingElement>;

export const BasicRating: Story = {
  render() {
    const containerProps: Partial<FormContainerProps> = {
      onSubmit(values) {
        alert(JSON.stringify(values));
      },
      values: {
        disabled: 2,
        'no-value': null,
        'read-only': 2,
        'simple-controlled': 2,
      },
    };

    return (
      <FormContainer {...containerProps}>
        <Box sx={{ '& > legend': { mt: 2 } }}>
          <Typography component="legend">Controlled</Typography>
          <MuiRatingElement name="simple-controlled" />
          <Typography component="legend">Read only</Typography>
          <MuiRatingElement name="read-only" readOnly />
          <Typography component="legend">Disabled</Typography>
          <MuiRatingElement name="disabled" disabled />
          <Typography component="legend">No rating given</Typography>
          <MuiRatingElement name="no-value" />
        </Box>
      </FormContainer>
    );
  },
};
