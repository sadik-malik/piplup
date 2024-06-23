import { logger } from '@piplup/rhf-core';
import * as React from 'react';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import useHTMLInputAdapter, { type HTMLInputProps, type UseHTMLInputAdapterProps } from './adapter';

export interface HTMLInputElementProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends UseHTMLInputAdapterProps<TFieldValues, TName> {
  verbose?: boolean;
  component?: React.ElementType;
}

function HTMLInputComponent<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: HTMLInputElementProps<TFieldValues, TName>,
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

  const adapter = useHTMLInputAdapter<TFieldValues, TName>(
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

export default HTMLInputElement as typeof HTMLInputComponent;
