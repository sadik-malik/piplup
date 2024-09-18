import * as React from 'react';
import { RadioGroup, type RadioGroupProps } from '@mui/material';
import { type FieldPath, type FieldValues, type PathValue } from 'react-hook-form';
import { useMuiRadioGroupAdapter, type UseMuiRadioGroupAdapterProps } from './adapter';

export interface MuiRadioGroupElementProps<
  TTransformedValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<RadioGroupProps, 'defaultValue' | 'name' | 'style'>,
    Omit<
      UseMuiRadioGroupAdapterProps<TTransformedValue, TFieldValues, TName>,
      | 'classes'
      | 'composeClassName'
      | 'composeHelperText'
      | 'errorParser'
      | 'helperText'
      | 'internalClasses'
      | 'onBlur'
      | 'onChange'
    > {
  transform?: {
    input?: (value: PathValue<TFieldValues, TName>) => TTransformedValue;
    output?: (
      event: React.ChangeEvent,
      value: string,
      previousValue: TTransformedValue
    ) => PathValue<TFieldValues, TName>;
  };
}

function MuiRadioGroupComponent<
  TTransformedValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: MuiRadioGroupElementProps<TTransformedValue, TFieldValues, TName>,
  ref?: RadioGroupProps['ref']
): React.ReactElement {
  const {
    classes,
    className,
    control,
    defaultValue,
    disabled,
    disableOnError,
    disableOnIsSubmitting,
    error,
    max,
    maxLength,
    messages,
    min,
    minLength,
    name,
    onBlur,
    onChange,
    pattern,
    required,
    rules,
    shouldUnregister,
    style,
    title,
    transform,
    ...rest
  } = props;

  const {
    error: _error,
    helperText: _helperText,
    ...adapter
  } = useMuiRadioGroupAdapter(
    {
      classes,
      className,
      composeClassName: false,
      composeHelperText: false,
      control,
      defaultValue,
      disabled,
      disableOnError,
      disableOnIsSubmitting,
      error,
      max,
      maxLength,
      messages,
      min,
      minLength,
      name,
      onBlur,
      onChange,
      pattern,
      required,
      rules,
      shouldUnregister,
      style,
      title,
      transform,
    },
    ref
  );

  return <RadioGroup {...rest} {...adapter} />;
}

export const MuiRadioGroupElement = React.forwardRef(
  MuiRadioGroupComponent
) as typeof MuiRadioGroupComponent & { displayName?: string };

MuiRadioGroupElement.displayName = 'MuiRadioGroupElement';
