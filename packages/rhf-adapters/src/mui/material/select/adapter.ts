import * as React from 'react';
import { type SelectProps } from '@mui/material';
import { useHtmlInputAdapter, type UseHtmlInputAdapterProps } from '@piplup/rhf-core/html';
import { type ExtractRef } from '@piplup/utils';
import { type PathValue, type FieldPath, type FieldValues } from 'react-hook-form';

export type UseMuiSelectAdapterProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValue = unknown,
  ComponentProps extends React.ComponentPropsWithRef<React.ElementType> = SelectProps
> = UseHtmlInputAdapterProps<TFieldValues, TName, TTransformedValue, ComponentProps> & {
  checked?: never;
  classes?: 'classes' extends keyof ComponentProps ? ComponentProps['classes'] : never;
  indeterminate?: never;
  multiple?: boolean;
  src?: never;
  type?: never;
};

export function useMuiSelectAdapter<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValue = unknown,
  ComponentProps extends React.ComponentPropsWithRef<React.ElementType> = SelectProps
>(
  props: UseMuiSelectAdapterProps<TFieldValues, TName, TTransformedValue, ComponentProps>,
  ref?: ExtractRef<ComponentProps>
) {
  const { multiple } = props;
  const transformHelpers = React.useMemo(
    () => ({
      input(value: PathValue<TFieldValues, TName>): TTransformedValue {
        if (multiple) {
          return (Array.isArray(value) ? value : []) as TTransformedValue;
        }
        return value;
      },
      output(event: React.ChangeEvent<HTMLInputElement>): PathValue<TFieldValues, TName> {
        return event.target.value as PathValue<TFieldValues, TName>;
      },
    }),
    [multiple]
  );
  const adapter = useHtmlInputAdapter<TFieldValues, TName, TTransformedValue, ComponentProps>(
    {
      ...props,
      transform: {
        ...transformHelpers,
        ...props.transform,
      },
    },
    ref
  );
  return adapter;
}
