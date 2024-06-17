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

type TransformedValue = string | number | readonly string[] | undefined;

export interface UseHTMLInputAdapterProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValue extends TransformedValue = TransformedValue
> extends Omit<HTMLInputProps, 'name' | 'defaultValue' | 'style'>,
    UseControllerProps<TFieldValues, TName> {
  defaultValue?: PathValue<TFieldValues, TName>;
  transform?: {
    input?: (value: PathValue<TFieldValues, TName>) => TTransformedValue;
    output?: (event: React.ChangeEvent<HTMLInputElement>) => PathValue<TFieldValues, TName>;
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
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValue extends TransformedValue = TransformedValue
>(
  props: UseHTMLInputAdapterProps<TFieldValues, TName, TTransformedValue>,
  ref?: HTMLInputProps['ref']
): HTMLInputProps {
  const {
    name,
    control,
    defaultValue,
    disabled,
    rules,
    shouldUnregister,
    onChange,
    onBlur,
    type,
    transform,
    verbose = true,
    disableOnIsSubmitting = false,
    className,
    style,
    classes,
    required,
    messages,
    min,
    minLength,
    max,
    maxLength,
    title,
    pattern,
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
      input(value: PathValue<TFieldValues, TName>): TTransformedValue {
        if (type === 'file') {
          // In React, an <input type="file" /> is always an uncontrolled component because its value
          // can only be set by a user, and not programmatically.
          // https://legacy.reactjs.org/docs/uncontrolled-components.html#the-file-input-tag
          return undefined as TTransformedValue;
        }
        if (typeof value === 'undefined' || value === null) {
          return '' as TTransformedValue;
        }
        return value;
      },
      output(event: React.ChangeEvent<HTMLInputElement>) {
        switch (type) {
          case 'file':
            return event.target.files as PathValue<TFieldValues, TName>;
          case 'number':
            return +event.target.value as PathValue<TFieldValues, TName>;
          default:
            return event.target.value as PathValue<TFieldValues, TName>;
        }
      },
    }),
    [type]
  );

  const transformed = useTransform<TFieldValues, TName, TTransformedValue>({
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

  return {
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
    ...rest,
  };
}
