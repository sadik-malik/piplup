import {
  useComposeClassName,
  useComposeModiferState,
  useComposeStyle,
  useFormReset,
  type UseComposeModifierStateResult,
} from '@piplup/rhf-core';
import * as React from 'react';
import { useFormState, type FieldValues, type UseFormStateProps } from 'react-hook-form';
import HTMLButtonClasses from './classes';

export interface HTMLButtonPropsOverrides {}

export interface HTMLButtonProps
  extends React.ComponentPropsWithRef<'button'>,
    HTMLButtonPropsOverrides {}

export interface UseHTMLButtonAdapterProps<TFieldValues extends FieldValues = FieldValues>
  extends Omit<HTMLButtonProps, 'style'>,
    Pick<UseFormStateProps<TFieldValues>, 'control' | 'disabled'> {
  verbose?: boolean;
  disableOnIsSubmitting?: boolean;
  disableOnError?: boolean;
  style?:
    | React.CSSProperties
    | ((ownerState: UseComposeModifierStateResult) => React.CSSProperties);
  classes?: Partial<Record<keyof typeof HTMLButtonClasses, string>>;
}

export default function useHTMLButtonAdapter<TFieldValues extends FieldValues = FieldValues>(
  props: UseHTMLButtonAdapterProps<TFieldValues>,
  ref?: HTMLButtonProps['ref']
): HTMLButtonProps {
  const {
    control,
    disabled = false,
    verbose: _verbose, // Added for consistency between adapters, which we may use in the future.
    disableOnIsSubmitting = false,
    disableOnError = false,
    className,
    style,
    classes,
    type,
    onClick,
    ...rest
  } = props;

  const { isSubmitting, errors } = useFormState({
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
    internalClasses: HTMLButtonClasses,
    modifierState,
    classes,
    className,
  });

  const composedStyle = useComposeStyle({
    modifierState,
    style,
  });

  const reset = useFormReset({
    control,
  });

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = React.useCallback(
    (event) => {
      if (typeof onClick !== 'undefined') {
        onClick(event);
      }
      if (type === 'reset' && !event.defaultPrevented) {
        reset();
      }
    },
    [type, onClick, reset]
  );

  return {
    disabled: modifierState.disabled,
    className: composedClassName,
    style: composedStyle,
    ref,
    type,
    onClick: handleClick,
    ...rest,
  };
}
