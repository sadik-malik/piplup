import type * as React from 'react';
import { type FieldValues } from 'react-hook-form';
import { useFormReset } from '../../hooks/use-form-reset';
import {
  useFormStateAdapter,
  type UseFormStateAdapterProps,
} from '../../hooks/use-form-state-adapter';
import { useEventCallback } from '../../utils';

export interface UseHtmlButtonAdapterProps<TFieldValues extends FieldValues = FieldValues>
  extends UseFormStateAdapterProps<TFieldValues> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (event: React.MouseEvent<HTMLButtonElement>, ...args: any[]) => void;
  type?: 'button' | 'reset' | 'submit';
}

export function useHtmlButtonAdapter<
  TFieldValues extends FieldValues = FieldValues,
  RefType = unknown,
>(props: UseHtmlButtonAdapterProps<TFieldValues>, ref?: React.Ref<RefType>) {
  const { control, onClick, type } = props;

  const { name: buttonName, ...adapter } = useFormStateAdapter(props, ref);

  const reset = useFormReset<TFieldValues>({
    control,
  });

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = useEventCallback(
    (event, ...args) => {
      if (typeof onClick === 'function') {
        onClick(event, ...args);
      }

      if (type === 'reset' && !event.defaultPrevented) {
        reset();
      }
    },
  );

  return {
    ...adapter,
    onClick: handleClick,
    type,
    ...(typeof buttonName === 'string' && {
      name: buttonName,
    }),
  };
}
