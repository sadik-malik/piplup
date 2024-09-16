import * as React from 'react';
import { useEventCallback } from '@piplup/utils';
import {
  type FieldPath,
  type FieldValues,
  type PathValue,
  type UseControllerReturn,
} from 'react-hook-form';

/**
 * Props for the `useTransform` hook.
 */
export type UseTransformProps<
  TTransformedValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  /**
   * The `onChange` function from the `react-hook-form` controller.
   */
  onChange: UseControllerReturn<TFieldValues, TName>['field']['onChange'];

  /**
   * Optional transformation functions for input and output values.
   */
  transform?: {
    /**
     * A function to transform the input value before returning it.
     *
     * @param value - The current value of the field.
     * @returns The transformed value.
     */
    input?: (value: PathValue<TFieldValues, TName>) => TTransformedValue;

    /**
     * A function to transform the output value before calling `onChange`.
     *
     * @param args - Arguments passed to the output transformation function.
     * @returns The transformed output value.
     */
    output?: (
      // User needs to write their own types for the rest parameters.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...args: any[]
    ) => PathValue<TFieldValues, TName>;
  };

  /**
   * The current value of the field from the `react-hook-form` controller.
   */
  value: UseControllerReturn<TFieldValues, TName>['field']['value'];
};

/**
 * Return type of the `useTransform` hook.
 */
export type UseTransformReturn<
  TTransformedValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  /**
   * The transformed `onChange` function.
   */
  onChange: UseControllerReturn<TFieldValues, TName>['field']['onChange'];

  /**
   * The transformed value.
   */
  value: TTransformedValue;
};

/**
 * A custom hook to transform the `value` and `onChange` handler of a form field.
 *
 * @param props - The props for the hook.
 * @returns An object containing the transformed `onChange` handler and `value`.
 */
export function useTransform<
  TTransformedValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: UseTransformProps<TTransformedValue, TFieldValues, TName>
): UseTransformReturn<TTransformedValue, TFieldValues, TName> {
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
      return typeof output === 'function' ? onChange(output(...args, value)) : onChange(...args);
    }
  );

  return {
    onChange,
    value,
  };
}
