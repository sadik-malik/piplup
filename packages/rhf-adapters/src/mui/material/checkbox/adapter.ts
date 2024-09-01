import { type CheckboxProps } from '@mui/material';
import { useHtmlInputAdapter, type UseHtmlInputAdapterProps } from '@piplup/rhf-core/html';
import { type ExtractRef } from '@piplup/utils';
import { type PathValue, type FieldPath, type FieldValues } from 'react-hook-form';

export type UseMuiCheckboxAdapterProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValue = unknown,
  ComponentProps extends React.ComponentPropsWithRef<React.ElementType> = CheckboxProps
> = UseHtmlInputAdapterProps<TFieldValues, TName, TTransformedValue, ComponentProps> & {
  transform?: {
    input?: (value: PathValue<TFieldValues, TName>) => TTransformedValue;
    output?: (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...args: any[]
    ) => PathValue<TFieldValues, TName>;
  };
  type?: never;
  value?: TTransformedValue;
};

export function useMuiCheckboxAdapter<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValue = unknown,
  ComponentProps extends React.ComponentPropsWithRef<React.ElementType> = CheckboxProps
>(
  props: UseMuiCheckboxAdapterProps<TFieldValues, TName, TTransformedValue, ComponentProps>,
  ref?: ExtractRef<ComponentProps>
) {
  return useHtmlInputAdapter<TFieldValues, TName, TTransformedValue, ComponentProps>(
    {
      ...props,
      type: 'checkbox',
    },
    ref
  );
}
