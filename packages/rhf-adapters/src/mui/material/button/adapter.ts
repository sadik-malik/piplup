import type * as React from 'react';
import { useHtmlButtonAdapter, type UseHtmlButtonAdapterProps } from '@piplup/rhf-core/html';
import { type FieldValues } from 'react-hook-form';

export interface UseMuiButtonAdapterProps<TFieldValues extends FieldValues = FieldValues>
  extends UseHtmlButtonAdapterProps<TFieldValues> {}

export function useMuiButtonAdapter<
  TFieldValues extends FieldValues = FieldValues,
  RefType = unknown
>(props: UseMuiButtonAdapterProps<TFieldValues>, ref?: React.Ref<RefType>) {
  const adapter = useHtmlButtonAdapter<TFieldValues, RefType>(props, ref);
  return {
    ...adapter,
    classes: props.classes,
  };
}
