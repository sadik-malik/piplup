import { useHtmlFormLabelAdapter, type UseHtmlFormLabelProps } from '@piplup/rhf-core/html';
import { type FieldPath, type FieldValues } from 'react-hook-form';

export interface UseMuiInputLabelAdapterProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends UseHtmlFormLabelProps<TFieldValues, TName> {}

export function useMuiInputLabelAdapter<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  RefType = unknown
>(props: UseMuiInputLabelAdapterProps<TFieldValues, TName>, ref?: React.Ref<RefType>) {
  const adapter = useHtmlFormLabelAdapter(props, ref);
  return {
    ...adapter,
    classes: props.classes,
  };
}
