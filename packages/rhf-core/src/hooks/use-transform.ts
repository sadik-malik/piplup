import * as React from 'react';
import { FieldPath, FieldValues, PathValue, UseControllerReturn } from 'react-hook-form';

export type UseTransformProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TValue = unknown
> = {
  value: UseControllerReturn<TFieldValues, TName>['field']['value'];
  onChange: UseControllerReturn<TFieldValues, TName>['field']['onChange'];
  transform?: {
    input?: (value: PathValue<TFieldValues, TName>) => TValue;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    output?: (...args: any[]) => PathValue<TFieldValues, TName>;
  };
};

export type UseTransformReturn<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TValue = unknown
> = {
  value: TValue;
  onChange: UseControllerReturn<TFieldValues, TName>['field']['onChange'];
};

export default function useTransform<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TValue = unknown
>(
  props: UseTransformProps<TFieldValues, TName, TValue>
): UseTransformReturn<TFieldValues, TName, TValue> {
  const value = React.useMemo(() => {
    const input = props.transform?.input;
    return typeof input === 'function' ? input(props.value) : props.value;
  }, [props.transform?.input, props.value]);

  const onChange = React.useCallback(
    (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...args: any[]
    ) => {
      const output = props.transform?.output;
      const onChange = props.onChange;
      return typeof output === 'function'
        ? onChange(output(...args, value))
        : onChange(...args, value);
    },
    [props.onChange, props.transform?.output, value]
  );

  return {
    value,
    onChange,
  };
}
