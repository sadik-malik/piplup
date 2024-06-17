import * as React from 'react';
import { FieldPath, type FieldValues } from 'react-hook-form';
import useHTMLFormHelperTextAdapter, { UseHTMLFormHelperTextProps } from './adapter';

export interface HTMLFormHelperTextElementProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends UseHTMLFormHelperTextProps<TFieldValues, TName> {
  component?: React.ElementType;
}

function HTMLFormHelperTextComponent<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: HTMLFormHelperTextElementProps<TFieldValues, TName>,
  ref?: HTMLFormHelperTextElementProps<TFieldValues, TName>['ref']
): React.ReactElement {
  const { verbose: _verbose, component = 'p', ...rest } = props;

  const { children, ...adapter } = useHTMLFormHelperTextAdapter<TFieldValues, TName>(
    {
      ...rest,
      verbose: false,
    },
    ref
  );

  return React.createElement(component, adapter, children);
}

const HTMLFormHelperTextElement = React.forwardRef(HTMLFormHelperTextComponent);

HTMLFormHelperTextElement.displayName = 'HTMLFormHelperTextElement';

export default HTMLFormHelperTextElement;
