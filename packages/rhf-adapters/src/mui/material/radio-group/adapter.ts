import * as React from 'react';
import { useControllerAdapter, type UseControllerAdapterProps } from '@piplup/rhf-core';
import { type FieldPath, type FieldValues, type PathValue } from 'react-hook-form';

export type UseMuiRadioGroupAdapterProps<
  TTransformedValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = UseControllerAdapterProps<TTransformedValue, TFieldValues, TName>;

export function useMuiRadioGroupAdapter<
  TTransformedValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  RefType = unknown
>(
  props: UseMuiRadioGroupAdapterProps<TTransformedValue, TFieldValues, TName>,
  ref?: React.Ref<RefType>
) {
  const { transform } = props;

  const transformHelpers = React.useMemo(
    () => ({
      input(value: PathValue<TFieldValues, TName>): TTransformedValue {
        return value;
      },
      output(
        _event: React.ChangeEvent<HTMLInputElement>,
        value: string
      ): PathValue<TFieldValues, TName> {
        return value as PathValue<TFieldValues, TName>;
      },
    }),
    []
  );

  const { title: _title, ...adapter } = useControllerAdapter<
    TTransformedValue,
    TFieldValues,
    TName,
    RefType
  >(
    {
      ...props,
      transform: {
        ...transformHelpers,
        ...transform,
      },
    },
    ref
  );

  return {
    ...adapter,
    classes: props.classes,
  };
}
