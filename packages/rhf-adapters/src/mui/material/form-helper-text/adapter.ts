import { type FormHelperTextProps } from '@mui/material';
import {
  useHtmlFormHelperTextAdapter,
  type UseHtmlFormHelperTextProps,
} from '@piplup/rhf-core/html';
import { type ExtractRef } from '@piplup/utils';
import { type FieldPath, type FieldValues } from 'react-hook-form';

export type UseMuiFormHelperTextProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  ComponentProps extends React.ComponentPropsWithRef<React.ElementType> = FormHelperTextProps
> = UseHtmlFormHelperTextProps<TFieldValues, TName, ComponentProps>;

export function useMuiFormHelperTextAdapter<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  ComponentProps extends React.ComponentPropsWithRef<React.ElementType> = FormHelperTextProps
>(
  props: UseHtmlFormHelperTextProps<TFieldValues, TName, ComponentProps>,
  ref?: ExtractRef<ComponentProps>
) {
  return useHtmlFormHelperTextAdapter<TFieldValues, TName, ComponentProps>(props, ref);
}
