import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MuiButtonElement } from '@piplup/rhf-adapters/mui-material';
import { MuiXTimeFieldElement } from '@piplup/rhf-adapters/mui-x-date-pickers';
import { FormContainer } from '@piplup/rhf-core';
import { action } from '@storybook/addon-actions';
import { type Meta, type StoryFn } from '@storybook/react';

/**
 * A wrapper around the `<TimeField>` component pre-configured with `useMuiXTimeFieldAdapter`.
 *
 * ## <span className="docs-h2">Import</span>
 *
 * ```tsx
 * import { MuiXTimeFieldElement } from '@piplup/rhf-adapters/mui-x-date-pickers';
 * ```
 *
 * > Note: See the storybook actions panel for form submission results in individual story.
 */
const meta: Meta<typeof MuiXTimeFieldElement> = {
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
    component: {
      control: {
        disable: true,
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
  component: MuiXTimeFieldElement,
  tags: ['autodocs'],
  title: 'RHF-Adapters/mui-x-date-pickers/MuiXTimeFieldElement',
};

export default meta;

const Template: StoryFn<typeof MuiXTimeFieldElement> = (props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FormContainer onError={action('onError')} onSubmit={action('onSubmit')}>
        <div>
          <MuiXTimeFieldElement {...props} />
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
  label: 'Default Time Field',
  name: 'default-time-field',
};
