import * as React from 'react';
import { type Transform } from '@piplup/rhf-core';
import { MuiFileInput, type MuiFileInputProps } from 'mui-file-input';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import { type UseMuiFileInputAdapterProps, useMuiFieldInputAdapter } from './adapter';

export type MuiFileInputValue<Multiple extends boolean | undefined = undefined> =
  Multiple extends true ? File[] : File | null;

export type MuiFileInputElementProps<
  Multiple extends boolean | undefined = undefined,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<
  MuiFileInputProps,
  'checked' | 'defaultChecked' | 'defaultValue' | 'name' | 'style' | 'value'
> & {
  multiple?: Multiple;
} & Omit<
    UseMuiFileInputAdapterProps<MuiFileInputValue<Multiple>, TFieldValues, TName>,
    'onBlur' | 'onChange' | 'transform'
  > & {
    /**
     * Transformation functions for the field's input and output values.
     */
    transform?: Transform<
      MuiFileInputProps['onChange'],
      MuiFileInputValue<Multiple>,
      TFieldValues,
      TName
    >;
  };

function MuiFileInputComponent<
  Multiple extends boolean | undefined = undefined,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: MuiFileInputElementProps<Multiple, TFieldValues, TName>,
  ref?: MuiFileInputProps['ref'],
): React.ReactElement {
  const {
    className,
    control,
    defaultValue,
    disabled,
    disableOnError,
    disableOnIsSubmitting,
    error,
    errorParser,
    helperText,
    messages,
    multiple,
    name,
    onBlur,
    onChange,
    required,
    rules,
    shouldUnregister,
    slots,
    style,
    transform,
    ...rest
  } = props;

  const adapter = useMuiFieldInputAdapter(
    {
      className,
      control,
      defaultValue,
      disabled,
      disableOnError,
      disableOnIsSubmitting,
      error,
      errorParser,
      helperText,
      messages,
      multiple,
      name,
      onBlur,
      onChange,
      required,
      rules,
      shouldUnregister,
      style,
      transform,
    },
    ref,
  );

  return (
    <MuiFileInput
      {...rest}
      {...adapter}
      // TODO: remove this expect-error flag once it is removed from [mui-file-input](https://github.com/viclafouch/mui-file-input/blob/main/src/index.tsx#L188)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      slots={slots}
    />
  );
}

export const MuiFileInputElement = React.forwardRef(
  MuiFileInputComponent,
) as typeof MuiFileInputComponent & { displayName?: string };

MuiFileInputElement.displayName = 'MuiFileInputElement';