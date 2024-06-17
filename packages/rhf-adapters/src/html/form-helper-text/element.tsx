import * as React from 'react';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import useHTMLFormHelperTextAdapter, { type UseHTMLFormHelperTextProps } from './adapter';

export interface HTMLFormHelperTextElementProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends UseHTMLFormHelperTextProps<TFieldValues, TName> {}

function HTMLFormHelperTextComponent<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: HTMLFormHelperTextElementProps<TFieldValues, TName>,
  ref?: HTMLFormHelperTextElementProps<TFieldValues, TName>['ref']
): React.ReactElement {
  const { verbose: _verbose, ...rest } = props;

  const adapter = useHTMLFormHelperTextAdapter<TFieldValues, TName>(
    {
      ...rest,
      verbose: false,
    },
    ref
  );

  return <p {...adapter} />;
}

const HTMLFormHelperTextElement = React.forwardRef(HTMLFormHelperTextComponent);

HTMLFormHelperTextElement.displayName = 'HTMLFormHelperTextElement';

export default HTMLFormHelperTextElement;
