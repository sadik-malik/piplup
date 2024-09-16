import * as React from 'react';
import { Checkbox, type CheckboxProps } from '@mui/material';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import { useMuiCheckboxAdapter, type UseMuiCheckboxAdapterProps } from './adapter';

export interface MuiCheckboxElementProps<
  TTransformedValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<
      CheckboxProps,
      'checked' | 'defaultValue' | 'indeterminate' | 'name' | 'style' | 'value'
    >,
    Omit<
      UseMuiCheckboxAdapterProps<TTransformedValue, TFieldValues, TName>,
      | 'classes'
      | 'composeClassName'
      | 'composeHelperText'
      | 'errorParser'
      | 'helperText'
      | 'internalClasses'
      | 'onBlur'
      | 'onChange'
    > {}

function MuiCheckboxComponent<
  TTransformedValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: MuiCheckboxElementProps<TTransformedValue, TFieldValues, TName>,
  ref?: CheckboxProps['ref']
): React.ReactElement {
  const {
    checked,
    classes,
    className,
    control,
    defaultValue,
    disabled,
    disableOnError,
    disableOnIsSubmitting,
    error,
    indeterminate,
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
    value,
    ...rest
  } = props;

  const { helperText: _helperText, ...adapter } = useMuiCheckboxAdapter<
    TTransformedValue,
    TFieldValues,
    TName
  >(
    {
      checked,
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
      indeterminate,
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
      value,
    },
    ref
  );

  return <Checkbox aria-disabled={adapter.disabled} {...rest} {...adapter} />;
}

export const MuiCheckboxElement = React.forwardRef(
  MuiCheckboxComponent
) as typeof MuiCheckboxComponent & { displayName?: string };

MuiCheckboxElement.displayName = 'MuiCheckboxElement';
