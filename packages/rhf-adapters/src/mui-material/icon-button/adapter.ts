import type * as React from 'react';
import { useHtmlButtonAdapter, type UseHtmlButtonAdapterProps } from '@piplup/rhf-core/html';
import { type FieldValues } from 'react-hook-form';

export interface UseMuiIconButtonAdapterProps<TFieldValues extends FieldValues = FieldValues>
  extends UseHtmlButtonAdapterProps<TFieldValues> {}

export function useMuiIconButtonAdapter<
  TFieldValues extends FieldValues = FieldValues,
  RefType = unknown
>(props: UseMuiIconButtonAdapterProps<TFieldValues>, ref?: React.Ref<RefType>) {
  const adapter = useHtmlButtonAdapter<TFieldValues, RefType>(props, ref);
  return {
    ...adapter,
    classes: props.classes,
  };
}
