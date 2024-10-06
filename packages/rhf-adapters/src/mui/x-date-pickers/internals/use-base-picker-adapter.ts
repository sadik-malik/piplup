import * as React from 'react';
import {
  type TimeView,
  type Validator,
  type PickersTimezone,
  type PickerValidDate,
} from '@mui/x-date-pickers';
import { useControllerAdapter, type UseControllerAdapterProps } from '@piplup/rhf-core';
import { type PathValue, type FieldPath, type FieldValues } from 'react-hook-form';
import {
  type BasePickerRulesMessages,
  type UseBasePickerRules,
  useBasePickerRules,
} from '../internals/use-base-picker-rules';

export interface UseBasePickerAdapterProps<
  TTransformedValue extends null | PickerValidDate,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<UseBasePickerRules<TTransformedValue, TFieldValues, TName>, 'messages'>,
    Omit<
      UseControllerAdapterProps<TTransformedValue, TFieldValues, TName>,
      'max' | 'maxLength' | 'messages' | 'min' | 'minLength' | 'pattern'
    > {
  /**
   * If true, disable values after the current date.
   */
  disableFuture?: boolean;
  /**
   * 'If true, disable values before the current date.'
   */
  disablePast?: boolean;
  /**
   * Maximum selectable date.
   */
  maxDate?: TTransformedValue;
  /**
   * Maximum selectable time.
   */
  maxTime?: TTransformedValue;
  messages?: BasePickerRulesMessages<TTransformedValue> & {
    required?: string;
  };
  /**
   * Minimal selectable date.
   */
  minDate?: TTransformedValue;
  /**
   * Minimal selectable time.
   */
  minTime?: TTransformedValue;
  /**
   * Step over minutes.
   */
  minutesStep?: number;
  /**
   * If true, the field will be required.
   */
  required?: boolean;
  /**
   * Disable specific date.
   */
  shouldDisableDate?: (day: TTransformedValue) => boolean;
  /**
   * Disable specific month.
   */
  shouldDisableMonth?: (month: TTransformedValue) => boolean;
  /**
   * Disable specific time.
   */
  shouldDisableTime?: (value: TTransformedValue, view: TimeView) => boolean;
  /**
   * Disable specific year.
   */
  shouldDisableYear?: (year: TTransformedValue) => boolean;
  timezone?: PickersTimezone;
  validator: Validator<
    TTransformedValue,
    NonNullable<TTransformedValue>,
    null | string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any
  >;
}

export function useBasePickerAdapter<
  TTransformedValue extends null | PickerValidDate,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  RefType = unknown
>(
  props: UseBasePickerAdapterProps<TTransformedValue, TFieldValues, TName>,
  ref?: React.Ref<RefType>
) {
  const {
    disableFuture,
    disablePast,
    maxDate,
    maxTime,
    messages = {},
    minDate,
    minTime,
    minutesStep,
    rules,
    shouldDisableDate,
    shouldDisableMonth,
    shouldDisableTime,
    shouldDisableYear,
    timezone,
    transform,
    validator,
  } = props;

  const transformHelpers = React.useMemo(
    () => ({
      input(value: PathValue<TFieldValues, TName>): TTransformedValue {
        return (value ?? null) as TTransformedValue;
      },
      output(value: TTransformedValue): PathValue<TFieldValues, TName> {
        return value as PathValue<TFieldValues, TName>;
      },
    }),
    []
  );

  const pickerRules = useBasePickerRules({
    disableFuture,
    disablePast,
    maxDate,
    maxTime,
    messages,
    minDate,
    minTime,
    minutesStep,
    rules,
    shouldDisableDate,
    shouldDisableMonth,
    shouldDisableTime,
    shouldDisableYear,
    timezone,
    validator,
  });

  const { title: _title, ...adapter } = useControllerAdapter<
    TTransformedValue,
    TFieldValues,
    TName
  >(
    {
      ...props,
      messages,
      rules: pickerRules,
      transform: {
        ...transformHelpers,
        ...transform,
      },
    },
    ref
  );

  return {
    ...adapter,
    disableFuture,
    disablePast,
    maxDate,
    maxTime,
    minDate,
    minTime,
    minutesStep,
    shouldDisableDate,
    shouldDisableMonth,
    shouldDisableTime,
    shouldDisableYear,
    timezone,
  };
}
