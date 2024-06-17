import * as React from 'react';
import { FieldError, FieldErrors } from 'react-hook-form';

export type UseComposeModiferStateProps = {
  error?: FieldError | FieldErrors;
  disabled?: boolean;
  disableOnIsSubmitting?: boolean;
  disableOnError?: boolean;
  isSubmitting?: boolean;
};

export type UseComposeModifierStateResult = {
  error: boolean;
  disabled: boolean;
};

/**
 * Hook to compose modifier states based on props like disableOnError, disableOnIsSubmitting, disabled, error and isSubmitting.
 *
 * @param {UseComposeModiferStateProps} props - Props object containing parameters to determine state modifiers.
 * @returns {UseComposeModifierStateResult} Composed modifier state object containing error and disabled flags.
 */
export default function useComposeModiferState(
  props: UseComposeModiferStateProps
): UseComposeModifierStateResult {
  const { disableOnError, disableOnIsSubmitting, disabled, error, isSubmitting } = props;

  return React.useMemo<UseComposeModifierStateResult>(() => {
    const hasError = !(
      typeof error === 'undefined' ||
      error === null ||
      (typeof error === 'object' && Object.keys(error).length === 0)
    );
    return {
      error: hasError,
      disabled: !!(
        disabled ||
        (disableOnError && hasError) ||
        (disableOnIsSubmitting && isSubmitting)
      ),
    };
  }, [error, disabled, disableOnError, disableOnIsSubmitting, isSubmitting]);
}
