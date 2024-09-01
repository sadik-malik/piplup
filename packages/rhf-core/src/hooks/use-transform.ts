import * as React from 'react';
import { useEventCallback } from '@piplup/utils';
import { type FieldPath, type FieldValues, type PathValue, type UseControllerReturn } from 'react-hook-form';

export type UseTransformProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValue = unknown
> = {
  onChange: UseControllerReturn<TFieldValues, TName>['field']['onChange'];
  transform?: {
    input?: (value: PathValue<TFieldValues, TName>) => TTransformedValue;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    output?: (...args: any[]) => PathValue<TFieldValues, TName>;
  };
  value: UseControllerReturn<TFieldValues, TName>['field']['value'];
};

export type UseTransformReturn<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValue = unknown
> = {
  onChange: UseControllerReturn<TFieldValues, TName>['field']['onChange'];
  value: TTransformedValue;
};

export function useTransform<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValue = unknown
>(
  props: UseTransformProps<TFieldValues, TName, TTransformedValue>
): UseTransformReturn<TFieldValues, TName, TTransformedValue> {
  const value = React.useMemo(() => {
    const input = props.transform?.input;
    return typeof input === 'function' ? input(props.value) : props.value;
  }, [props.transform?.input, props.value]);

  const onChange = useEventCallback(
    (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...args: any[]
    ) => {
      const output = props.transform?.output;
      const onChange = props.onChange;
      return typeof output === 'function'
        ? onChange(output(...args, value))
        : onChange(...args, value);
    }
  );

  return {
    onChange,
    value,
  };
}
