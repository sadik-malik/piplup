import { useFieldStateAdapter, type UseFieldStateAdapterProps } from '@piplup/rhf-core';
import { type FieldPath, type FieldValues } from 'react-hook-form';

export interface UseMuiFormControlAdapterProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends UseFieldStateAdapterProps<TFieldValues, TName> {}

export function useMuiFormControlAdapter<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  RefType = unknown
>(props: UseMuiFormControlAdapterProps<TFieldValues, TName>, ref?: React.Ref<RefType>) {
  const adapter = useFieldStateAdapter(props, ref);
  return {
    ...adapter,
    classes: props.classes,
  };
}
