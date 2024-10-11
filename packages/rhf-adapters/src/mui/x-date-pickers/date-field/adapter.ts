import type * as React from 'react';
import { validateDate, type PickerValidDate } from '@mui/x-date-pickers';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import {
  useBasePickerAdapter,
  type UseBasePickerAdapterProps,
} from '../internals/mui-x-date-pickers-internals';

export interface UseMuiXDateFieldAdapterProps<
  TTransformedValue extends null | PickerValidDate,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<
    UseBasePickerAdapterProps<TTransformedValue, TFieldValues, TName>,
    | 'disableIgnoringDatePartForTimeValidation'
    | 'maxTime'
    | 'minTime'
    | 'minutesStep'
    | 'shouldDisableTime'
    | 'title'
    | 'validator'
  > {
  inputRef?: React.Ref<HTMLInputElement>;
}

export function useMuiXDateFieldAdapter<
  TTransformedValue extends null | PickerValidDate,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  RefType = unknown
>(
  props: UseMuiXDateFieldAdapterProps<TTransformedValue, TFieldValues, TName>,
  ref?: React.Ref<RefType>
) {
  const { inputRef } = props;

  const {
    disableIgnoringDatePartForTimeValidation: _disableIgnoringDatePartForTimeValidation,
    maxTime: _maxTime,
    minTime: _minTime,
    minutesStep: _minutesStep,
    shouldDisableTime: _shouldDisableTime,
    ...adapter
  } = useBasePickerAdapter(
    {
      ...props,
      disableIgnoringDatePartForTimeValidation: undefined,
      maxTime: undefined,
      minTime: undefined,
      minutesStep: undefined,
      shouldDisableTime: undefined,
      validator: validateDate,
    },
    inputRef
  );

  return {
    ...adapter,
    inputRef: adapter.ref,
    ref,
  };
}
