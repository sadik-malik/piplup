import type * as React from 'react';
import { useHtmlInputAdapter, type UseHtmlInputAdapterProps } from '@piplup/rhf-core/html';
import { type FieldPath, type FieldValues } from 'react-hook-form';

export type UseMuiInputBaseAdapterProps<
  TTransformedValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = UseHtmlInputAdapterProps<TTransformedValue, TFieldValues, TName>;

export function useMuiInputBaseAdapter<
  TTransformedValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  RefType = unknown
>(
  props: UseMuiInputBaseAdapterProps<TTransformedValue, TFieldValues, TName>,
  ref?: React.Ref<RefType>
) {
  const adapter = useHtmlInputAdapter<TTransformedValue, TFieldValues, TName, RefType>(props, ref);
  return {
    ...adapter,
    classes: props.classes,
  };
}
