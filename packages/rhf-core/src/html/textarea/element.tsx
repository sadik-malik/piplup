import * as React from 'react';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import { useHtmlTextareaAdapter, type UseHtmlTextareaAdapterProps } from './adapter';

type TransformedValue = string | number | readonly string[] | undefined;

export interface HtmlTextareaElementProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValue extends TransformedValue = TransformedValue
> extends UseHtmlTextareaAdapterProps<TFieldValues, TName, TTransformedValue> {}

function HtmlTextareaComponent<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValue extends TransformedValue = TransformedValue
>(
  props: HtmlTextareaElementProps<TFieldValues, TName, TTransformedValue>,
  ref: React.Ref<HTMLTextAreaElement>
): React.ReactElement {
  const adapter = useHtmlTextareaAdapter<TFieldValues, TName, TTransformedValue>(props, ref);

  return <textarea {...adapter} />;
}

export const HtmlTextareaElement = React.forwardRef(HtmlTextareaComponent);

HtmlTextareaElement.displayName = 'HtmlTextareaElement';
