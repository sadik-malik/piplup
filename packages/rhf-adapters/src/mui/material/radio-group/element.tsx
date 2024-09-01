import * as React from 'react';
import { RadioGroup, type RadioGroupProps } from '@mui/material';
import { type FieldPath, type FieldValues, type PathValue } from 'react-hook-form';
import { useMuiRadioGroupAdapter, type UseMuiRadioGroupAdapterProps } from './adapter';

export interface MuiRadioGroupElementProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValue = unknown
> extends UseMuiRadioGroupAdapterProps<TFieldValues, TName, TTransformedValue> {
  transform?: {
    input?: (value: PathValue<TFieldValues, TName>) => TTransformedValue;
    output?: (
      event: React.ChangeEvent,
      value: string,
      previousValue: TTransformedValue
    ) => PathValue<TFieldValues, TName>;
  };
  onChange?: RadioGroupProps['onChange'];
  onBlur?: RadioGroupProps['onBlur'];
}

function MuiRadioGroupComponent<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValue = unknown
>(
  props: MuiRadioGroupElementProps<TFieldValues, TName, TTransformedValue>,
  ref?: RadioGroupProps['ref']
): React.ReactElement {
  const adapter = useMuiRadioGroupAdapter(props, ref);
  return <RadioGroup {...adapter} />;
}

export const MuiRadioGroupElement = React.forwardRef(MuiRadioGroupComponent);

MuiRadioGroupElement.displayName = 'MuiRadioGroupElement';
