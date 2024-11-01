import { TextField } from '@mui/material';
import { MuiButtonElement } from '@piplup/rhf-adapters/mui-material';
import { NumericFormatElement } from '@piplup/rhf-adapters/react-number-format';
import { FormContainer } from '@piplup/rhf-core';
import { action } from '@storybook/addon-actions';
import { type Meta, type StoryFn, type StoryObj } from '@storybook/react';

/**
 * A wrapper around the [\<NumericFormat /\>](https://s-yadav.github.io/react-number-format/docs/numeric_format/) component pre-configured with `useNumericFormatAdapter`.
 *
 * ## <span className="docs-h2">Import</span>
 *
 * ```tsx
 * import { NumericFormatElement } from '@piplup/rhf-adapters/react-number-format';
 * ```
 *
 * > Note: See the storybook actions panel for form submission results in individual story.
 */
const meta: Meta<typeof NumericFormatElement> = {
  args: {},
  argTypes: {},
  component: NumericFormatElement,
  tags: ['autodocs'],
  title: 'rhf-adapters/react-number-format/NumericFormatElement',
};

export default meta;

type Story = StoryObj<typeof NumericFormatElement>;

const Template: StoryFn<typeof NumericFormatElement> = (props) => {
  return (
    <FormContainer onError={action('onError')} onSubmit={action('onSubmit')}>
      <div>
        <NumericFormatElement {...props} />
      </div>
      <MuiButtonElement sx={{ mt: 2 }} type="submit" variant="contained">
        Submit
      </MuiButtonElement>
    </FormContainer>
  );
};

export const Default = Template.bind({});

Default.args = {
  name: 'default-numeric-format',
};

export const AllowLeadingZeroes = Template.bind({});

AllowLeadingZeroes.args = {
  allowLeadingZeros: true,
  defaultValue: '20020220',
  name: 'allow-leading-zeroes-numeric-format',
};

export const AllowDecimalSeparators = Template.bind({});

AllowDecimalSeparators.args = {
  allowedDecimalSeparators: ['%'],
  defaultValue: '12',
  name: 'allow-decimal-separators-numeric-format',
};

export const CustomInputs: Story = {
  render() {
    return (
      <FormContainer onError={action('onError')} onSubmit={action('onSubmit')}>
        <div>
          <NumericFormatElement
            customInput={(props) => {
              /*
               * Removed `color` and `size` prop of NumericFormatElement
               * since they are not compatible with TextField component.
               */
              const { color: _color, size: _size, ...rest } = props;
              return <TextField label="Custom  Input" {...rest} />;
            }}
            // MUI already has className from `disabled` and `error` state. We do not need to compose them.
            composeClassName={false}
            /**
             * The TextField component supports both the helperText and error props.
             * Instead of using a separate helper text component, we can enable composition
             * of helperText directly within this component, allowing it to manage both the error
             * and helperText props and pass them as needed.
             */
            composeHelperText={true}
            defaultValue={12323}
            name="custom-input-numeric-format"
            prefix="$"
            thousandSeparator
          />
        </div>
        <MuiButtonElement sx={{ mt: 2 }} type="submit" variant="contained">
          Submit
        </MuiButtonElement>
      </FormContainer>
    );
  },
};

export const DecimalScale = Template.bind({});

DecimalScale.args = {
  decimalScale: 3,
  defaultValue: 12323.3334,
  name: 'decimal-scale-numeric-format',
};

export const DecimalSeparator = Template.bind({});

DecimalSeparator.args = {
  decimalSeparator: ',',
  defaultValue: 12323.3333,
  name: 'decimal-separator-numeric-format',
};

export const FixedDecimalScale = Template.bind({});

FixedDecimalScale.args = {
  decimalScale: 3,
  defaultValue: 12323.1,
  fixedDecimalScale: true,
  name: 'fixed-decimal-scale-numeric-format',
};

export const Prefix = Template.bind({});

Prefix.args = {
  defaultValue: 1234,
  name: 'prefix-numeric-format',
  prefix: '$',
};

export const Suffix = Template.bind({});

Suffix.args = {
  defaultValue: 123,
  name: 'suffix-numeric-format',
  suffix: '/ -',
};

export const ThousandsGroupStyle = Template.bind({});

ThousandsGroupStyle.args = {
  defaultValue: 1231231,
  name: 'thousands-group-style-numeric-format',
  thousandSeparator: ',',
  thousandsGroupStyle: 'lakh',
};
