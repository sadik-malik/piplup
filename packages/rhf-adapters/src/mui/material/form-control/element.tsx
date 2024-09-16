import * as React from 'react';
import { FormControl, type FormControlProps } from '@mui/material';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import { useMuiFormControlAdapter, type UseMuiFormControlAdapterProps } from './adapter';

export interface MuiFormControlElementProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<FormControlProps, 'name' | 'style'>,
    Omit<
      UseMuiFormControlAdapterProps<TFieldValues, TName>,
      | 'classes'
      | 'composeClassName'
      | 'composeHelperText'
      | 'errorParser'
      | 'helperText'
      | 'internalClasses'
    > {}

function MuiFormControlComponent<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: MuiFormControlElementProps<TFieldValues, TName>,
  ref?: FormControlProps['ref']
): React.ReactElement {
  const {
    classes,
    className,
    control,
    disabled,
    disableOnError,
    disableOnIsSubmitting,
    error,
    name,
    style,
    ...rest
  } = props;

  const { helperText: _helperText, ...adapter } = useMuiFormControlAdapter(
    {
      classes,
      className,
      composeClassName: false,
      composeHelperText: false,
      control,
      disabled,
      disableOnError,
      disableOnIsSubmitting,
      error,
      name,
      style,
    },
    ref
  );

  return <FormControl aria-disabled={adapter.disabled} {...rest} {...adapter} />;
}

export const MuiFormControlElement = React.forwardRef(
  MuiFormControlComponent
) as typeof MuiFormControlComponent & { displayName?: string };

MuiFormControlElement.displayName = 'MuiFormControlElement';
