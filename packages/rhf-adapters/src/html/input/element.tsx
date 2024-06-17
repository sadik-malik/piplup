import { logger } from '@piplup/rhf-core';
import * as React from 'react';
import { type FieldPath, type FieldValues, type PathValue } from 'react-hook-form';
import useHTMLInputAdapter, { type HTMLInputProps, type UseHTMLInputAdapterProps } from './adapter';

export interface HTMLInputElementProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValue extends string | number | readonly string[] | undefined = PathValue<
    TFieldValues,
    TName
  >
> extends UseHTMLInputAdapterProps<TFieldValues, TName, TTransformedValue> {
  verbose?: boolean;
  component?: React.ElementType;
}

function HTMLInputComponent<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValue extends string | number | readonly string[] | undefined = PathValue<
    TFieldValues,
    TName
  >
>(
  props: HTMLInputElementProps<TFieldValues, TName, TTransformedValue>,
  ref?: HTMLInputProps['ref']
): React.ReactElement {
  if (props.type === 'button' || props.type === 'reset' || props.type === 'submit') {
    logger(
      'warn',
      props.verbose
    )(
      `HTMLInputElement with prop \`type="${props.type}"\` may result in unexpected behaviour. Please useHTMLButtonElement instead.`
    );
  }

  const adapter = useHTMLInputAdapter<TFieldValues, TName, TTransformedValue>(
    {
      ...props,
      verbose: false,
    },
    ref
  );

  return <input {...adapter} />;
}

const HTMLInputElement = React.forwardRef(HTMLInputComponent);

HTMLInputElement.displayName = 'HTMLInputElement';

export default HTMLInputElement;
