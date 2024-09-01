import { type RadioProps } from '@mui/material';
import { useHtmlInputAdapter, type UseHtmlInputAdapterProps } from '@piplup/rhf-core/html';
import { type ExtractRef } from '@piplup/utils';
import { type PathValue, type FieldPath, type FieldValues } from 'react-hook-form';

export type UseMuiRadioAdapterProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValue = unknown,
  ComponentProps extends React.ComponentPropsWithRef<React.ElementType> = RadioProps
> = UseHtmlInputAdapterProps<TFieldValues, TName, TTransformedValue, ComponentProps> & {
  transform?: {
    input?: (value: PathValue<TFieldValues, TName>) => TTransformedValue;
    output?: (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...args: any[]
    ) => PathValue<TFieldValues, TName>;
  };
  type?: never;
  value?: TTransformedValue;
};

export function useMuiRadioAdapter<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValue = unknown,
  ComponentProps extends React.ComponentPropsWithRef<React.ElementType> = RadioProps
>(
  props: UseMuiRadioAdapterProps<TFieldValues, TName, TTransformedValue, ComponentProps>,
  ref?: ExtractRef<ComponentProps>
) {
  return useHtmlInputAdapter<TFieldValues, TName, TTransformedValue, ComponentProps>(
    {
      ...props,
      type: 'radio',
    },
    ref
  );
}
