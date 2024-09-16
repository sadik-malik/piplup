import type * as React from 'react';
import { type FieldValues } from 'react-hook-form';
import {
  type UseFormStateAdapterProps,
  useFormStateAdapter,
} from '../../hooks/use-form-state-adapter';

export interface UseHtmlFormHelperTextProps<TFieldValues extends FieldValues = FieldValues>
  extends UseFormStateAdapterProps<TFieldValues> {}

export function useHtmlFormHelperTextAdapter<
  TFieldValues extends FieldValues = FieldValues,
  RefType = unknown
>(props: UseHtmlFormHelperTextProps<TFieldValues>, ref?: React.Ref<RefType>) {
  const { helperText, ...rest } = useFormStateAdapter(props, ref);

  return {
    ...rest,
    children: helperText,
  };
}
