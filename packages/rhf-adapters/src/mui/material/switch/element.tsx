import * as React from 'react';
import { Switch, type SwitchProps } from '@mui/material';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import { type UseMuiSwitchAdapterProps, useMuiSwitchAdapter } from './adapter';

export interface MuiSwitchElementProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValue extends boolean = boolean
> extends UseMuiSwitchAdapterProps<TFieldValues, TName, TTransformedValue> {}

function MuiSwitchComponent<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValue extends boolean = boolean
>(
  props: MuiSwitchElementProps<TFieldValues, TName, TTransformedValue>,
  ref?: SwitchProps['ref']
): React.ReactElement {
  const adapter = useMuiSwitchAdapter<TFieldValues, TName, TTransformedValue>(props, ref);

  return <Switch {...adapter} />;
}

export const MuiSwitchElement = React.forwardRef(MuiSwitchComponent);

MuiSwitchElement.displayName = 'MuiSwitchElement';
