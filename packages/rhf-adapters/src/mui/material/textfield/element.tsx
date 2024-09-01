import * as React from 'react';
import { TextField, type TextFieldProps } from '@mui/material';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import { useMuiTextFieldAdapter, type UseMuiTextFieldAdapterProps } from './adapter';

export interface MuiTextFieldElementProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValue = unknown
> extends UseMuiTextFieldAdapterProps<TFieldValues, TName, TTransformedValue> {}

function MuiTextFieldComponent<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValue = unknown
>(
  props: MuiTextFieldElementProps<TFieldValues, TName, TTransformedValue>,
  ref?: TextFieldProps['ref']
): React.ReactElement {
  const adapter = useMuiTextFieldAdapter<TFieldValues, TName, TTransformedValue>(props, ref);

  return <TextField {...adapter} />;
}

export const MuiTextFieldElement = React.forwardRef(MuiTextFieldComponent);

MuiTextFieldElement.displayName = 'MuiTextFieldElement';
