import * as React from 'react';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import { useHtmlFormHelperTextAdapter, type UseHtmlFormHelperTextProps } from './adapter';
import { HtmlFormHelperTextClasses } from './classes';

export interface HtmlFormHelperTextElementProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<React.ComponentProps<'p'>, 'style'>,
    Omit<
      UseHtmlFormHelperTextProps<TFieldValues, TName>,
      'composeClassName' | 'composeHelperText' | 'helperText' | 'internalClasses'
    > {}

function HtmlFormHelperTextComponent<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: HtmlFormHelperTextElementProps<TFieldValues, TName>,
  ref?: React.Ref<HTMLParagraphElement>
): React.ReactElement {
  const {
    children,
    classes,
    className,
    control,
    disabled,
    disableOnError,
    disableOnIsSubmitting,
    error,
    errorParser,
    name,
    style,
    ...rest
  } = props;

  const { error: _error, ...adapter } = useHtmlFormHelperTextAdapter(
    {
      children,
      classes,
      className,
      composeClassName: true,
      composeHelperText: true,
      control,
      disabled,
      disableOnError,
      disableOnIsSubmitting,
      error,
      errorParser,
      internalClasses: HtmlFormHelperTextClasses,
      name,
      style,
    },
    ref
  );

  return <p {...rest} {...adapter} />;
}

export const HtmlFormHelperTextElement = React.forwardRef(
  HtmlFormHelperTextComponent
) as typeof HtmlFormHelperTextComponent & { displayName?: string };

HtmlFormHelperTextElement.displayName = 'HtmlFormHelperTextElement';
