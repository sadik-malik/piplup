import * as React from 'react';
import { type SliderProps, Slider } from '@mui/material';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import { type UseMuiSliderAdapterProps, useMuiSliderAdapter } from './adapter';

export interface MuiSliderElementProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValue extends number | number[] = number | number[]
> extends UseMuiSliderAdapterProps<TFieldValues, TName, TTransformedValue> {}

function MuiSliderComponent<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValue extends number | number[] = number | number[]
>(
  props: MuiSliderElementProps<TFieldValues, TName, TTransformedValue>,
  ref?: SliderProps['ref']
): React.ReactElement {
  const adapter = useMuiSliderAdapter<TFieldValues, TName, TTransformedValue>(props, ref);

  return <Slider {...adapter} />;
}

export const MuiSliderElement = React.forwardRef(MuiSliderComponent);

MuiSliderElement.displayName = 'MuiSliderElement';
