import * as React from 'react';
import { type FieldPath, type FieldValues, type PathValue } from 'react-hook-form';
import useHTMLTextareaAdapter, { type UseHTMLTextareaAdapterProps } from './adapter';

export interface HTMLTextareaElementProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TValue extends string | number | readonly string[] | undefined = PathValue<TFieldValues, TName>
> extends UseHTMLTextareaAdapterProps<TFieldValues, TName, TValue> {
  verbose?: boolean;
}

function HTMLTextareaComponent<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TValue extends string | number | readonly string[] | undefined = PathValue<TFieldValues, TName>
>(
  props: HTMLTextareaElementProps<TFieldValues, TName, TValue>,
  ref: React.Ref<HTMLTextAreaElement>
): React.ReactElement {
  const adapter = useHTMLTextareaAdapter<TFieldValues, TName, TValue>(
    {
      ...props,
      verbose: false,
    },
    ref
  );

  return <textarea {...adapter} />;
}

const HTMLTextareaElement = React.forwardRef(HTMLTextareaComponent);

HTMLTextareaElement.displayName = 'HTMLTextareaElement';

export default HTMLTextareaElement;
