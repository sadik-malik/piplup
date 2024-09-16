import type * as React from 'react';
import { useHtmlInputAdapter, type UseHtmlInputAdapterProps } from '@piplup/rhf-core';
import { type FieldPath, type FieldValues } from 'react-hook-form';

export type UseMuiInputAdapterProps<
  TTransformedValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = UseHtmlInputAdapterProps<TTransformedValue, TFieldValues, TName>;

export function useMuiInputAdapterProps<
  TTransformedValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  RefType = unknown
>(
  props: UseMuiInputAdapterProps<TTransformedValue, TFieldValues, TName>,
  ref?: React.Ref<RefType>
) {
  const adapter = useHtmlInputAdapter<TTransformedValue, TFieldValues, TName, RefType>(props, ref);
  return {
    ...adapter,
    classes: props.classes,
  };
}
