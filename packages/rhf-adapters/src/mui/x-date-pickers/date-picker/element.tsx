import * as React from 'react';
import {
  type DatePickerProps,
  type PickerValidDate,
  DatePicker,
  type DateValidationError,
} from '@mui/x-date-pickers';
import { type PathValue, type FieldPath, type FieldValues } from 'react-hook-form';
import { type UseMuiXDatePickerAdapterProps, useMuiXDatePickerAdapter } from './adapter';

export interface MuiXDatePickerElementProps<
  TTransformedValue extends null | PickerValidDate,
  TEnableAccessibleFieldDOMStructure extends boolean = false,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<
      DatePickerProps<TTransformedValue, TEnableAccessibleFieldDOMStructure>,
      'defaultValue' | 'maxDate' | 'minDate' | 'name' | 'value'
    >,
    Omit<
      UseMuiXDatePickerAdapterProps<TTransformedValue, TFieldValues, TName>,
      | 'classes'
      | 'composeClassName'
      | 'composeHelperText'
      | 'helperText'
      | 'internalClasses'
      | 'onChange'
      | 'slotProps'
      | 'transform'
    > {
  /**
   * Transformation functions for the field's input and output values.
   */
  transform?: {
    input: (value: PathValue<TFieldValues, TName>) => TTransformedValue;
    output: (
      value: TTransformedValue,
      context: DateValidationError,
      prevValue: TTransformedValue
    ) => PathValue<TFieldValues, TName>;
  };
}

function MuiXDatePickerComponent<
  TTransformedValue extends null | PickerValidDate,
  TEnableAccessibleFieldDOMStructure extends boolean = false,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: MuiXDatePickerElementProps<
    TTransformedValue,
    TEnableAccessibleFieldDOMStructure,
    TFieldValues,
    TName
  >,
  ref?: React.Ref<HTMLDivElement>
): React.ReactElement {
  const {
    className,
    control,
    defaultValue,
    disabled,
    disableFuture,
    disableOnError,
    disableOnIsSubmitting,
    disablePast,
    error: errorProp,
    errorParser,
    inputRef,
    maxDate,
    messages,
    minDate,
    name,
    onChange,
    onClose,
    required,
    rules,
    shouldDisableDate,
    shouldDisableMonth,
    shouldDisableYear,
    shouldUnregister,
    slotProps,
    style,
    timezone,
    transform,
    ...rest
  } = props;

  const adapter = useMuiXDatePickerAdapter(
    {
      className,
      composeClassName: false,
      composeHelperText: true,
      control,
      defaultValue,
      disabled,
      disableFuture,
      disableOnError,
      disableOnIsSubmitting,
      disablePast,
      error: errorProp,
      errorParser,
      inputRef,
      maxDate,
      messages,
      minDate,
      name,
      onChange,
      onClose,
      required,
      rules,
      shouldDisableDate,
      shouldDisableMonth,
      shouldDisableYear,
      shouldUnregister,
      slotProps,
      style,
      timezone,
      transform,
    },
    ref
  );

  return <DatePicker {...rest} {...adapter} />;
}

export const MuiXDatePickerElement = React.forwardRef(
  MuiXDatePickerComponent
) as typeof MuiXDatePickerComponent & { displayName?: string };

MuiXDatePickerElement.displayName = 'MuiXDatePickerElement';
