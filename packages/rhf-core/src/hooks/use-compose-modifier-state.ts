import * as React from 'react';
import { type FieldError, type FieldErrors } from 'react-hook-form';

export type UseComposeModiferStateProps = {
  disabled?: boolean;
  disableOnError?: boolean;
  disableOnIsSubmitting?: boolean;
  error?: FieldError | FieldErrors;
  isSubmitting?: boolean;
};

export type UseComposeModifierStateResult = {
  disabled: boolean;
  error: boolean;
};

/**
 * Hook to compose modifier states based on props like disableOnError, disableOnIsSubmitting, disabled, error and isSubmitting.
 *
 * @param {UseComposeModiferStateProps} props - Props object containing parameters to determine state modifiers.
 * @returns {UseComposeModifierStateResult} Composed modifier state object containing error and disabled flags.
 */
export function useComposeModiferState(
  props: UseComposeModiferStateProps
): UseComposeModifierStateResult {
  const { disabled, disableOnError, disableOnIsSubmitting, error, isSubmitting } = props;

  return React.useMemo<UseComposeModifierStateResult>(() => {
    const hasError = !(
      typeof error === 'undefined' ||
      error === null ||
      (typeof error === 'object' && Object.keys(error).length === 0)
    );
    return {
      disabled: !!(
        disabled ||
        (disableOnError && hasError) ||
        (disableOnIsSubmitting && isSubmitting)
      ),
      error: hasError,
    };
  }, [error, disabled, disableOnError, disableOnIsSubmitting, isSubmitting]);
}
