import { MuiChipsInputElement, validateChipValues } from '@piplup/rhf-adapters/mui-chips-input';
import { MuiButtonElement } from '@piplup/rhf-adapters/mui-material';
import { FormContainer } from '@piplup/rhf-core';
import { action } from '@storybook/addon-actions';
import { type Meta, type StoryFn, type StoryObj } from '@storybook/react';

/**
 * A wrapper around the [\<MuiChipsInput /\>](https://viclafouch.github.io/mui-chips-input/) component pre-configured with `useMuiChipsInputAdapter`.
 *
 * ## <span className="docs-h2">Import</span>
 *
 * ```tsx
 * import { MuiChipsInputElement } from '@piplup/rhf-adapters/mui-chips-input';
 * ```
 *
 * > Note: See the storybook actions panel for form submission results in individual story.
 */
const meta: Meta<typeof MuiChipsInputElement> = {
  args: {},
  argTypes: {},
  component: MuiChipsInputElement,
  tags: ['autodocs'],
  title: 'rhf-adapters/mui-chips-input/MuiChipsInputElement',
};

export default meta;

export type Story = StoryObj<typeof MuiChipsInputElement>;

const Template: StoryFn<typeof MuiChipsInputElement> = (props) => {
  return (
    <FormContainer onError={action('onError')} onSubmit={action('onSubmit')}>
      <div>
        <MuiChipsInputElement {...props} />
      </div>
      <MuiButtonElement sx={{ mt: 2 }} type="submit" variant="contained">
        Submit
      </MuiButtonElement>
    </FormContainer>
  );
};

export const Default = Template.bind({});
Default.args = {
  defaultValue: ['Apple', 'Peach', 'Banana'],
  label: 'Default',
  name: 'default-mui-chips-input',
};

/**
 * Gets called once the user adds a chip.
 *
 * > Note: See the storybook actions panel for onAddChip result in individual story.
 */
export const onAddChip = Template.bind({});
onAddChip.args = {
  defaultValue: ['foo'],
  name: 'on-add-chip-mui-chips-input',
  onAddChip: action('onAddChip'),
};

/**
 * Gets called once the user removes a chip.
 *
 * > Note: See the storybook actions panel for onDeleteChip result in individual story.
 */
export const onDeleteChip = Template.bind({});
onDeleteChip.args = {
  defaultValue: ['foo'],
  name: 'on-delete-chip-mui-chips-input',
  onDeleteChip: action('onDeleteChip'),
};

/**
 * Gets called once the user has edited a chip. User can edit a chip by double clicking on it.
 *
 * > Note: See the storybook actions panel for onEditChip result in individual story.
 */
export const onEditChip = Template.bind({});
onEditChip.args = {
  name: 'on-edit-chip-mui-chips-input',
  onEditChip: action('onEditChip'),
};

/**
 * Gets called once the user updates the input value.
 *
 * > Note: See the storybook actions panel for onInputChange result in individual story.
 */
export const onInputChange = Template.bind({});
onInputChange.args = {
  name: 'on-input-change-mui-chips-input',
  onInputChange: action('onInputChange'),
};

/**
 * Clear the input value when the user clicks outside the input.
 */
export const clearInputOnBlur = Template.bind({});
clearInputOnBlur.args = {
  clearInputOnBlur: true,
  name: 'clear-input-on-blur-mui-chips-input',
};

/**
 * Hide the "x" icon button to prevent the user from deleting all the chips.
 */
export const hideClearAll = Template.bind({});
hideClearAll.args = {
  hideClearAll: true,
  name: 'hide-clear-all-mui-chips-input',
};

/**
 * Prevent the user from editing a chip when double click on it.
 */
export const disableEdition = Template.bind({});
disableEdition.args = {
  disableEdition: true,
  name: 'disable-edition-mui-chips-input',
};

/**
 * By default, if the input field is empty and the user presses the delete key,
 * the last chip will be deleted. You can disable this logic.
 */
export const disableDeleteOnBackspace = Template.bind({});
disableDeleteOnBackspace.args = {
  disableDeleteOnBackspace: true,
  name: 'disable-delete-on-backspace-mui-chips-input',
};

/**
 * Enable this option to add a chip when the input element loses focus.
 */
export const addOnBlur = Template.bind({});
addOnBlur.args = {
  addOnBlur: true,
  name: 'add-on-blur-mui-chips-input',
};

/**
 * Set a validation to your new chips, or when user is editing a chip.
 */
export const validate: Story = {
  render() {
    const validate = (chipValue: string) => {
      return {
        isError: chipValue.length < 3,
        textError: 'Value must be at least 3 characters long',
      };
    };

    return (
      <FormContainer onError={action('onError')} onSubmit={action('onSubmit')}>
        <div>
          <MuiChipsInputElement
            rules={{
              // Perform validation on each chip value in react-hook-form using validateChipValues
              // import { validateChipValues } from '@piplup/rhf-adapters/mui-chips-input';
              validate: validateChipValues(validate),
            }}
            name="validate-mui-chips-input"
            // Perform validation in `mui-chips-input`
            validate={validate}
            clearInputOnBlur
            required
          />
        </div>
        <MuiButtonElement sx={{ mt: 2 }} type="submit" variant="contained">
          Submit
        </MuiButtonElement>
      </FormContainer>
    );
  },
};
