import type * as React from 'react';
import { useHtmlInputAdapter, type UseHtmlInputAdapterProps } from '@piplup/rhf-core';
import { type FieldPath, type FieldValues } from 'react-hook-form';

export interface UseMuiCheckboxAdapterProps<
  TTransformedValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<UseHtmlInputAdapterProps<TTransformedValue, TFieldValues, TName>, 'type'> {}

export function useMuiCheckboxAdapter<
  TTransformedValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  RefType = unknown
>(
  props: UseMuiCheckboxAdapterProps<TTransformedValue, TFieldValues, TName>,
  ref?: React.Ref<RefType>
) {
  const {
    src: _src,
    type: _type,
    ...adapter
  } = useHtmlInputAdapter<TTransformedValue, TFieldValues, TName, RefType>(
    {
      ...props,
      type: 'checkbox',
    },
    ref
  );

  return {
    ...adapter,
    classes: props.classes,
  };
}
