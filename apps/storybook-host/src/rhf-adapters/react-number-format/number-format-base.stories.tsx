import { MuiButtonElement } from '@piplup/rhf-adapters/mui-material';
import { NumberFormatBaseElement } from '@piplup/rhf-adapters/react-number-format';
import { FormContainer } from '@piplup/rhf-core';
import { action } from '@storybook/addon-actions';
import { type Meta, type StoryObj } from '@storybook/react';
import { type NumberFormatBaseProps } from 'react-number-format';

/**
 * A wrapper around the [\<NumberFormatBaseElement /\>](https://s-yadav.github.io/react-number-format/docs/customization) component pre-configured with `useNumberFormatBaseAdapter`.
 *
 * ## <span className="docs-h2">Import</span>
 *
 * ```tsx
 * import { NumberFormatBaseElement } from '@piplup/rhf-adapters/react-number-format';
 * ```
 *
 * > Note: See the storybook actions panel for form submission results in individual story.
 */
const meta: Meta<typeof NumberFormatBaseElement> = {
  args: {},
  argTypes: {},
  component: NumberFormatBaseElement,
  tags: ['autodocs'],
  title: 'rhf-adapters/react-number-format/NumberFormatBaseElement',
};

export default meta;

type Story = StoryObj<typeof NumberFormatBaseElement>;

export const Default: Story = {
  render() {
    const format: NumberFormatBaseProps['format'] = (numStr) => {
      if (numStr === '') return '';
      return new Intl.NumberFormat('en-US', {
        currency: 'USD',
        maximumFractionDigits: 0,
        style: 'currency',
      }).format(+numStr);
    };

    return (
      <FormContainer onError={action('onError')} onSubmit={action('onSubmit')}>
        <div>
          <NumberFormatBaseElement format={format} name="default-number-format-base" />
        </div>
        <MuiButtonElement sx={{ mt: 2 }} type="submit" variant="contained">
          Submit
        </MuiButtonElement>
      </FormContainer>
    );
  },
};

export const CardExpiryField: Story = {
  render() {
    const format: NumberFormatBaseProps['format'] = (val) => {
      if (val === '') return '';
      let month = val.substring(0, 2);
      const year = val.substring(2, 4);

      if (month.length === 1 && +month[0] > 1) {
        month = `0${month[0]}`;
      } else if (month.length === 2) {
        // set the lower and upper boundary
        if (Number(month) === 0) {
          month = `01`;
        } else if (Number(month) > 12) {
          month = '12';
        }
      }

      return `${month}/${year}`;
    };

    const onKeyDown: NumberFormatBaseProps['onKeyDown'] = (e) => {
      const target = e.target as HTMLInputElement;
      const { selectionStart, value } = target;
      if (e.key === '/' && selectionStart && value[selectionStart] === '/') {
        // if there is number before slash with just one character add 0 prefix
        if (value.split('/')[0].length === 1) {
          target.value = `0${value}`;
          target.selectionStart = (target.selectionStart || 0) + 1;
        }

        target.selectionStart = (target.selectionStart || 0) + 1;
        e.preventDefault();
      }
    };

    return (
      <FormContainer onError={action('onError')} onSubmit={action('onSubmit')}>
        <div>
          <NumberFormatBaseElement
            format={format}
            name="default-number-format-base"
            onKeyDown={onKeyDown}
          />
        </div>
        <MuiButtonElement sx={{ mt: 2 }} type="submit" variant="contained">
          Submit
        </MuiButtonElement>
      </FormContainer>
    );
  },
};
