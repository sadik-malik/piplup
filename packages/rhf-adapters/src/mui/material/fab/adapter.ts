import type * as React from 'react';
import { useHtmlButtonAdapter, type UseHtmlButtonAdapterProps } from '@piplup/rhf-core';
import { type FieldValues } from 'react-hook-form';

export type UseMuiFabAdapterProps<TFieldValues extends FieldValues = FieldValues> =
  UseHtmlButtonAdapterProps<TFieldValues>;

export function useMuiFabAdapter<TFieldValues extends FieldValues = FieldValues, RefType = unknown>(
  props: UseMuiFabAdapterProps<TFieldValues>,
  ref?: React.Ref<RefType>
) {
  const adapter = useHtmlButtonAdapter<TFieldValues, RefType>(props, ref);
  return {
    ...adapter,
    classes: props.classes,
  };
}
