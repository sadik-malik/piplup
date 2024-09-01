import * as React from 'react';
import { PathValue, type FieldPath, type FieldValues } from 'react-hook-form';
import { useHtmlInputAdapter, type UseHtmlInputAdapterProps } from './adapter';

type TransformedValue = string | number | readonly string[] | undefined;

export interface HtmlInputElementProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValue extends TransformedValue = TransformedValue
> extends UseHtmlInputAdapterProps<TFieldValues, TName, TTransformedValue> {
  transform?: {
    input?: (value: PathValue<TFieldValues, TName>) => TTransformedValue;
    output?: (
      event: React.ChangeEvent<HTMLInputElement>,
      value: TTransformedValue
    ) => PathValue<TFieldValues, TName>;
  };
}

function HtmlInputComponent<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValue extends TransformedValue = TransformedValue
>(
  props: HtmlInputElementProps<TFieldValues, TName, TTransformedValue>,
  ref?: React.Ref<HTMLInputElement>
): React.ReactElement {
  const adapter = useHtmlInputAdapter<TFieldValues, TName, TTransformedValue>(props, ref);

  return <input {...adapter} />;
}

export const HtmlInputElement = React.forwardRef(HtmlInputComponent);

HtmlInputElement.displayName = 'HtmlInputElement';
