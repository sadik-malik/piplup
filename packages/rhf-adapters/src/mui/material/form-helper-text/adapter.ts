import type * as React from 'react';
import { useHtmlFormHelperTextAdapter, type UseHtmlFormHelperTextProps } from '@piplup/rhf-core';
import { type FieldValues } from 'react-hook-form';

export type UseMuiFormHelperTextProps<TFieldValues extends FieldValues = FieldValues> =
  UseHtmlFormHelperTextProps<TFieldValues>;

export function useMuiFormHelperTextAdapter<
  TFieldValues extends FieldValues = FieldValues,
  RefType = unknown
>(props: UseHtmlFormHelperTextProps<TFieldValues>, ref?: React.Ref<RefType>) {
  const adapter = useHtmlFormHelperTextAdapter<TFieldValues, RefType>(props, ref);

  return {
    ...adapter,
    classes: props.classes,
  };
}
