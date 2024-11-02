import { MuiColorInputElement } from '@piplup/rhf-adapters/mui-color-input';
import { MuiButtonElement } from '@piplup/rhf-adapters/mui-material';
import { FormContainer } from '@piplup/rhf-core';
import { action } from '@storybook/addon-actions';
import { type Meta, type StoryFn, type StoryObj } from '@storybook/react';
import { matchIsValidColor } from 'mui-color-input';

/**
 * A wrapper around the [\<MuiColorInput /\>](https://viclafouch.github.io/mui-color-input/) component pre-configured with `useMuiColorInputAdapter`.
 *
 * ## <span className="docs-h2">Import</span>
 *
 * ```tsx
 * import { MuiColorInputElement } from '@piplup/rhf-adapters/mui-color-input';
 * ```
 *
 * > Note: See the storybook actions panel for form submission results in individual story.
 */
const meta: Meta<typeof MuiColorInputElement> = {
  args: {},
  argTypes: {
    format: {
      control: 'select',
      options: ['hex', 'hex8', 'rgb', 'hsv', 'hsl'],
    },
  },
  component: MuiColorInputElement,
  tags: ['autodocs'],
  title: 'rhf-adapters/mui-color-input/MuiColorInputElement',
};

export default meta;

type Story = StoryObj<typeof MuiColorInputElement>;

const Template: StoryFn<typeof MuiColorInputElement> = (props) => {
  return (
    <FormContainer onError={action('onError')} onSubmit={action('onSubmit')}>
      <div>
        <MuiColorInputElement {...props} />
      </div>
      <MuiButtonElement sx={{ mt: 2 }} type="submit" variant="contained">
        Submit
      </MuiButtonElement>
    </FormContainer>
  );
};

export const Default = Template.bind({});
Default.args = {
  defaultValue: 'rgba(234, 18, 18, 0.87)',
  label: 'Default',
  name: 'default-mui-color-input',
};

export const ColorValidation: Story = {
  render() {
    const validate = (value: string) => {
      return matchIsValidColor(value) || 'Color is invalid';
    };

    return (
      <FormContainer onError={action('onError')} onSubmit={action('onSubmit')}>
        <div>
          <MuiColorInputElement
            defaultValue="#ffffff"
            name="color-validation-mui-color-input"
            rules={{ validate }}
          />
        </div>
        <MuiButtonElement sx={{ mt: 2 }} type="submit" variant="contained">
          Submit
        </MuiButtonElement>
      </FormContainer>
    );
  },
};

export const ColorFormat = Template.bind({});
ColorFormat.args = {
  defaultValue: '#aaaaff',
  format: 'hex',
  name: 'color-format-mui-color-input',
};

/**
 * Enter an invalid `fallbackValue` and remove the focus from TextField by clicking outside of TextField to see the component fallback to your provided `fallbackValue`.
 */
export const FallbackValue = Template.bind({});
FallbackValue.args = {
  fallbackValue: '#ffffff',
  format: 'hex',
  name: 'fallback-value-mui-color-input',
};

export const IsAlphaHidden = Template.bind({});
IsAlphaHidden.args = {
  defaultValue: '#aaaaff',
  format: 'hex',
  isAlphaHidden: true,
  name: 'is-alpha-hidden-mui-color-input',
};
