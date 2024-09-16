import type * as React from 'react';
import { useHtmlInputAdapter, type UseHtmlInputAdapterProps } from '@piplup/rhf-core';
import { type FieldPath, type FieldValues } from 'react-hook-form';

export type UseMuiRadioAdapterProps<
  TTransformedValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Omit<UseHtmlInputAdapterProps<TTransformedValue, TFieldValues, TName>, 'type'>;

export function useMuiRadioAdapter<
  TTransformedValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  RefType = unknown
>(
  props: UseMuiRadioAdapterProps<TTransformedValue, TFieldValues, TName>,
  ref?: React.Ref<RefType>
) {
  const {
    src: _src,
    title: _title,
    type: _type,
    ...adapter
  } = useHtmlInputAdapter<TTransformedValue, TFieldValues, TName, RefType>(
    {
      ...props,
      type: 'radio',
    },
    ref
  );

  return adapter;
}
