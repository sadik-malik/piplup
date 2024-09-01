import * as React from 'react';
import { type RadioGroupProps } from '@mui/material';
import {
  type StandardFieldAdapterProps,
  useComposeModiferState,
  useComposeRules,
  useComposeStyle,
  useTransform,
} from '@piplup/rhf-core';
import { execSequentially, useForkRef, type ExtractRef } from '@piplup/utils';
import { type FieldPath, type FieldValues, type PathValue, useController } from 'react-hook-form';

interface MuiRadioGroupAdapterBaseProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValue = unknown
> extends StandardFieldAdapterProps<TFieldValues, TName, TTransformedValue> {}

export type UseMuiRadioGroupAdapterProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValue = unknown,
  ComponentProps extends React.ComponentPropsWithRef<React.ElementType> = RadioGroupProps
> = MuiRadioGroupAdapterBaseProps<TFieldValues, TName, TTransformedValue> &
  Omit<ComponentProps, 'checked' | 'defaultChecked' | 'defaultValue' | 'name' | 'style' | 'value'>;

export function useMuiRadioGroupAdapter<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValue = unknown,
  ComponentProps extends React.ComponentPropsWithRef<React.ElementType> = RadioGroupProps
>(
  props: UseMuiRadioGroupAdapterProps<TFieldValues, TName, TTransformedValue, ComponentProps>,
  ref?: ExtractRef<ComponentProps>
) {
  const {
    control,
    defaultValue,
    disabled,
    disableOnIsSubmitting = false,
    messages,
    name,
    onBlur,
    onChange,
    required,
    rules,
    shouldUnregister,
    style,
    transform,
    ...rest
  } = props;

  const composedRules = useComposeRules<TFieldValues, TName>({
    messages,
    required,
    rules,
  });

  const {
    field,
    fieldState: { error },
    formState: { isSubmitting },
  } = useController({
    control,
    defaultValue,
    disabled,
    name,
    rules: composedRules,
    shouldUnregister,
  });

  const handleRef = useForkRef(field.ref, ref);

  const transformHelpers = React.useMemo(
    () => ({
      input(value: PathValue<TFieldValues, TName>): TTransformedValue {
        return value;
      },
      output(
        _event: React.ChangeEvent<HTMLInputElement>,
        value: string
      ): PathValue<TFieldValues, TName> {
        return value as PathValue<TFieldValues, TName>;
      },
    }),
    []
  );

  const transformed = useTransform<TFieldValues, TName, TTransformedValue>({
    onChange: field.onChange,
    transform: {
      input: typeof transform?.input === 'function' ? transform.input : transformHelpers.input,
      output: typeof transform?.output === 'function' ? transform.output : transformHelpers.output,
    },
    value: field.value,
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

  const composedStyle = useComposeStyle({
    modifierState,
    style,
  });

  const adapter = {
    ...rest,
    disabled: modifierState.disabled,
    name: field.name,
    onBlur: handleBlur,
    onChange: handleChange,
    ref: handleRef,
    required,
    style: composedStyle,
    value: transformed.value,
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  if (typeof adapter.defaultChecked !== 'undefined') {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    delete adapter.defaultChecked;
  }

  return adapter;
}
