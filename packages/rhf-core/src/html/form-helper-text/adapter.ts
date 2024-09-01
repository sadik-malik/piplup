import * as React from 'react';
import { type ExtractRef } from '@piplup/utils';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import { HtmlFormHelperTextClasses } from './classes';
import { type FormErrorParserFn } from '../../context/form-error-parser-context';
import { useComposeClassName } from '../../hooks/use-compose-class-name';
import {
  useComposeModiferState,
  type UseComposeModifierStateResult,
} from '../../hooks/use-compose-modifier-state';
import { useComposeStyle } from '../../hooks/use-compose-style';
import { useFieldState, type UseFieldStateProps } from '../../hooks/use-field-state';
import { useFormErrorParser } from '../../hooks/use-form-error-parser';

interface HtmlFormHelperTextBaseProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends UseFieldStateProps<TFieldValues, TName> {
  children?: React.ReactNode;
  classes?: Partial<Record<keyof typeof HtmlFormHelperTextClasses, string>>;
  className?: string;
  composeClassName?: boolean;
  errorParser?: FormErrorParserFn;
  style?:
    | ((ownerState: UseComposeModifierStateResult) => React.CSSProperties)
    | React.CSSProperties;
}

export type UseHtmlFormHelperTextProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  ComponentProps extends React.ComponentPropsWithRef<React.ElementType> = React.ComponentPropsWithRef<'p'>
> = HtmlFormHelperTextBaseProps<TFieldValues, TName> & Omit<ComponentProps, 'name' | 'style'>;

export function useHtmlFormHelperTextAdapter<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  ComponentProps extends React.ComponentPropsWithRef<React.ElementType> = React.ComponentPropsWithRef<'p'>
>(
  props: UseHtmlFormHelperTextProps<TFieldValues, TName, ComponentProps>,
  ref?: ExtractRef<ComponentProps>
) {
  const {
    children,
    classes,
    className,
    composeClassName = true,
    control,
    disabled = false,
    errorParser,
    name,
    style,
    ...rest
  } = props;

  const { disabled: disableField, error } = useFieldState<TFieldValues, TName>({
    control,
    disabled,
    name,
  });

  const modifierState = useComposeModiferState({
    disabled: disableField,
    error,
  });

  const composedClassName = useComposeClassName({
    classes,
    className,
    composeClassName,
    internalClasses: HtmlFormHelperTextClasses,
    modifierState,
  });

  const composedStyle = useComposeStyle({
    modifierState,
    style,
  });

  const errorParserFromContext = useFormErrorParser();
  const errorMessage = React.useMemo(
    () => (typeof errorParser === 'function' ? errorParser(error) : errorParserFromContext(error)),
    [errorParser, errorParserFromContext, error]
  );
  let renderHelperText = children;
  if (modifierState.error && errorMessage) {
    renderHelperText = errorMessage;
  }

  return {
    ...rest,
    children: renderHelperText,
    className: composedClassName,
    ref,
    style: composedStyle,
  };
}
