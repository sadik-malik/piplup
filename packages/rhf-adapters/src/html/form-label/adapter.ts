import {
  useComposeClassName,
  useComposeModiferState,
  useComposeStyle,
  useFieldState,
  type UseComposeModifierStateResult,
  type UseFieldStateProps,
} from '@piplup/rhf-core';
import * as React from 'react';
import { FieldPath, type FieldValues } from 'react-hook-form';
import HTMLFormLabelClasses from './classes';

export interface HTMLFormLabelPropsOverrides {}

export interface HTMLFormLabelProps
  extends React.ComponentPropsWithRef<'label'>,
    HTMLFormLabelPropsOverrides {}

export interface UseHTMLFormLabelProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<HTMLFormLabelProps, 'style' | 'name'>,
    UseFieldStateProps<TFieldValues, TName> {
  disabled?: boolean;
  style?:
    | React.CSSProperties
    | ((ownerState: UseComposeModifierStateResult) => React.CSSProperties);
  verbose?: boolean;
  classes?: Record<keyof typeof HTMLFormLabelClasses, string>;
}

export default function useHTMLFormLabelAdapter<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: UseHTMLFormLabelProps<TFieldValues, TName>,
  ref?: HTMLFormLabelProps['ref']
): HTMLFormLabelProps {
  const {
    control,
    disabled = false,
    verbose: _verbose, // Added for consistency between adapters, which we may use in the future.
    className,
    style,
    classes,
    name,
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
    internalClasses: HTMLFormLabelClasses,
    modifierState,
    classes,
    className,
  });

  const composedStyle = useComposeStyle({
    modifierState,
    style,
  });

  return {
    className: composedClassName,
    style: composedStyle,
    ref,
    ...rest,
  };
}
