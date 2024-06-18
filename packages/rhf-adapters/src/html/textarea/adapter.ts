import {
  execSequentially,
  useComposeClassName,
  useComposeModiferState,
  useComposeRules,
  useComposeStyle,
  useForkRef,
  useTransform,
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
import HTMLTextareaClasses from './classes';

export interface HTMLTextareaPropsOverrides {}

export interface HTMLTextareaProps
  extends React.ComponentPropsWithRef<'textarea'>,
    HTMLTextareaPropsOverrides {}

type TransformedValue = string | number | readonly string[] | undefined;

export interface UseHTMLTextareaAdapterProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValue extends TransformedValue = TransformedValue
> extends Omit<HTMLTextareaProps, 'name' | 'defaultValue' | 'style'>,
    UseControllerProps<TFieldValues, TName> {
  transform?: {
    input?: (value: PathValue<TFieldValues, TName>) => TTransformedValue;
    output?: (event: React.ChangeEvent<HTMLTextAreaElement>) => PathValue<TFieldValues, TName>;
  };
  verbose?: boolean;
  disableOnIsSubmitting?: boolean;
  style?:
    | React.CSSProperties
    | ((modifierState: UseComposeModifierStateResult) => React.CSSProperties);
  classes?: Partial<Record<keyof typeof HTMLTextareaClasses, 'string'>>;
}

export default function useHTMLTextareaAdapter<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValue extends TransformedValue = TransformedValue
>(
  props: UseHTMLTextareaAdapterProps<TFieldValues, TName, TTransformedValue>,
  ref?: HTMLTextareaProps['ref']
): HTMLTextareaProps {
  const {
    name,
    control,
    defaultValue,
    disabled,
    rules,
    shouldUnregister,
    onChange,
    onBlur,
    transform,
    disableOnIsSubmitting,
    verbose: _verbose, // Added for consistency between adapters, which we may use in the future.
    className,
    style,
    classes,
    minLength,
    maxLength,
    required,
    ...rest
  } = props;

  const composedRules = useComposeRules<TFieldValues, TName>({
    required,
    rules,
    minLength,
    maxLength,
    type: 'text',
  });

  const {
    field,
    fieldState: { error },
    formState: { isSubmitting },
  } = useController<TFieldValues, TName>({
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
        return typeof value !== 'undefined' ? value : ('' as TTransformedValue);
      },
      output(event: React.ChangeEvent<HTMLTextAreaElement>) {
        const value = event.target.value;
        return value as PathValue<TFieldValues, TName>;
      },
    }),
    []
  );

  const transformed = useTransform<TFieldValues, TName, TTransformedValue>({
    value: field.value,
    onChange: field.onChange,
    transform: {
      input: typeof transform?.input === 'function' ? transform.input : transformHelpers.input,
      output: typeof transform?.output === 'function' ? transform.output : transformHelpers.output,
    },
  });

  const handleChange = React.useMemo(
    () => execSequentially(transformed.onChange, onChange),
    [transformed.onChange, onChange]
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
    internalClasses: HTMLTextareaClasses,
    modifierState,
    classes,
    className,
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
    className: composedClassName,
    style: composedStyle,
    minLength,
    maxLength,
    required,
    ...rest,
  };
}
