import * as React from 'react';
import { Checkbox, type CheckboxProps } from '@mui/material';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import { useMuiCheckboxAdapter, type UseMuiCheckboxAdapterProps } from './adapter';

export interface MuiCheckboxElementProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValue = unknown
> extends UseMuiCheckboxAdapterProps<TFieldValues, TName, TTransformedValue, CheckboxProps> {}

function MuiCheckboxComponent<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValue = unknown
>(
  props: MuiCheckboxElementProps<TFieldValues, TName, TTransformedValue>,
  ref?: CheckboxProps['ref']
): React.ReactElement {
  const adapter = useMuiCheckboxAdapter<TFieldValues, TName, TTransformedValue, CheckboxProps>(
    props,
    ref
  );

  return <Checkbox {...adapter} />;
}

export const MuiCheckboxElement = React.forwardRef(MuiCheckboxComponent);

MuiCheckboxElement.displayName = 'MuiCheckboxElement';
