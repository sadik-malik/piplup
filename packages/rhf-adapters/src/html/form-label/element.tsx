import * as React from 'react';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import useHTMLFormLabelAdapter, { type UseHTMLFormLabelProps } from './adapter';

export interface HTMLFormLabelElementProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends UseHTMLFormLabelProps<TFieldValues, TName> {}

function HTMLFormLabelComponent<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: HTMLFormLabelElementProps<TFieldValues, TName>,
  ref?: HTMLFormLabelElementProps<TFieldValues, TName>['ref']
): React.ReactElement {
  const { verbose: _verbose, ...rest } = props;

  const adapter = useHTMLFormLabelAdapter<TFieldValues, TName>(
    {
      ...rest,
      verbose: false,
    },
    ref
  );

  return <label {...adapter} />;
}

const HTMLFormLabelElement = React.forwardRef(HTMLFormLabelComponent);

HTMLFormLabelElement.displayName = 'HTMLFormLabelElement';

export default HTMLFormLabelElement as typeof HTMLFormLabelComponent;
