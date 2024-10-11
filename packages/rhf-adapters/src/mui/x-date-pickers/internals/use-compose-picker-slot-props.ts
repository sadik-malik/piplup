import type * as React from 'react';

export interface UseComposePickerSlotProps {
  error: boolean;
  helperText: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  slotProps?: Record<string, any>;
}

export function useComposePickerSlotProps(props: UseComposePickerSlotProps) {
  const { error, helperText, slotProps } = props;
  return {
    ...slotProps,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    textField(ownerState: Record<string, any>) {
      let textFieldProps = slotProps ? slotProps.textField : {};
      if (typeof textFieldProps === 'function') {
        textFieldProps = textFieldProps(ownerState);
      }

      return {
        ...textFieldProps,
        error: error || textFieldProps?.error,
        helperText: helperText || textFieldProps?.helperText,
      };
    },
  };
}
