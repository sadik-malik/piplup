import * as React from 'react';
import {
  type PickerValidDate,
  type DateValidationError,
  DateField,
  type DateFieldProps,
} from '@mui/x-date-pickers';
import { type PathValue, type FieldPath, type FieldValues } from 'react-hook-form';
import { type UseMuiXDateFieldAdapterProps, useMuiXDateFieldAdapter } from './adapter';

export type MuiXDateFieldElementProps<
  TTransformedValue extends null | PickerValidDate,
  TEnableAccessibleFieldDOMStructure extends boolean = false,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Omit<
  DateFieldProps<TTransformedValue, TEnableAccessibleFieldDOMStructure>,
  'defaultValue' | 'maxDate' | 'minDate' | 'name' | 'value'
> &
  Omit<
    UseMuiXDateFieldAdapterProps<TTransformedValue, TFieldValues, TName>,
    | 'classes'
    | 'composeClassName'
    | 'composeHelperText'
    | 'helperText'
    | 'internalClasses'
    | 'onChange'
    | 'slotProps'
    | 'transform'
  > & {
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
  };

function MuiXDateFieldComponent<
  TTransformedValue extends null | PickerValidDate,
  TEnableAccessibleFieldDOMStructure extends boolean = false,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: MuiXDateFieldElementProps<
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
    error,
    errorParser,
    inputRef,
    maxDate,
    messages,
    minDate,
    name,
    onBlur,
    onChange,
    required,
    rules,
    shouldDisableDate,
    shouldDisableMonth,
    shouldDisableYear,
    shouldUnregister,
    style,
    timezone,
    transform,
    ...rest
  } = props;

  const adapter = useMuiXDateFieldAdapter(
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
      error,
      errorParser,
      inputRef,
      maxDate,
      messages,
      minDate,
      name,
      onBlur,
      onChange,
      required,
      rules,
      shouldDisableDate,
      shouldDisableMonth,
      shouldDisableYear,
      shouldUnregister,
      style,
      timezone,
      transform,
    },
    ref
  );

  return (
    <DateField
      {...(rest as DateFieldProps<TTransformedValue, TEnableAccessibleFieldDOMStructure>)}
      {...adapter}
    />
  );
}

export const MuiXDateFieldElement = React.forwardRef(
  MuiXDateFieldComponent
) as typeof MuiXDateFieldComponent & { displayName?: string };

MuiXDateFieldElement.displayName = 'MuiXDateFieldElement';
