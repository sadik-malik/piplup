import * as React from 'react';
import { FormHelperText, FormHelperTextProps } from '@mui/material';
import { FieldPath, FieldValues } from 'react-hook-form';
import { useMuiFormHelperTextAdapter, UseMuiFormHelperTextProps } from './adapter';

export interface MuiFormHelperTextElementProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends UseMuiFormHelperTextProps<TFieldValues, TName> {}

function MuiFormHelperTextComponent<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: MuiFormHelperTextElementProps<TFieldValues, TName>, ref?: FormHelperTextProps['ref']) {
  const adapter = useMuiFormHelperTextAdapter<TFieldValues, TName>(props, ref);
  return <FormHelperText {...adapter} />;
}

export const MuiFormHelperTextElement = React.forwardRef(MuiFormHelperTextComponent);

MuiFormHelperTextElement.displayName = 'MuiFormHelperTextElement';
