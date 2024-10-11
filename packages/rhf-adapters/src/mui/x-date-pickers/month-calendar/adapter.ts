import type * as React from 'react';
import { validateDate, type PickerValidDate } from '@mui/x-date-pickers';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import {
  useBasePickerAdapter,
  type UseBasePickerAdapterProps,
} from '../internals/mui-x-date-pickers-internals';

export interface UseMuiXMonthCalendarAdapterProps<
  TTransformedValue extends null | PickerValidDate,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<
    UseBasePickerAdapterProps<TTransformedValue, TFieldValues, TName>,
    | 'disableIgnoringDatePartForTimeValidation'
    | 'maxTime'
    | 'minTime'
    | 'minutesStep'
    | 'shouldDisableDate'
    | 'shouldDisableTime'
    | 'shouldDisableYear'
    | 'title'
    | 'validator'
  > {}

export function useMuiXMonthCalendarAdapter<
  TTransformedValue extends null | PickerValidDate,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  RefType = unknown
>(
  props: UseMuiXMonthCalendarAdapterProps<TTransformedValue, TFieldValues, TName>,
  ref?: React.Ref<RefType>
) {
  const {
    disableIgnoringDatePartForTimeValidation: _disableIgnoringDatePartForTimeValidation,
    maxTime: _maxTime,
    minTime: _minTime,
    minutesStep: _minutesStep,
    shouldDisableDate: _shouldDisableDate,
    shouldDisableTime: _shouldDisableTime,
    shouldDisableYear: _shouldDisableYear,
    ...adapter
  } = useBasePickerAdapter(
    {
      ...props,
      disableIgnoringDatePartForTimeValidation: undefined,
      maxTime: undefined,
      minTime: undefined,
      minutesStep: undefined,
      shouldDisableDate: undefined,
      shouldDisableTime: undefined,
      shouldDisableYear: undefined,
      validator: validateDate,
    },
    ref
  );

  return adapter;
}
