import { compact, hasOwnProperty } from '@piplup/utils';
import { type FieldPath, type FieldValues, type UseControllerProps } from 'react-hook-form';

export type ComposeRulesMessages = {
  email?: ((email: string) => string) | string;
  max?: ((max: number | string) => string) | string;
  maxLength?: ((maxLength: number) => string) | string;
  min?: ((min: number | string) => string) | string;
  minLength?: ((minLength: number) => string) | string;
  pattern?: ((pattern: RegExp, title?: string) => string) | string;
  required?: string;
};

const defaultMessages: NonNullable<ComposeRulesMessages> = {
  email: 'Entered value does not match email format.',
  max: (max) => `Value must be ${max} or earlier.`,
  maxLength: (maxLength) => `Please shorten this text to ${maxLength} characters or less.`,
  min: (min) => `Value must be ${min} or later.`,
  minLength: (minLength) => `Please lengthen this text to ${minLength} characters or more`,
  pattern: (_pattern: RegExp, title?: string) =>
    compact(['Please match the requested format.', title]).join(' '),
  required: 'Please fill out this field.',
};

function getMessage(
  messageOrFunction:
    | ((
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...values: any
      ) => string | undefined)
    | string
    | undefined,
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
  max?: number | string;
  maxLength?: number;
  messages?: ComposeRulesMessages;
  min?: number | string;
  minLength?: number;
  pattern?: RegExp | string;
  required?: boolean;
  rules?: UseControllerProps<TFieldValues, TName>['rules'];
  title?: string | undefined;
  type?: string;
};

export function useComposeRules<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: UseComposeRulesProps<TFieldValues, TName>) {
  const {
    max,
    maxLength,
    messages,
    min,
    minLength,
    pattern,
    required,
    rules = {},
    title,
    type,
  } = props;

  if (!rules.required && required) {
    rules.required = messages?.required ?? defaultMessages.required;
  }

  if (type === 'email' && !hasOwnProperty(rules.validate, 'email')) {
    rules.validate = {
      ...rules.validate,
      email: (value) =>
        !value ||
        /\S+@\S+\.\S+/.test(value) ||
        getMessage(messages?.email ?? defaultMessages?.email, value),
    };
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
        message: getMessage(messages?.minLength ?? defaultMessages?.minLength, minLength),
        value: minLength,
      };
    }

    if (!rules.maxLength && maxLength) {
      rules.maxLength = {
        message: getMessage(messages?.maxLength ?? defaultMessages?.maxLength, maxLength),
        value: maxLength,
      };
    }

    if (!rules.pattern && pattern) {
      rules.pattern = {
        message: getMessage(messages?.pattern ?? defaultMessages?.pattern, pattern, title),
        value: pattern instanceof RegExp ? pattern : new RegExp(pattern),
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
        message: getMessage(messages?.min ?? defaultMessages?.min, min),
        value: min,
      };
    }

    if (!rules.max && max) {
      rules.max = {
        message: getMessage(messages?.max ?? defaultMessages?.max, max),
        value: max,
      };
    }
  }

  return rules;
}
