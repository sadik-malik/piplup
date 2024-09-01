import type * as React from 'react';
import { type ExtractRef, useEventCallback } from '@piplup/utils';
import { useFormState, type FieldValues, type UseFormStateProps } from 'react-hook-form';
import { HtmlButtonClasses } from './classes';
import { useComposeClassName } from '../../hooks/use-compose-class-name';
import {
  useComposeModiferState,
  type UseComposeModifierStateResult,
} from '../../hooks/use-compose-modifier-state';
import { useComposeStyle } from '../../hooks/use-compose-style';
import { useFormReset } from '../../hooks/use-form-reset';

interface HtmlButtonBaseProps<TFieldValues extends FieldValues = FieldValues>
  extends Pick<UseFormStateProps<TFieldValues>, 'control' | 'disabled'> {
  classes?: Partial<Record<keyof typeof HtmlButtonClasses, string>>;
  composeClassName?: boolean;
  disableOnError?: boolean;
  disableOnIsSubmitting?: boolean;
  style?:
    | ((ownerState: UseComposeModifierStateResult) => React.CSSProperties)
    | React.CSSProperties;
  type?: 'button' | 'reset' | 'submit';
}

export type UseHtmlButtonAdapterProps<
  TFieldValues extends FieldValues = FieldValues,
  ComponentProps extends React.ComponentPropsWithRef<'button'> = React.ComponentPropsWithRef<'button'>
> = HtmlButtonBaseProps<TFieldValues> & Omit<ComponentProps, 'style' | 'type'>;

export function useHtmlButtonAdapter<
  TFieldValues extends FieldValues = FieldValues,
  ComponentProps extends React.ComponentPropsWithRef<'button'> = React.ComponentPropsWithRef<'button'>
>(
  props: UseHtmlButtonAdapterProps<TFieldValues, ComponentProps>,
  ref?: ExtractRef<ComponentProps>
) {
  const {
    classes,
    className,
    composeClassName = true,
    control,
    disabled = false,
    disableOnError = false,
    disableOnIsSubmitting = false,
    onClick,
    style,
    type,
    ...rest
  } = props;

  const { errors, isSubmitting } = useFormState<TFieldValues>({
    control,
    disabled,
  });

  const modifierState = useComposeModiferState({
    disabled,
    disableOnError,
    disableOnIsSubmitting,
    error: errors,
    isSubmitting,
  });

  const composedClassName = useComposeClassName({
    classes,
    className,
    composeClassName,
    internalClasses: HtmlButtonClasses,
    modifierState,
  });

  const composedStyle = useComposeStyle({
    modifierState,
    style,
  });

  const reset = useFormReset<TFieldValues>({
    control,
  });

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = useEventCallback((event) => {
    if (typeof onClick === 'function') {
      onClick(event);
    }

    if (type === 'reset' && !event.defaultPrevented) {
      reset();
    }
  });

  return {
    ...rest,
    className: composedClassName,
    disabled: modifierState.disabled,
    onClick: handleClick,
    ref,
    style: composedStyle,
    type,
  };
}
