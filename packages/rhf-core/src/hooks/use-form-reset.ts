import * as React from 'react';
import { Control, FieldValues, UseFormReset, useFormContext } from 'react-hook-form';

export type UseFormResetProps<TFieldValues extends FieldValues = FieldValues> = {
  control?: Control<TFieldValues>;
};

export type UseFormResetResult<TFieldValues extends FieldValues = FieldValues> =
  UseFormReset<TFieldValues>;

export default function useFormReset<TFieldValues extends FieldValues = FieldValues>(
  props: UseFormResetProps<TFieldValues>
): UseFormResetResult<TFieldValues> {
  const methods = useFormContext<TFieldValues>();

  const { control = methods.control } = props;

  const reset: UseFormReset<TFieldValues> = React.useCallback(
    (formValues, keepStateOptions) => {
      const _reset = control._reset;
      _reset(
        typeof formValues === 'function'
          ? (formValues as (values: TFieldValues) => TFieldValues)(
              control._formValues as TFieldValues
            )
          : formValues,
        keepStateOptions
      );
    },
    [control._reset, control._formValues]
  );

  return reset;
}
