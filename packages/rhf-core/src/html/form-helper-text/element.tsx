import * as React from 'react';
import { type FieldValues } from 'react-hook-form';
import { useHtmlFormHelperTextAdapter, type UseHtmlFormHelperTextProps } from './adapter';
import { HtmlFormHelperTextClasses } from './classes';

export interface HtmlFormHelperTextElementProps<TFieldValues extends FieldValues = FieldValues>
  extends Omit<React.ComponentProps<'p'>, 'style'>,
    Omit<
      UseHtmlFormHelperTextProps<TFieldValues>,
      'composeClassName' | 'composeHelperText' | 'helperText' | 'internalClasses'
    > {}

function HtmlFormHelperTextComponent<TFieldValues extends FieldValues = FieldValues>(
  props: HtmlFormHelperTextElementProps<TFieldValues>,
  ref?: React.Ref<HTMLParagraphElement>
): React.ReactElement {
  const {
    classes,
    className,
    control,
    disabled,
    disableOnError,
    disableOnIsSubmitting,
    error,
    errorParser,
    exact,
    name,
    style,
    ...rest
  } = props;

  const {
    error: _error,
    name: _name,
    ...adapter
  } = useHtmlFormHelperTextAdapter(
    {
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
      exact,
      helperText: props.children,
      internalClasses: HtmlFormHelperTextClasses,
      name,
      style,
    },
    ref
  );

  return <p aria-disabled={adapter.disabled} {...rest} {...adapter} />;
}

export const HtmlFormHelperTextElement = React.forwardRef(
  HtmlFormHelperTextComponent
) as typeof HtmlFormHelperTextComponent & { displayName?: string };

HtmlFormHelperTextElement.displayName = 'HtmlFormHelperTextElement';
