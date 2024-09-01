import { type ExtractRef } from '@piplup/utils';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import { useHtmlInputAdapter, type UseHtmlInputAdapterProps } from '../input';

type TransformedValue = number | readonly string[] | string | undefined;

export type UseHtmlTextareaAdapterProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValue = TransformedValue,
  ComponentProps extends React.ComponentPropsWithRef<React.ElementType> = React.ComponentPropsWithRef<'textarea'>
> = UseHtmlInputAdapterProps<TFieldValues, TName, TTransformedValue, ComponentProps> & {
  checked?: never;
  indeterminate?: never;
  type?: never;
};

export function useHtmlTextareaAdapter<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValue = TransformedValue,
  ComponentProps extends React.ComponentPropsWithRef<React.ElementType> = React.ComponentPropsWithRef<'textarea'>
>(
  props: UseHtmlTextareaAdapterProps<TFieldValues, TName, TTransformedValue, ComponentProps>,
  ref?: ExtractRef<ComponentProps>
) {
  return useHtmlInputAdapter<TFieldValues, TName, TTransformedValue, ComponentProps>(
    {
      ...props,
      checked: undefined,
      indeterminate: undefined,
      type: 'text',
    },
    ref
  );
}
