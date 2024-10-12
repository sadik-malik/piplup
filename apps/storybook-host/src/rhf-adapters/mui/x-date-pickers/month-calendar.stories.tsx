import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MuiButtonElement, MuiFormHelperTextElement } from '@piplup/rhf-adapters/mui-material';
import { MuiXMonthCalendarElement } from '@piplup/rhf-adapters/mui-x-date-pickers';
import { FormContainer } from '@piplup/rhf-core';
import { action } from '@storybook/addon-actions';
import { type Meta, type StoryFn } from '@storybook/react';

/**
 * A wrapper around the [\<MonthCalendar /\>](https://mui.com/x/api/date-pickers/month-calendar/) component pre-configured with `useMuiXMonthCalendarAdapter`.
 *
 * ## <span className="docs-h2">Import</span>
 *
 * ```tsx
 * import { MuiXMonthCalendarElement } from '@piplup/rhf-adapters/mui-x-date-pickers';
 * ```
 *
 * > Note: See the storybook actions panel for form submission results in individual story.
 */
const meta: Meta<typeof MuiXMonthCalendarElement> = {
  args: {
    disabled: false,
    disableFuture: false,
    disableOnError: false,
    disableOnIsSubmitting: false,
    disablePast: false,
    error: false,
    required: false,
    shouldUnregister: false,
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
    onBlur: {
      action: 'onBlur',
      description: 'Callback fired when the field looses focus.',
      type: 'function',
    },
    onChange: {
      action: 'onChange',
      description: 'Callback fired when the value changes.',
      type: {
        name: 'function',
      },
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
        disable: true,
        type: 'object',
      },
      description:
        'Validation rules object. Refer react-hook-form documentation [here](https://www.react-hook-form.com/api/usecontroller/controller/). `@piplup/rhf-adapters` provides pre-configured validation for the following props: `required`, `minDate`, `maxDate`, `disableFuture`, `disablePast` and `shouldDisableMonth`. Both validation and messages are completely customizable, so you can customize the rules as per your requirement.',
      table: {
        defaultValue: {
          summary: `{}`,
        },
      },
    },
    shouldDisableMonth: {
      control: {
        disable: true,
      },
      description: 'Disable specific month.',
      type: 'function',
    },
    transform: {
      control: {
        disable: true,
        type: 'object',
      },
    },
  },
  component: MuiXMonthCalendarElement,
  tags: ['autodocs'],
  title: 'RHF-Adapters/mui-x-date-pickers/Date Components/MuiXMonthCalendarElement',
};

export default meta;

const Template: StoryFn<typeof MuiXMonthCalendarElement> = (props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FormContainer onError={action('onError')} onSubmit={action('onSubmit')}>
        <div>
          <MuiXMonthCalendarElement {...props} />
          <MuiFormHelperTextElement error={props.error} name={props.name} renderOnError />
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
  name: 'default-month-calendar',
};
