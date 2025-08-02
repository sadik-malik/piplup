import { MuiButtonElement } from '@piplup/rhf-adapters/mui-material';
import { MuiTelInputElement } from '@piplup/rhf-adapters/mui-tel-input';
import { FormContainer } from '@piplup/rhf-core';
import { type Meta, type StoryFn, type StoryObj } from '@storybook/react-vite';
import { matchIsValidTel } from 'mui-tel-input';
import { action } from 'storybook/actions';

/**
 * A wrapper around the [\<MuiTelInput /\>](https://viclafouch.github.io/mui-tel-input/) component pre-configured with `useMuiTelInputAdapter`.
 *
 * ## <span className="docs-h2">Import</span>
 *
 * ```tsx
 * import { MuiTelInputElement } from '@piplup/rhf-adapters/mui-tel-input';
 * ```
 *
 * > Note: See the storybook actions panel for form submission results in individual story.
 */
const meta: Meta<typeof MuiTelInputElement> = {
  args: {},
  argTypes: {
    required: {
      control: 'boolean',
    },
  },
  component: MuiTelInputElement,
  tags: ['autodocs'],
  title: 'rhf-adapters/mui-tel-input/MuiTelInputElement',
};

export default meta;

type Story = StoryObj<typeof MuiTelInputElement>;

const Template: StoryFn<typeof MuiTelInputElement> = (props) => {
  return (
    <FormContainer onError={action('onError')} onSubmit={action('onSubmit')}>
      <div>
        <MuiTelInputElement {...props} />
      </div>
      <MuiButtonElement sx={{ mt: 2 }} type="submit" variant="contained">
        Submit
      </MuiButtonElement>
    </FormContainer>
  );
};

export const Default = Template.bind({});
Default.args = {
  defaultValue: '+33123456789',
  name: 'default-mui-tel-input',
};

export const PhoneValidation: Story = {
  render() {
    // import { matchIsValidTel } from 'mui-tel-input'

    const validate = (value: string) => {
      return (
        matchIsValidTel(value, {
          continents: [], // optional
          excludedCountries: [], // optional
          onlyCountries: [], // optional,
        }) || 'Phone number is invalid'
      );
    };
    return (
      <FormContainer onError={action('onError')} onSubmit={action('onSubmit')}>
        <div>
          <MuiTelInputElement
            defaultValue="+33123456789"
            name="phone-validation-mui-tel-input"
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

/**
 * Sets the selected country on component mount
 */
export const DefaultCountry = Template.bind({});
DefaultCountry.args = {
  defaultCountry: 'DE',
  name: 'default-country-mui-tel-input',
};

/**
 * Displays the calling code (e.g: +32) as read-only next to the flag and with a divider instead of as part of the input field. Needs defaultCountry prop to be defined or will default to US.
 */
export const ForceCallingCode = Template.bind({});
ForceCallingCode.args = {
  defaultCountry: 'BE',
  forceCallingCode: true,
  name: 'force-calling-code-mui-tel-input',
};

/**
 * Autofocus the input when the user selects a country in the list.
 */
export const FocusOnSelectCountry = Template.bind({});
FocusOnSelectCountry.args = {
  defaultCountry: 'BE',
  focusOnSelectCountry: true,
  name: 'focus-on-select-country-mui-tel-input',
};

/**
 * [Country codes](https://viclafouch.github.io/mui-tel-input/docs/country-codes/) to be included in the list of countries.
 */
export const OnlyCountries = Template.bind({});
OnlyCountries.args = {
  defaultCountry: 'FR',
  name: 'only-countries-mui-tel-input',
  onlyCountries: ['FR', 'BE'],
};

/**
 * [Country codes](https://viclafouch.github.io/mui-tel-input/docs/country-codes/) to be excluded of the list of countries.
 */
export const ExcludeCountries = Template.bind({});
ExcludeCountries.args = {
  defaultCountry: 'FR',
  excludedCountries: ['CA', 'PT'],
  name: 'exclude-countries-mui-tel-input',
};

/**
 * [Country codes](https://viclafouch.github.io/mui-tel-input/docs/country-codes/) to be highlighted to the top of the list of countries.
 */
export const PreferredCountries = Template.bind({});
PreferredCountries.args = {
  name: 'preferred-countries-mui-tel-input',
  preferredCountries: ['BE', 'FR'],
};

/**
 * [Continent codes](https://viclafouch.github.io/mui-tel-input/docs/continent-codes/) to include a group of countries.
 */
export const Continents = Template.bind({});
Continents.args = {
  continents: ['EU', 'OC'],
  name: 'continents-mui-tel-input',
};

/**
 * No country list / The current flag is a span instead of a button.
 */
export const DisableDropdown = Template.bind({});
DisableDropdown.args = {
  defaultCountry: 'FR',
  disableDropdown: true,
  name: 'disable-dropdown-mui-tel-input',
};

/**
 * Remove format (spaces..) from the input value.
 */
export const DisableFormatting = Template.bind({});
DisableFormatting.args = {
  defaultCountry: 'FR',
  disableFormatting: true,
  name: 'disable-formatting-mui-tel-input',
};

/**
 * An Intl locale to translate country names (see [Intl locales](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DisplayNames/DisplayNames)). All countries will be translated in this language.
 */
export const LangOfCountryName = Template.bind({});
LangOfCountryName.args = {
  defaultCountry: 'BE',
  langOfCountryName: 'fr',
  name: 'lang-of-country-name-mui-tel-input',
};

/**
 * Props for the MUI [Menu](https://mui.com/material-ui/api/menu/) component.
 */
export const MenuProps = Template.bind({});
MenuProps.args = {
  defaultCountry: 'BE',
  MenuProps: { disableAutoFocusItem: true },
  name: 'menu-props-mui-tel-input',
};

export const GetFlagElement: Story = {
  render() {
    return (
      <FormContainer onError={action('onError')} onSubmit={action('onSubmit')}>
        <div>
          <MuiTelInputElement
            getFlagElement={(isoCode, { imgProps }) => {
              return (
                <img
                  {...imgProps}
                  alt={imgProps.alt}
                  src={`https://flagcdn.com/w40/${isoCode.toLowerCase()}.webp`}
                />
              );
            }}
            defaultCountry="FR"
            name="get-flag-element-mui-tel-input"
            onlyCountries={['FR', 'BE']}
          />
        </div>
        <MuiButtonElement
          sx={{
            mt: 2,
          }}
          type="submit"
          variant="contained"
        >
          Submit
        </MuiButtonElement>
      </FormContainer>
    );
  },
};

/**
 * This prop let you to customize the unknown flag, changed the width or height, use CDN or SVG component, etc..
 */
export const UnknownFlagElement = Template.bind({});
UnknownFlagElement.args = {
  name: 'unknown-flag-element-mui-tel-input',
  unknownFlagElement: '❓',
};
