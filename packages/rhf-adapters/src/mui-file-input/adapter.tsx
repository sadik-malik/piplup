import * as React from 'react';
import { useControllerAdapter, type UseControllerAdapterProps } from '@piplup/rhf-core';
import { type PathValue, type FieldPath, type FieldValues } from 'react-hook-form';

export interface UseMuiFileInputAdapterProps<
  TTransformedValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<UseControllerAdapterProps<TTransformedValue, TFieldValues, TName>, 'title'> {
  multiple?: boolean;
}

export function useMuiFieldInputAdapter<
  TTransformedValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  RefType = unknown,
>(
  props: UseMuiFileInputAdapterProps<TTransformedValue, TFieldValues, TName>,
  ref?: React.Ref<RefType>,
) {
  const { multiple, transform, ...rest } = props;

  const internalTransform = React.useMemo<
    UseControllerAdapterProps<TTransformedValue, TFieldValues, TName>['transform']
  >(
    () => ({
      input(fileOrFiles) {
        if (multiple) {
          return (Array.isArray(fileOrFiles) ? fileOrFiles : []) as TTransformedValue;
        }
        return (fileOrFiles ?? null) as TTransformedValue;
      },
      output(fileOrFiles) {
        return fileOrFiles as PathValue<TFieldValues, TName>;
      },
    }),
    [multiple],
  );

  const { title: _title, ...adapter } = useControllerAdapter<
    TTransformedValue,
    TFieldValues,
    TName,
    RefType
  >(
    {
      ...rest,
      classes: undefined,
      composeClassName: false,
      composeHelperText: true,
      internalClasses: undefined,
      max: undefined,
      maxLength: undefined,
      min: undefined,
      minLength: undefined,
      pattern: undefined,
      title: undefined,
      transform: {
        ...internalTransform,
        ...transform,
      },
    },
    ref,
  );
  return {
    ...adapter,
    multiple,
  };
}
