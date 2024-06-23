import {
  execSequentially,
  logger,
  useComposeClassName,
  useComposeModiferState,
  useComposeRules,
  useComposeStyle,
  useForkRef,
  useTransform,
  type ComposeRulesMessages,
  type UseComposeModifierStateResult,
} from '@piplup/rhf-core';
import * as React from 'react';
import {
  useController,
  type FieldPath,
  type FieldValues,
  type PathValue,
  type UseControllerProps,
} from 'react-hook-form';
import HTMLInputClasses from './classes';

export interface HTMLInputPropsOverrides {}

export interface HTMLInputProps
  extends React.ComponentPropsWithRef<'input'>,
    HTMLInputPropsOverrides {}

export interface UseHTMLInputAdapterProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<HTMLInputProps, 'name' | 'defaultValue' | 'style' | 'src'>,
    UseControllerProps<TFieldValues, TName> {
  defaultValue?: PathValue<TFieldValues, TName>;
  transform?: {
    input?: (
      value: PathValue<TFieldValues, TName>
    ) => string | number | readonly string[] | undefined;
    output?: (
      event: React.ChangeEvent<HTMLInputElement>,
      previousValue: string | number | readonly string[] | FileList | undefined
    ) => PathValue<TFieldValues, TName>;
  };
  verbose?: boolean;
  disableOnIsSubmitting?: boolean;
  style?:
    | React.CSSProperties
    | ((modifierState: UseComposeModifierStateResult) => React.CSSProperties);
  classes?: Partial<Record<keyof typeof HTMLInputClasses, 'string'>>;
  messages?: ComposeRulesMessages;
}

export default function useHTMLInputAdapter<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: UseHTMLInputAdapterProps<TFieldValues, TName>,
  ref?: HTMLInputProps['ref']
): HTMLInputProps {
  const {
    id,
    name,
    control,
    defaultValue,
    disabled = false,
    rules,
    shouldUnregister = false,
    onChange,
    onBlur,
    type = 'text',
    transform,
    verbose = true,
    disableOnIsSubmitting = false,
    className,
    style,
    classes,
    required = false,
    messages,
    min,
    minLength,
    max,
    maxLength,
    title,
    pattern,
    value: inputValue,
    ...rest
  } = props;

  if (type === 'button' || type === 'reset' || type === 'submit') {
    logger(
      'warn',
      verbose
    )(
      `useHTMLInputAdator with prop \`type="${type}"\` may result in unexpected behaviour. Please use useHTMLButtonAdapter instead.`
    );
  }

  if (type === 'checkbox' && typeof inputValue === 'undefined') {
    throw new Error(`\`value\` prop is required when using type as "${type}".`);
  }

  const composedRules = useComposeRules<TFieldValues, TName>({
    required,
    rules,
    messages,
    min,
    minLength,
    max,
    maxLength,
    type,
    pattern,
    title,
  });

  const {
    field,
    formState: { isSubmitting },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue,
    disabled,
    rules: composedRules,
    shouldUnregister,
  });

  const handleRef = useForkRef(field.ref, ref);

  const transformHelpers = React.useMemo(
    () => ({
      input(
        value: PathValue<TFieldValues, TName>
      ): string | number | readonly string[] | undefined {
        if (type === 'file') {
          // In React, an <input type="file" /> is always an uncontrolled component because its value
          // can only be set by a user, and not programmatically.
          // https://legacy.reactjs.org/docs/uncontrolled-components.html#the-file-input-tag
          return undefined;
        }
        if (typeof value === 'undefined' || value === null) {
          return '';
        }
        return value;
      },
      output(
        event: React.ChangeEvent<HTMLInputElement>,
        previousValue: string | number | readonly string[] | FileList | undefined
      ) {
        if (type === 'checkbox') {
          const values: string[] = (Array.isArray(previousValue) ? previousValue : []).filter(
            (value) => value.toString() !== event.target.value.toString()
          );
          if (event.target.checked) {
            values.push(event.target.value);
          }
          return values as PathValue<TFieldValues, TName>;
        } else if (type === 'radio') {
          return (event.target.checked ? event.target.value : '') as PathValue<TFieldValues, TName>;
        } else if (type === 'file') {
          return event.target.files as PathValue<TFieldValues, TName>;
        } else if (type === 'number') {
          return +event.target.value as PathValue<TFieldValues, TName>;
        }
        return event.target.value as PathValue<TFieldValues, TName>;
      },
    }),
    [type]
  );

  const transformed = useTransform<
    TFieldValues,
    TName,
    string | number | readonly string[] | undefined
  >({
    transform: {
      input: typeof transform?.input === 'function' ? transform.input : transformHelpers.input,
      output: typeof transform?.output === 'function' ? transform.output : transformHelpers.output,
    },
    value: field.value,
    onChange: field.onChange,
  });

  const handleChange = React.useMemo(
    () => execSequentially(transformed.onChange, onChange),
    [onChange, transformed.onChange]
  );
  const handleBlur = React.useMemo(
    () => execSequentially(field.onBlur, onBlur),
    [field.onBlur, onBlur]
  );

  const modifierState = useComposeModiferState({
    disabled: field.disabled,
    disableOnIsSubmitting,
    error,
    isSubmitting,
  });

  const composedClassName = useComposeClassName({
    classes,
    className,
    internalClasses: HTMLInputClasses,
    modifierState: modifierState,
  });

  const composedStyle = useComposeStyle({
    modifierState,
    style,
  });

  const checked = React.useMemo(() => {
    if (type === 'checkbox') {
      return Array.isArray(transformed.value)
        ? transformed.value.includes(inputValue?.toString())
        : false;
    }
    if (type === 'radio') {
      return transformed.value?.toString() === inputValue?.toString();
    }
    return false;
  }, [type, inputValue, transformed.value]);

  const adapter: HTMLInputProps = {
    ...rest,
    name: field.name,
    value: transformed.value,
    ref: handleRef,
    onChange: handleChange,
    onBlur: handleBlur,
    disabled: modifierState.disabled,
    type,
    className: composedClassName,
    style: composedStyle,
    required,
    min,
    minLength,
    max,
    maxLength,
    pattern,
    title,
    id,
  };

  if (type === 'checkbox' || type === 'radio') {
    adapter.checked = checked;
    adapter.value = inputValue;
  }

  if (type === 'image') {
    adapter.src = transformed.value?.toString();
    delete adapter.value;
  }

  return adapter;
}
