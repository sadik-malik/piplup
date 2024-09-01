import { type FabProps } from '@mui/material';
import { useHtmlButtonAdapter, type UseHtmlButtonAdapterProps } from '@piplup/rhf-core/html';
import { type ExtractRef } from '@piplup/utils';
import { type FieldValues } from 'react-hook-form';

export type UseMuiFabAdapterProps<
  TFieldValues extends FieldValues = FieldValues,
  ComponentProps extends React.ComponentPropsWithRef<'button'> = FabProps
> = UseHtmlButtonAdapterProps<TFieldValues, ComponentProps>;

export function useMuiFabAdapter<
  TFieldValues extends FieldValues = FieldValues,
  ComponentProps extends React.ComponentPropsWithRef<'button'> = FabProps
>(props: UseMuiFabAdapterProps<TFieldValues, ComponentProps>, ref?: ExtractRef<ComponentProps>) {
  return useHtmlButtonAdapter<TFieldValues, ComponentProps>(props, ref);
}
