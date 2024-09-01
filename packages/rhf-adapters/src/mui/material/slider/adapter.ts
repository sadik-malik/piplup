import * as React from 'react';
import { type SliderProps } from '@mui/material';
import {
  type StandardFieldAdapterProps,
  useComposeModiferState,
  useComposeRules,
  useComposeStyle,
  useTransform,
} from '@piplup/rhf-core';
import { execSequentially, type ExtractRef, useForkRef } from '@piplup/utils';
import { type FieldValues, type FieldPath, type PathValue, useController } from 'react-hook-form';

interface MuiSliderBaseProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValue = unknown
> extends StandardFieldAdapterProps<TFieldValues, TName, TTransformedValue> {
  max?: number;
  min?: number;
}

export type UseMuiSliderAdapterProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValue = unknown,
  ComponentProps extends React.ComponentPropsWithRef<React.ElementType> = SliderProps
> = MuiSliderBaseProps<TFieldValues, TName, TTransformedValue> &
  Omit<ComponentProps, 'defaultValue' | 'value'>;

export function useMuiSliderAdapter<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValue = unknown,
  ComponentProps extends React.ComponentPropsWithRef<React.ElementType> = SliderProps
>(
  props: UseMuiSliderAdapterProps<TFieldValues, TName, TTransformedValue, ComponentProps>,
  ref?: ExtractRef<ComponentProps>
) {
  const {
    control,
    defaultValue,
    disabled,
    disableOnIsSubmitting = false,
    max = 100, // Keep this same as default value in [mui](https://mui.com/material-ui/api/slider/#slider-prop-max)
    messages,
    min = 0, // Keep this same as default value in [mui](https://mui.com/material-ui/api/slider/#slider-prop-min)
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
    max,
    messages,
    min,
    required,
    rules,
    type: 'range',
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
        return (typeof value !== 'undefined' ? value : defaultValue ?? min) as TTransformedValue;
      },
      output(
        _event: React.ChangeEvent<HTMLInputElement>,
        value: TTransformedValue
      ): PathValue<TFieldValues, TName> {
        return value as PathValue<TFieldValues, TName>;
      },
    }),
    [defaultValue, min]
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
    max,
    name: field.name,
    onBlur: handleBlur,
    onChange: handleChange,
    ref: handleRef,
    required,
    style: composedStyle,
    value: transformed.value,
  };

  return adapter;
}
