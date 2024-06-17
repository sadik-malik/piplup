import {
  FormErrorParserFn,
  UseFieldStateProps,
  useComposeClassName,
  useComposeModiferState,
  useComposeStyle,
  useFieldState,
  useFormErrorParser,
  type UseComposeModifierStateResult,
} from '@piplup/rhf-core';
import * as React from 'react';
import { FieldPath, type FieldValues } from 'react-hook-form';
import HTMLFormHelperTextClasses from './classes';

export interface HTMLFormHelperTextPropsOverrides {}

export interface HTMLFormHelperTextProps
  extends React.ComponentPropsWithRef<'p'>,
    HTMLFormHelperTextPropsOverrides {}

export interface UseHTMLFormHelperTextProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<HTMLFormHelperTextProps, 'style' | 'name'>,
    UseFieldStateProps<TFieldValues, TName> {
  disabled?: boolean;
  style?:
    | React.CSSProperties
    | ((ownerState: UseComposeModifierStateResult) => React.CSSProperties);
  verbose?: boolean;
  classes?: Record<keyof typeof HTMLFormHelperTextClasses, string>;
  errorParser?: FormErrorParserFn;
}

export default function useHTMLFormHelperTextAdapter<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: UseHTMLFormHelperTextProps<TFieldValues, TName>,
  ref?: HTMLFormHelperTextProps['ref']
): HTMLFormHelperTextProps {
  const {
    control,
    disabled = false,
    verbose: _verbose, // Added for consistency between adapters, which we may use in the future.
    className,
    style,
    classes,
    name,
    errorParser,
    ...rest
  } = props;

  const { error, disabled: disableField } = useFieldState<TFieldValues, TName>({
    control,
    name,
    disabled,
  });

  const modifierState = useComposeModiferState({
    disabled: disableField,
    error,
  });

  const composedClassName = useComposeClassName({
    internalClasses: HTMLFormHelperTextClasses,
    modifierState,
    classes,
    className,
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

  return {
    className: composedClassName,
    style: composedStyle,
    ref,
    children: errorMessage,
    ...rest,
  };
}
