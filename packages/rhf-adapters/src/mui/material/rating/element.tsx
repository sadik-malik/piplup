import * as React from 'react';
import { Rating, type RatingProps } from '@mui/material';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import { useMuiRatingAdapter, type UseMuiRatingAdapterProps } from './adapter';

type TransformedValue = number | null | undefined;

export interface MuiRatingElementProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValue extends TransformedValue = TransformedValue
> extends UseMuiRatingAdapterProps<TFieldValues, TName, TTransformedValue, RatingProps> {}

function MuiRatingComponent<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValue extends TransformedValue = TransformedValue
>(
  props: MuiRatingElementProps<TFieldValues, TName, TTransformedValue>,
  ref?: RatingProps['ref']
): React.ReactElement {
  const adapter = useMuiRatingAdapter(props, ref);
  return <Rating {...adapter} />;
}

export const MuiRatingElement = React.forwardRef(MuiRatingComponent);

MuiRatingElement.displayName = 'MuiRatingElement';
