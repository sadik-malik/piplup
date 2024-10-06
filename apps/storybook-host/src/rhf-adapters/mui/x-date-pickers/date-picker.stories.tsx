import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MuiButtonElement } from '@piplup/rhf-adapters/mui-material';
import { MuiXDatePickerElement } from '@piplup/rhf-adapters/mui-x-date-pickers';
import { FormContainer } from '@piplup/rhf-core';
import { action } from '@storybook/addon-actions';
import { type Meta, type StoryFn } from '@storybook/react';
import dayjs from 'dayjs';

/**
 * A wrapper around the `<DatePicker>` component pre-configured with `useMuiXDatePickerAdapter`.
 *
 * ## <span className="docs-h2">Import</span>
 *
 * ```tsx
 * import { MuiXDatePickerElement } from '@piplup/rhf-adapters/mui-x-date-pickers';
 * ```
 */
const meta: Meta<typeof MuiXDatePickerElement> = {
  args: {
    className: '',
    disabled: false,
    disableFuture: false,
    disableOnError: false,
    disableOnIsSubmitting: false,
    disablePast: false,
    error: false,
    messages: {},
    required: false,
    rules: {},
    shouldUnregister: false,
    style: {},
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'CSS class name for component.',
      table: {
        defaultValue: {
          summary: '',
        },
      },
    },
    control: {
      control: {
        disable: true,
        type: 'object',
      },
      description: '`control` object from `useForm` hook.',
      table: {
        defaultValue: {
          summary: 'undefined',
        },
      },
    },
    defaultValue: {
      control: {
        disable: true,
        type: 'date',
      },
      table: {
        type: {
          summary: 'FieldPathValue<TFieldValues, TName>',
        },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'If true, the picker and text field are disabled.',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    disableFuture: {
      control: 'boolean',
      description: 'If true, disable values after the current date.',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    disableOnError: {
      control: 'boolean',
      description: 'If `true`, the picker and text field are disabled in case of error.',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    disableOnIsSubmitting: {
      control: 'boolean',
      description: 'If `true`, the picker and text field are disabled when form is submitting.',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    disablePast: {
      control: 'boolean',
      description: 'If `true`, disable values before the current date.',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    error: {
      control: 'boolean',
      description: 'If true, the text field is displayed in an error state.',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    errorParser: {
      control: {
        disable: true,
      },
      type: 'function',
    },
    label: {
      control: 'text',
      description: 'The label content.',
      table: {
        defaultValue: {
          summary: '',
        },
      },
    },
    maxDate: {
      control: 'date',
      table: {
        defaultValue: {
          summary: '2099-12-31',
        },
      },
    },
    minDate: {
      control: 'date',
      table: {
        defaultValue: {
          summary: '1900-01-01',
        },
      },
    },
    name: {
      control: 'text',
      table: {
        defaultValue: {
          summary: '',
        },
      },
    },
    onChange: {
      action: 'onChange',
      description: 'Callback fired when the value changes.',
      type: {
        name: 'function',
      },
    },
    onClose: {
      action: 'onClose',
      description: 'Callback fired when the popup requests to be closed. Use in controlled mode.',
      type: 'function',
    },
    required: {
      control: 'boolean',
      description: 'If true, the label is displayed as required and the input element is required.',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },

    rules: {
      control: {
        type: 'object',
      },
      description:
        'Validation rules object. Refer react-hook-form documentation [here](https://www.react-hook-form.com/api/usecontroller/controller/). `@piplup/rhf-adapters` provides pre-configured validation for the following props: `required`, `minDate`, `maxDate`, `disableFuture`, `disablePast`, `shouldDisableDate`, `shouldDisableMonth` and `shouldDisableYear`. Both validation and messages are completely customizable, so you can customize the rules as per your requirement.',
      table: {
        defaultValue: {
          summary: `{}`,
        },
      },
    },
    shouldDisableDate: {
      control: {
        disable: true,
      },
      description: 'Disable specific date.',
      type: 'function',
    },
    transform: {
      control: {
        disable: true,
        type: 'object',
      },
    },
  },
  component: MuiXDatePickerElement,
  tags: ['autodocs'],
  title: 'RHF-Adapters/mui-x-date-pickers/MuiXDatePickerElement',
};

export default meta;

const Template: StoryFn<typeof MuiXDatePickerElement> = (props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FormContainer onError={action('onError')} onSubmit={action('onSubmit')}>
        <div>
          <MuiXDatePickerElement
            {...props}
            {...(props.minDate && { minDate: dayjs(props.minDate) })}
            {...(props.maxDate && { maxDate: dayjs(props.maxDate) })}
          />
        </div>
        <MuiButtonElement sx={{ mt: 2 }} type="submit" variant="contained">
          Submit
        </MuiButtonElement>
      </FormContainer>
    </LocalizationProvider>
  );
};

export const Default = Template.bind({});

Default.args = {
  label: 'Basic Date Picker',
  name: 'basic-date-picker',
};
