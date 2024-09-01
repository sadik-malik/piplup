import * as React from 'react';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import { useHtmlFormHelperTextAdapter, type UseHtmlFormHelperTextProps } from './adapter';

export interface HtmlFormHelperTextElementProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends UseHtmlFormHelperTextProps<TFieldValues, TName, React.ComponentProps<'p'>> {}

function HtmlFormHelperTextComponent<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: HtmlFormHelperTextElementProps<TFieldValues, TName>,
  ref?: React.Ref<HTMLParagraphElement>
): React.ReactElement {
  const adapter = useHtmlFormHelperTextAdapter<TFieldValues, TName, React.ComponentProps<'p'>>(
    props,
    ref
  );

  return <p {...adapter} />;
}

export const HtmlFormHelperTextElement = React.forwardRef(HtmlFormHelperTextComponent);

HtmlFormHelperTextElement.displayName = 'HtmlFormHelperTextElement';
