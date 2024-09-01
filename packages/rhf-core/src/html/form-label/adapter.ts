import type * as React from 'react';
import { type ExtractRef } from '@piplup/utils';
import { type FieldPath, type FieldValues } from 'react-hook-form';
import { HtmlFormLabelClasses } from './classes';
import { useComposeClassName } from '../../hooks/use-compose-class-name';
import {
  useComposeModiferState,
  type UseComposeModifierStateResult,
} from '../../hooks/use-compose-modifier-state';
import { useComposeStyle } from '../../hooks/use-compose-style';
import { useFieldState, type UseFieldStateProps } from '../../hooks/use-field-state';

interface HtmlFormLabelBaseProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends UseFieldStateProps<TFieldValues, TName> {
  classes?: Record<keyof typeof HtmlFormLabelClasses, string>;
  className?: string;
  composeClassName?: boolean;
  disabled?: boolean;
  style?:
    | ((ownerState: UseComposeModifierStateResult) => React.CSSProperties)
    | React.CSSProperties;
}

export type UseHtmlFormLabelProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  ComponentProps extends React.ComponentPropsWithRef<React.ElementType> = React.ComponentPropsWithRef<'label'>
> = HtmlFormLabelBaseProps<TFieldValues, TName> & Omit<ComponentProps, 'name' | 'style'>;

export function useHtmlFormLabelAdapter<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  ComponentProps extends React.ComponentPropsWithRef<React.ElementType> = React.ComponentPropsWithRef<'label'>
>(
  props: UseHtmlFormLabelProps<TFieldValues, TName, ComponentProps>,
  ref?: ExtractRef<ComponentProps>
) {
  const {
    classes,
    className,
    composeClassName = true,
    control,
    disabled = false,
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
    internalClasses: HtmlFormLabelClasses,
    modifierState,
  });

  const composedStyle = useComposeStyle({
    modifierState,
    style,
  });

  return {
    ...rest,
    className: composedClassName,
    ref,
    style: composedStyle,
  };
}
