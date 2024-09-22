import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';
import { Box, Stack } from '@mui/material';
import { MuiButtonElement, MuiSliderElement } from '@piplup/rhf-adapters/mui-material';
import { FormContainer, type FormContainerProps } from '@piplup/rhf-core';
import { type Meta, type StoryObj } from '@storybook/react';

/**
 * A wrapper around the `<Slider>` component pre-configured with `useMuiSliderAdapter`.
 *
 * ## <span className="docs-h2">Import</span>
 *
 * ```tsx
 * import { MuiSliderElement } from '@piplup/rhf-adapters/mui-material';
 * ```
 */
const meta: Meta<typeof MuiSliderElement> = {
  args: {},
  argTypes: {},
  component: MuiSliderElement,
  tags: ['autodocs'],
  title: 'rhf-adapters/mui-material/MuiSliderElement',
};

export default meta;

type Story = StoryObj<typeof MuiSliderElement>;

export const ContinuousSlider: Story = {
  render() {
    const containerProps: Partial<FormContainerProps> = {
      defaultValues: {
        'volume-slider': 20,
      },
      onSubmit(values) {
        alert(JSON.stringify(values));
      },
    };

    return (
      <FormContainer {...containerProps}>
        <Box sx={{ width: 200 }}>
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center', mb: 1 }}>
            <VolumeDown />
            <MuiSliderElement aria-label="Volume" name="volume-slider" />
            <VolumeUp />
          </Stack>
          <MuiSliderElement
            aria-label="Disabled slider"
            defaultValue={30}
            name="disabled-slider"
            disabled
          />
          <MuiButtonElement sx={{ mt: 2 }} type="submit" variant="contained">
            Submit
          </MuiButtonElement>
        </Box>
      </FormContainer>
    );
  },
};

export const RangeSlider: Story = {
  render() {
    const containerProps: Partial<FormContainerProps> = {
      defaultValues: {
        'temperature-range': [20, 37],
      },
      onSubmit(values) {
        alert(JSON.stringify(values));
      },
    };

    return (
      <FormContainer {...containerProps}>
        <Box sx={{ width: 300 }}>
          <MuiSliderElement
            getAriaLabel={() => 'Temperature Range'}
            getAriaValueText={(value) => `${value}°C`}
            name="temperature-range"
            valueLabelDisplay="auto"
          />
          <MuiButtonElement sx={{ mt: 2 }} type="submit" variant="contained">
            Submit
          </MuiButtonElement>
        </Box>
      </FormContainer>
    );
  },
};

export const MinimumDistanceRangeSlider: Story = {
  render() {
    const containerProps: Partial<FormContainerProps> = {
      defaultValues: {
        'minimum-distance': [20, 37],
        'minimum-distance-shift': [20, 37],
      },
      onSubmit(values) {
        alert(JSON.stringify(values));
      },
    };
    const minDistance = 10;

    return (
      <FormContainer {...containerProps}>
        <Box sx={{ width: 300 }}>
          <MuiSliderElement
            transform={{
              output(
                _event: Event,
                newValue: number[],
                activeThumb: number,
                previousValue: number[]
              ) {
                if (!Array.isArray(newValue)) {
                  return previousValue;
                }

                if (activeThumb === 0) {
                  return [Math.min(newValue[0], previousValue[1] - minDistance), previousValue[1]];
                }
                return [previousValue[0], Math.max(newValue[1], previousValue[0] + minDistance)];
              },
            }}
            getAriaLabel={() => 'Minimum distance'}
            getAriaValueText={(value) => `${value}°C`}
            name="minimum-distance"
            valueLabelDisplay="auto"
            disableSwap
          />
          <MuiSliderElement
            transform={{
              output(
                _event: Event,
                newValue: number[],
                activeThumb: number,
                previousValue: number[]
              ) {
                if (!Array.isArray(newValue)) {
                  return previousValue;
                }

                if (newValue[1] - newValue[0] < minDistance) {
                  if (activeThumb === 0) {
                    const clamped = Math.min(newValue[0], 100 - minDistance);
                    return [clamped, clamped + minDistance];
                  }
                  const clamped = Math.max(newValue[1], minDistance);
                  return [clamped - minDistance, clamped];
                }
                return newValue as number[];
              },
            }}
            getAriaLabel={() => 'Minimum distance shift'}
            getAriaValueText={(value) => `${value}°C`}
            name="minimum-distance-shift"
            valueLabelDisplay="auto"
            disableSwap
          />
        </Box>
      </FormContainer>
    );
  },
};
