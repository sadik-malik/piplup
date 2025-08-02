import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MuiButtonElement, MuiFormHelperTextElement } from '@piplup/rhf-adapters/mui-material';
import { MuiXMultiSectionDigitalClockElement } from '@piplup/rhf-adapters/mui-x-date-pickers';
import { FormContainer } from '@piplup/rhf-core';
import { type Meta, type StoryFn } from '@storybook/react-vite';
import { action } from 'storybook/actions';

/**
 * A wrapper around the [\<MultiSectionDigitalClock /\>](https://mui.com/x/api/date-pickers/multi-section-digital-clock/) component pre-configured with `useMuiXMultiSectionDigitalClockAdapter`.
 *
 * ## <span className="docs-h2">Import</span>
 *
 * ```tsx
 * import { MuiXMultiSectionDigitalClockElement } from '@piplup/rhf-adapters/mui-x-date-pickers';
 * ```
 *
 * > Note: See the storybook actions panel for form submission results in individual story.
 */
const meta: Meta<typeof MuiXMultiSectionDigitalClockElement> = {
  args: {},
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
    maxTime: {
      control: 'date',
      description:
        'Maximal selectable time. The date part of the object will be ignored unless `props.disableIgnoringDatePartForTimeValidation === true`.',
    },
    minTime: {
      control: 'date',
      description:
        'Minimal selectable time. The date part of the object will be ignored unless `props.disableIgnoringDatePartForTimeValidation === true.`',
    },
    minutesStep: {
      control: 'number',
      description: 'Step over minutes.',
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
        'Validation rules object. Refer react-hook-form documentation [here](https://www.react-hook-form.com/api/usecontroller/controller/). The following props add validation rules to the rules object: `required`, `minTime`, `minTime`, `disableFuture`, `disablePast`, `shouldDisableTime` and `minutesStep`. Both validation and messages are completely customizable, so you can customize the rules as per your requirement.',
      table: {
        defaultValue: {
          summary: `{}`,
        },
      },
    },
    shouldDisableTime: {
      control: {
        disable: true,
      },
      description: 'Disable specific time.',
      type: 'function',
    },
    transform: {
      control: {
        disable: true,
        type: 'object',
      },
    },
  },
  component: MuiXMultiSectionDigitalClockElement,
  tags: ['autodocs'],
  title: 'RHF-Adapters/mui-x-date-pickers/Time Components/MuiXMultiSectionDigitalClockElement',
};

export default meta;

const Template: StoryFn<typeof MuiXMultiSectionDigitalClockElement> = (props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FormContainer onError={action('onError')} onSubmit={action('onSubmit')}>
        <MuiXMultiSectionDigitalClockElement {...props} sx={{ mx: 0 }} />
        <MuiFormHelperTextElement error={props.error} name={props.name} renderOnError />
        <MuiButtonElement sx={{ mt: 2 }} type="submit" variant="contained">
          Submit
        </MuiButtonElement>
      </FormContainer>
    </LocalizationProvider>
  );
};

export const Default = Template.bind({});

Default.args = {
  name: 'multi-section-digital-clock',
};
