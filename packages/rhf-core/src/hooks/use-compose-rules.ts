import { title } from 'process';
import { type FieldPath, type FieldValues, type UseControllerProps } from 'react-hook-form';
import { compact } from '../utils';

export type ComposeRulesMessages = {
  required?: string;
  minLength?: string | ((minLength: number) => string);
  maxLength?: string | ((maxLength: number) => string);
  min?: string | ((min: string | number) => string);
  max?: string | ((max: string | number) => string);
  pattern?: string | ((pattern: RegExp, title?: string) => string);
};

const defaultMessages: NonNullable<ComposeRulesMessages> = {
  required: 'Please fill out this field.',
  minLength: (minLength) => `Please lengthen this text to ${minLength} characters or more`,
  maxLength: (maxLength) => `Please shorten this text to ${maxLength} characters or less.`,
  min: (min) => `Value must be ${min} or later.`,
  max: (max) => `Value must be ${max} or earlier.`,
  pattern: (_pattern: RegExp, title?: string) =>
    compact(['Please match the requested format.', title]).join(' '),
};

function getMessage(
  messageOrFunction:
    | string
    | undefined
    | ((
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...values: any
      ) => string | undefined),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...values: any
): string {
  return (
    (typeof messageOrFunction === 'function' ? messageOrFunction(values) : messageOrFunction) || ''
  );
}

export type UseComposeRulesProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  rules?: UseControllerProps<TFieldValues, TName>['rules'];
  required?: boolean;
  messages?: ComposeRulesMessages;
  minLength?: number;
  maxLength?: number;
  type?: string;
  min?: number | string;
  max?: number | string;
  pattern?: string;
  title?: string | undefined;
};

export default function useComposeRules<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: UseComposeRulesProps<TFieldValues, TName>) {
  const { rules = {}, required, messages, minLength, maxLength, type, min, max, pattern } = props;

  if (!rules.required && required) {
    rules.required = messages?.required ?? defaultMessages.required;
  }

  if (
    // Filter input type which support minLength, maxLength and pattern.
    // Reference:
    // https://www.w3schools.com/tags/att_input_minlength.asp
    // https://www.w3schools.com/tags/att_input_maxlength.asp
    ['text', 'search', 'url', 'tel', 'email', 'password'].some((inputType) => inputType === type)
  ) {
    if (!rules.minLength && minLength) {
      rules.minLength = {
        value: minLength,
        message: getMessage(messages?.minLength ?? defaultMessages?.minLength, minLength),
      };
    }

    if (!rules.maxLength && maxLength) {
      rules.maxLength = {
        value: maxLength,
        message: getMessage(messages?.maxLength ?? defaultMessages?.maxLength, maxLength),
      };
    }

    if (!rules.pattern && pattern) {
      rules.pattern = {
        value: new RegExp(pattern),
        message: getMessage(messages?.pattern ?? defaultMessages?.pattern, pattern, title),
      };
    }
  }

  if (
    //Filter input type which support minLength and maxLength.
    // Reference:
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/min#syntax
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/max#syntax
    ['number', 'range', 'date', 'month', 'week', 'time', 'datetime-local'].some(
      (inputType) => inputType === type
    )
  ) {
    if (!rules.min && min) {
      rules.min = {
        value: min,
        message: getMessage(messages?.min ?? defaultMessages?.min, min),
      };
    }

    if (!rules.max && max) {
      rules.max = {
        value: max,
        message: getMessage(messages?.max ?? defaultMessages?.max, max),
      };
    }
  }

  return rules;
}
