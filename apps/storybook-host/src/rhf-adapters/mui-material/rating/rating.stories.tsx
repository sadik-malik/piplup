import { Box, Typography } from '@mui/material';
import { MuiButtonElement, MuiRatingElement } from '@piplup/rhf-adapters/mui-material';
import { FormContainer, type FormContainerProps } from '@piplup/rhf-core';
import { action } from '@storybook/addon-actions';
import { type Meta, type StoryObj } from '@storybook/react';
import markdown from './rating.md?raw';

const meta: Meta<typeof MuiRatingElement> = {
  args: {},
  argTypes: {},
  component: MuiRatingElement,
  parameters: {
    docs: {
      description: {
        component: markdown,
      },
    },
  },
  tags: ['autodocs'],
  title: 'rhf-adapters/mui-material/MuiRatingElement',
};

export default meta;

type Story = StoryObj<typeof MuiRatingElement>;

export const BasicRating: Story = {
  render() {
    const containerProps: Partial<FormContainerProps> = {
      onSubmit(values) {
        action('onSubmit')(values);
      },
    };

    return (
      <FormContainer {...containerProps}>
        <Box sx={{ '& > legend': { mt: 2 } }}>
          <Typography component="legend">Controlled</Typography>
          <MuiRatingElement defaultValue={2} name="controlled" />
          <Typography component="legend" defaultValue={2}>
            Read only
          </Typography>
          <MuiRatingElement name="read-only" readOnly />
          <Typography component="legend" defaultValue={2}>
            Disabled
          </Typography>
          <MuiRatingElement name="disabled" disabled />
          <Typography component="legend">No rating given</Typography>
          <MuiRatingElement name="no-rating-given" />
        </Box>
        <MuiButtonElement sx={{ mt: 2 }} type="submit" variant="contained">
          Submit
        </MuiButtonElement>
      </FormContainer>
    );
  },
};
