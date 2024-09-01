import * as React from 'react';
import { type RatingProps } from '@mui/material';
import {
  type ComposeRulesMessages,
  useComposeModiferState,
  type UseComposeModifierStateResult,
  useComposeRules,
  useComposeStyle,
  useTransform,
} from '@piplup/rhf-core';
import { execSequentially, type ExtractRef, useForkRef } from '@piplup/utils';
import {
  type PathValue,
  useController,
  type FieldPath,
  type FieldValues,
  type UseControllerProps,
} from 'react-hook-form';

type TransformedValue = null | number | undefined;

interface MuiRatingBaseProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValue extends TransformedValue = TransformedValue
> extends UseControllerProps<TFieldValues, TName> {
  disableOnIsSubmitting?: boolean;
  max?: number;
  messages?: ComposeRulesMessages;
  onBlur?: (
    // User needs to write their own types for the rest parameters here.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...args: any[]
  ) => void;
  onChange?: (
    // User needs to write their own types for the rest parameters.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...args: any[]
  ) => void;
  required?: boolean;
  style?:
    | ((modifierState: UseComposeModifierStateResult) => React.CSSProperties)
    | React.CSSProperties;
  transform?: {
    input?: (value: PathValue<TFieldValues, TName>) => TTransformedValue;
    output?: (
      // User needs to write their own types for the rest parameters.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...args: any[]
    ) => PathValue<TFieldValues, TName>;
  };
}

export type UseMuiRatingAdapterProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValue extends TransformedValue = TransformedValue,
  ComponentProps extends React.ComponentPropsWithRef<React.ElementType> = RatingProps
> = MuiRatingBaseProps<TFieldValues, TName, TTransformedValue> &
  Omit<ComponentProps, 'defaultValue' | 'value'>;

export function useMuiRatingAdapter<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValue extends TransformedValue = TransformedValue,
  ComponentProps extends React.ComponentPropsWithRef<React.ElementType> = RatingProps
>(
  props: UseMuiRatingAdapterProps<TFieldValues, TName, TTransformedValue, ComponentProps>,
  ref?: ExtractRef<ComponentProps>
) {
  const {
    control,
    defaultValue,
    disabled,
    disableOnIsSubmitting = false,
    max,
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
    max,
    messages,
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
        return value;
      },
      output(
        _event: React.ChangeEvent<HTMLInputElement>,
        value: TTransformedValue
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
