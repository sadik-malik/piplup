import type * as React from 'react';
import { validateDate, type PickerValidDate } from '@mui/x-date-pickers';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import {
  useBasePickerAdapter,
  type UseBasePickerAdapterProps,
} from '../internals/mui-x-date-pickers-internals';

export interface UseMuiXYearCalendarAdapterProps<
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
    | 'shouldDisableMonth'
    | 'shouldDisableTime'
    | 'title'
    | 'validator'
  > {}

export function useMuiXYearCalendarAdapter<
  TTransformedValue extends null | PickerValidDate,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  RefType = unknown
>(
  props: UseMuiXYearCalendarAdapterProps<TTransformedValue, TFieldValues, TName>,
  ref?: React.Ref<RefType>
) {
  const {
    disableIgnoringDatePartForTimeValidation: _disableIgnoringDatePartForTimeValidation,
    maxTime: _maxTime,
    minTime: _minTime,
    minutesStep: _minutesStep,
    shouldDisableDate: _shouldDisableDate,
    shouldDisableMonth: _shouldDisableMonth,
    shouldDisableTime: _shouldDisableTime,
    ...adapter
  } = useBasePickerAdapter(
    {
      ...props,
      disableIgnoringDatePartForTimeValidation: undefined,
      maxTime: undefined,
      minTime: undefined,
      minutesStep: undefined,
      shouldDisableDate: undefined,
      shouldDisableMonth: undefined,
      shouldDisableTime: undefined,
      validator: validateDate,
    },
    ref
  );

  return adapter;
}
