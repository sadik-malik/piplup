import { useHtmlFormLabelAdapter, type UseHtmlFormLabelProps } from '@piplup/rhf-core';
import { type FieldPath, type FieldValues } from 'react-hook-form';

export interface UseMuiFormLabelAdapterProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends UseHtmlFormLabelProps<TFieldValues, TName> {}

export function useMuiFormLabelAdapter<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  RefType = unknown
>(props: UseMuiFormLabelAdapterProps<TFieldValues, TName>, ref?: React.Ref<RefType>) {
  const adapter = useHtmlFormLabelAdapter(props, ref);
  return {
    ...adapter,
    classes: props.classes,
  };
}
