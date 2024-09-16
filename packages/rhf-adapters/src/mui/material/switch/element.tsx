import * as React from 'react';
import { Switch, type SwitchProps } from '@mui/material';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import { type UseMuiSwitchAdapterProps, useMuiSwitchAdapter } from './adapter';

export interface MuiSwitchElementProps<
  TTransformedValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<SwitchProps, 'defaultChecked' | 'defaultValue' | 'name' | 'style' | 'value'>,
    Omit<
      UseMuiSwitchAdapterProps<TTransformedValue, TFieldValues, TName>,
      | 'classes'
      | 'composeClassName'
      | 'composeHelperText'
      | 'errorParser'
      | 'helperText'
      | 'internalClasses'
      | 'onBlur'
      | 'onChange'
    > {}

function MuiSwitchComponent<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValue extends boolean = boolean
>(
  props: MuiSwitchElementProps<TTransformedValue, TFieldValues, TName>,
  ref?: SwitchProps['ref']
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

  const { helperText: _helperText, ...adapter } = useMuiSwitchAdapter(
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

  return <Switch aria-disabled={adapter.disabled} {...rest} {...adapter} />;
}

export const MuiSwitchElement = React.forwardRef(
  MuiSwitchComponent
) as typeof MuiSwitchComponent & { displayName?: string };

MuiSwitchElement.displayName = 'MuiSwitchElement';
