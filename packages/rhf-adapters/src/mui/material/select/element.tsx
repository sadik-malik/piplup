import * as React from 'react';
import { Select, type SelectProps } from '@mui/material';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import { useMuiSelectAdapter, type UseMuiSelectAdapterProps } from './adapter';

export interface MuiSelectElementProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValue = unknown
> extends UseMuiSelectAdapterProps<TFieldValues, TName, TTransformedValue> {}

function MuiSelectComponent<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValue = unknown
>(props: MuiSelectElementProps<TFieldValues, TName, TTransformedValue>, ref?: SelectProps['ref']) {
  const adapter = useMuiSelectAdapter<TFieldValues, TName, TTransformedValue>(props, ref);
  return <Select {...adapter} />;
}

export const MuiSelectElement = React.forwardRef(MuiSelectComponent);

MuiSelectElement.displayName = 'MuiSelectElement';
