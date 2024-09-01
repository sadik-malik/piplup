import * as React from 'react';
import { type FieldValues } from 'react-hook-form';
import { useHtmlButtonAdapter, type UseHtmlButtonAdapterProps } from './adapter';

export interface HtmlButtonElementProps<TFieldValues extends FieldValues = FieldValues>
  extends UseHtmlButtonAdapterProps<TFieldValues> {}

function HtmlButtonComponent<TFieldValues extends FieldValues = FieldValues>(
  props: HtmlButtonElementProps<TFieldValues>,
  ref?: React.Ref<HTMLButtonElement>
): React.ReactElement {
  const adapter = useHtmlButtonAdapter<TFieldValues>(props, ref);

  return <button {...adapter} />;
}

export const HtmlButtonElement = React.forwardRef(HtmlButtonComponent);

HtmlButtonElement.displayName = 'HtmlButtonElement';
