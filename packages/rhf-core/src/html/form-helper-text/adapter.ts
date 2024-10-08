import type * as React from 'react';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import {
  useFieldStateAdapter,
  type UseFieldStateAdapterProps,
} from '../../hooks/use-field-state-adapter';

export interface UseHtmlFormHelperTextProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<UseFieldStateAdapterProps<TFieldValues, TName>, 'helperText'> {
  children?: React.ReactNode;
}

export function useHtmlFormHelperTextAdapter<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  RefType = unknown
>(props: UseHtmlFormHelperTextProps<TFieldValues, TName>, ref?: React.Ref<RefType>) {
  const { children, ...rest } = props;

  const { helperText, ...adapter } = useFieldStateAdapter<TFieldValues, TName, RefType>(
    {
      ...rest,
      helperText: children,
    },
    ref
  );

  return {
    ...adapter,
    children: helperText,
  };
}
