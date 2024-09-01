import * as React from 'react';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import { useHtmlFormLabelAdapter, type UseHtmlFormLabelProps } from './adapter';

export interface HtmlFormLabelElementProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends UseHtmlFormLabelProps<React.ComponentPropsWithRef<'label'>, TFieldValues, TName> {}

function HtmlFormLabelComponent<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: HtmlFormLabelElementProps<TFieldValues, TName>,
  ref?: React.Ref<HTMLLabelElement>
): React.ReactElement {
  const adapter = useHtmlFormLabelAdapter<
    React.ComponentPropsWithRef<'label'>,
    TFieldValues,
    TName
  >(props, ref);

  return <label {...adapter} />;
}

export const HtmlFormLabelElement = React.forwardRef(HtmlFormLabelComponent);

HtmlFormLabelElement.displayName = 'HtmlFormLabelElement';
