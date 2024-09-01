import * as React from 'react';
import { Radio, type RadioProps } from '@mui/material';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import { useMuiRadioAdapter, type UseMuiRadioAdapterProps } from './adapter';

export interface MuiRadioElementProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends UseMuiRadioAdapterProps<TFieldValues, TName> {}

function MuiRadioComponent<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: MuiRadioElementProps<TFieldValues, TName>, ref?: RadioProps['ref']): React.ReactElement {
  const adapter = useMuiRadioAdapter<TFieldValues, TName>(props, ref);

  return <Radio {...adapter} />;
}

export const MuiRadioElement = React.forwardRef(MuiRadioComponent);

MuiRadioElement.displayName = 'MuiRadioElement';
