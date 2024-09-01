import * as React from 'react';
import { Button, type ButtonProps } from '@mui/material';
import { type FieldValues } from 'react-hook-form';
import { useMuiButtonAdapter, type UseMuiButtonAdapterProps } from './adapter';

export interface MuiButtonElementProps<TFieldValues extends FieldValues = FieldValues>
  extends UseMuiButtonAdapterProps<TFieldValues, ButtonProps> {}

function MuiButtonComponent<TFieldValues extends FieldValues = FieldValues>(
  props: MuiButtonElementProps<TFieldValues>,
  ref?: ButtonProps['ref']
) {
  const adapter = useMuiButtonAdapter<TFieldValues, ButtonProps>(props, ref);
  return <Button {...adapter} />;
}

export const MuiButtonElement = React.forwardRef(MuiButtonComponent);

MuiButtonElement.displayName = 'MuiButtonElement';
