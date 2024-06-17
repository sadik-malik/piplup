import * as React from 'react';
import { type FieldValues } from 'react-hook-form';
import useHTMLButtonAdapter, { type UseHTMLButtonAdapterProps } from './adapter';

export interface HTMLButtonElementProps<TFieldValues extends FieldValues = FieldValues>
  extends UseHTMLButtonAdapterProps<TFieldValues> {}

function HTMLButtonComponent<TFieldValues extends FieldValues = FieldValues>(
  props: HTMLButtonElementProps<TFieldValues>,
  ref?: HTMLButtonElementProps<TFieldValues>['ref']
): React.ReactElement {
  const { verbose: _verbose, ...rest } = props;

  const adapter = useHTMLButtonAdapter<TFieldValues>(
    {
      ...rest,
      verbose: false,
    },
    ref
  );

  return <button {...adapter} />;
}

const HTMLButtonElement = React.forwardRef(HTMLButtonComponent);

HTMLButtonElement.displayName = 'HTMLInputElement';

export default HTMLButtonElement;
