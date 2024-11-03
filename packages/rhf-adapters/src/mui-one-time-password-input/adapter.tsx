import * as React from 'react';
import { type TextFieldProps } from '@mui/material';
import { useControllerAdapter, type UseControllerAdapterProps } from '@piplup/rhf-core';
import { type PathValue, type FieldPath, type FieldValues } from 'react-hook-form';

export interface UseMuiOtpInputAdapterProps<
  TTransformedValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<
    UseControllerAdapterProps<TTransformedValue, TFieldValues, TName>,
    'classes' | 'composeClassName' | 'composeHelperText' | 'internalClasses'
  > {
  TextFieldsProps?: ((index: number) => TextFieldProps) | TextFieldProps;
}

export function useMuiOtpInputAdapter<
  TTransformedValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  RefType = unknown,
>(
  props: UseMuiOtpInputAdapterProps<TTransformedValue, TFieldValues, TName>,
  ref?: React.Ref<RefType>,
) {
  const { TextFieldsProps, transform, ...rest } = props;

  const internalTransform = React.useMemo<
    UseControllerAdapterProps<TTransformedValue, TFieldValues, TName>['transform']
  >(
    () => ({
      input(value) {
        return value as TTransformedValue;
      },
      output(value) {
        return value as PathValue<TFieldValues, TName>;
      },
    }),
    [],
  );

  const {
    error,
    // ref: adapterRef,
    ...adapter
  } = useControllerAdapter<TTransformedValue, TFieldValues, TName>({
    ...rest,
    classes: undefined,
    composeClassName: false,
    composeHelperText: true,
    internalClasses: undefined,
    transform: {
      ...internalTransform,
      ...transform,
    },
  });

  return {
    ...adapter,
    ref,
    TextFieldsProps(index: number) {
      // TODO: component stops accepting any user input if inputRef is passed to the component.
      // Enable inputRef once this bug is addressed in `mui-one-time-password-input` package.
      // https://github.com/viclafouch/mui-otp-input/issues/71
      if (typeof TextFieldsProps === 'function') {
        const textFieldsProps = TextFieldsProps(index);
        return {
          ...textFieldsProps,
          error: error || !!textFieldsProps.error,
          // inputRef: forkRef(textFieldsProps.ref, adapterRef),
        };
      }
      return {
        ...TextFieldsProps,
        error: error || !!TextFieldsProps?.error,
        // inputRef: forkRef(TextFieldsProps?.ref, adapterRef),
      };
    },
  };
}
