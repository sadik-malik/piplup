import * as React from 'react';
import { useControllerAdapter, type UseControllerAdapterProps } from '@piplup/rhf-core';
import { type PathValue, type FieldPath, type FieldValues } from 'react-hook-form';

export interface UseMuiTelInputAdapterProps<
  TTransformedValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<
    UseControllerAdapterProps<TTransformedValue, TFieldValues, TName>,
    'classes' | 'composeClassName' | 'internalClasses'
  > {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  inputRef?: React.Ref<any>;
}

export function useMuiTelInputAdapter<
  TTransformedValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  RefType = unknown,
>(
  props: UseMuiTelInputAdapterProps<TTransformedValue, TFieldValues, TName>,
  ref?: React.Ref<RefType>,
) {
  const { inputRef, transform, ...rest } = props;

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

  const { ref: adapterRef, ...adapter } = useControllerAdapter<
    TTransformedValue,
    TFieldValues,
    TName
  >(
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
    inputRef,
  );
  return {
    ...adapter,
    inputRef: adapterRef,
    ref,
  };
}