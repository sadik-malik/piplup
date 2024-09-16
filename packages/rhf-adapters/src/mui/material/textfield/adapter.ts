import type * as React from 'react';
import { useHtmlInputAdapter, type UseHtmlInputAdapterProps } from '@piplup/rhf-core';
import { type FieldPath, type FieldValues } from 'react-hook-form';

export interface UseMuiTextFieldAdapterProps<
  TTransformedValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<
    UseHtmlInputAdapterProps<TTransformedValue, TFieldValues, TName>,
    'internalClasses'
  > {}

export function useMuiTextFieldAdapter<
  TTransformedValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  RefType = unknown
>(
  props: UseMuiTextFieldAdapterProps<TTransformedValue, TFieldValues, TName>,
  ref?: React.Ref<RefType>
) {
  const adapter = useHtmlInputAdapter<TTransformedValue, TFieldValues, TName, RefType>(props, ref);
  return {
    ...adapter,
    classes: props.classes,
  };
}
