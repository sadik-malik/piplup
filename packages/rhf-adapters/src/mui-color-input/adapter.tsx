import * as React from 'react';
import { useControllerAdapter, type UseControllerAdapterProps } from '@piplup/rhf-core';
import { type PathValue, type FieldPath, type FieldValues } from 'react-hook-form';

export interface UseMuiColorInputAdapterProps<
  TTransformedValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<
    UseControllerAdapterProps<TTransformedValue, TFieldValues, TName>,
    'classes' | 'composeClassName' | 'internalClasses'
  > {}

export function useMuiColorInputAdapter<
  TTransformedValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  RefType = unknown,
>(
  props: UseMuiColorInputAdapterProps<TTransformedValue, TFieldValues, TName>,
  ref?: React.Ref<RefType>,
) {
  const { transform, ...rest } = props;

  const internalTransform = React.useMemo<
    UseControllerAdapterProps<TTransformedValue, TFieldValues, TName>['transform']
  >(
    () => ({
      input(value) {
        return value as TTransformedValue;
      },
      output(value) {
        return value as PathValue<TFieldValues, TName>;
      },
    }),
    [],
  );

  const adapter = useControllerAdapter<TTransformedValue, TFieldValues, TName, RefType>(
    {
      ...rest,
      classes: undefined,
      composeClassName: false,
      internalClasses: undefined,
      transform: {
        ...internalTransform,
        ...transform,
      },
    },
    ref,
  );
  return adapter;
}
