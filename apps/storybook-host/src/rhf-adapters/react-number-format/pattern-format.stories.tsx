import { MuiButtonElement } from '@piplup/rhf-adapters/mui-material';
import { PatternFormatElement } from '@piplup/rhf-adapters/react-number-format';
import { FormContainer } from '@piplup/rhf-core';
import { type Meta, type StoryFn } from '@storybook/react-vite';
import { action } from 'storybook/actions';

/**
 * A wrapper around the [\<PatternFormat /\>](https://s-yadav.github.io/react-number-format/docs/pattern_format/) component pre-configured with `usePatternFormatAdapter`.
 *
 * ## <span className="docs-h2">Import</span>
 *
 * ```tsx
 * import { PatternFormatElement } from '@piplup/rhf-adapters/react-number-format';
 * ```
 *
 * > Note: See the storybook actions panel for form submission results in individual story.
 */
const meta: Meta<typeof PatternFormatElement> = {
  args: {},
  argTypes: {},
  component: PatternFormatElement,
  tags: ['autodocs'],
  title: 'rhf-adapters/react-number-format/PatternFormatElement',
};

export default meta;

const Template: StoryFn<typeof PatternFormatElement> = (props) => {
  return (
    <FormContainer onError={action('onError')} onSubmit={action('onSubmit')}>
      <div>
        <PatternFormatElement {...props} />
      </div>
      <MuiButtonElement sx={{ mt: 2 }} type="submit" variant="contained">
        Submit
      </MuiButtonElement>
    </FormContainer>
  );
};

export const Default = Template.bind({});

Default.args = {
  allowEmptyFormatting: true,
  format: '+1 (###) #### ###',
  mask: '_',
  name: 'default-pattern-format',
};

export const Format = Template.bind({});

Format.args = {
  defaultValue: 123123,
  format: '### ###',
  name: 'format-pattern-format',
};

export const Mask = Template.bind({});

Mask.args = {
  defaultValue: '411111',
  format: '#### #### #### ####',
  mask: '_',
  name: 'mask-pattern-format',
  valueIsNumericString: true,
};

export const PatternChar = Template.bind({});

PatternChar.args = {
  defaultValue: 23456,
  format: '%% (%%%)',
  name: 'pattern-char-pattern-format',
  patternChar: '%',
};
