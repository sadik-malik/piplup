import * as React from 'react';
import { FormHelperText, type FormHelperTextProps } from '@mui/material';
import { type FieldValues } from 'react-hook-form';
import { useMuiFormHelperTextAdapter, type UseMuiFormHelperTextProps } from './adapter';

export interface MuiFormHelperTextElementProps<TFieldValues extends FieldValues = FieldValues>
  extends Omit<FormHelperTextProps, 'style'>,
    Omit<
      UseMuiFormHelperTextProps<TFieldValues>,
      'classes' | 'composeClassName' | 'composeHelperText' | 'internalClasses'
    > {}

function MuiFormHelperTextComponent<TFieldValues extends FieldValues = FieldValues>(
  props: MuiFormHelperTextElementProps<TFieldValues>,
  ref?: FormHelperTextProps['ref']
) {
  const {
    classes,
    className,
    control,
    disabled,
    disableOnError,
    disableOnIsSubmitting,
    error,
    errorParser,
    exact,
    helperText,
    name,
    style,
    ...rest
  } = props;

  const adapter = useMuiFormHelperTextAdapter(
    {
      classes,
      className,
      composeClassName: false,
      composeHelperText: true,
      control,
      disabled,
      disableOnError,
      disableOnIsSubmitting,
      error,
      errorParser,
      exact,
      helperText,
      name,
      style,
    },
    ref
  );

  return <FormHelperText aria-disabled={adapter.disabled} {...rest} {...adapter} />;
}

export const MuiFormHelperTextElement = React.forwardRef(
  MuiFormHelperTextComponent
) as typeof MuiFormHelperTextComponent & { displayName?: string };

MuiFormHelperTextElement.displayName = 'MuiFormHelperTextElement';
