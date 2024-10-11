import type * as React from 'react';
import { validateDate, type PickerValidDate } from '@mui/x-date-pickers';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import {
  useBasePickerAdapter,
  useComposePickerSlotProps,
  type UseBasePickerAdapterProps,
} from '../internals/mui-x-date-pickers-internals';

export interface UseMuiXDatePickerAdapterProps<
  TTransformedValue extends null | PickerValidDate,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<
    UseBasePickerAdapterProps<TTransformedValue, TFieldValues, TName>,
    | 'disableIgnoringDatePartForTimeValidation'
    | 'helperText'
    | 'maxTime'
    | 'minTime'
    | 'minutesStep'
    | 'onBlur'
    | 'shouldDisableTime'
    | 'title'
    | 'validator'
  > {
  inputRef?: React.Ref<HTMLInputElement>;
  onClose?: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  slotProps?: Record<string, any>;
}

export function useMuiXDatePickerAdapter<
  TTransformedValue extends null | PickerValidDate,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  RefType = unknown
>(
  props: UseMuiXDatePickerAdapterProps<TTransformedValue, TFieldValues, TName>,
  ref?: React.Ref<RefType>
) {
  const { inputRef, onClose, slotProps } = props;

  const {
    disableIgnoringDatePartForTimeValidation: _disableIgnoringDatePartForTimeValidation,
    error,
    helperText,
    maxTime: _maxTime,
    minTime: _minTime,
    minutesStep: _minutesStep,
    onBlur,
    shouldDisableTime: _shouldDisableTime,
    ...adapter
  } = useBasePickerAdapter(
    {
      ...props,
      disableIgnoringDatePartForTimeValidation: undefined,
      helperText: undefined,
      maxTime: undefined,
      minTime: undefined,
      minutesStep: undefined,
      onBlur: onClose,
      shouldDisableTime: undefined,
      validator: validateDate,
    },
    inputRef
  );

  const composedSlotProps = useComposePickerSlotProps({
    error,
    helperText,
    slotProps,
  });

  return {
    ...adapter,
    inputRef: adapter.ref,
    onClose: onBlur,
    ref,
    slotProps: composedSlotProps,
  };
}
