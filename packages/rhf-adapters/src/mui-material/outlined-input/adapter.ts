import type * as React from 'react';
import { useFormControl } from '@mui/material';
import { useHtmlInputAdapter, type UseHtmlInputAdapterProps } from '@piplup/rhf-core/html';
import { type FieldPath, type FieldValues } from 'react-hook-form';

export type UseMuiOutlinedInputAdapterProps<
  TTransformedValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = UseHtmlInputAdapterProps<TTransformedValue, TFieldValues, TName>;

export function useMuiOutlinedInputAdapter<
  TTransformedValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  RefType = unknown
>(
  props: UseMuiOutlinedInputAdapterProps<TTransformedValue, TFieldValues, TName>,
  ref?: React.Ref<RefType>
) {
  const { disabled: disabledProp, required: requiredProp, ...rest } = props;

  const muiFormControl = useFormControl();

  let required = requiredProp;
  let disabled = disabledProp;

  if (muiFormControl) {
    if (typeof required === 'undefined') {
      required = muiFormControl.required;
    }
    if (typeof disabled === 'undefined') {
      disabled = muiFormControl.disabled;
    }
  }

  const adapter = useHtmlInputAdapter<TTransformedValue, TFieldValues, TName, RefType>(
    {
      ...rest,
      disabled,
      required,
    },
    ref
  );
  return {
    ...adapter,
    classes: props.classes,
  };
}
