import { type ButtonProps } from '@mui/material';
import { useHtmlButtonAdapter, type UseHtmlButtonAdapterProps } from '@piplup/rhf-core/html';
import { type ExtractRef } from '@piplup/utils';
import { type FieldValues } from 'react-hook-form';

export type UseMuiButtonAdapterProps<
  TFieldValues extends FieldValues = FieldValues,
  ComponentProps extends React.ComponentPropsWithRef<'button'> = ButtonProps
> = UseHtmlButtonAdapterProps<TFieldValues, ComponentProps>;

export function useMuiButtonAdapter<
  TFieldValues extends FieldValues = FieldValues,
  ComponentProps extends React.ComponentPropsWithRef<'button'> = ButtonProps
>(props: UseMuiButtonAdapterProps<TFieldValues, ComponentProps>, ref?: ExtractRef<ComponentProps>) {
  return useHtmlButtonAdapter<TFieldValues, ComponentProps>(props, ref);
}
