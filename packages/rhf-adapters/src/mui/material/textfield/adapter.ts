import type * as React from 'react';
import { type TextFieldProps } from '@mui/material';
import { useHtmlInputAdapter, type UseHtmlInputAdapterProps } from '@piplup/rhf-core/html';
import { type ExtractRef } from '@piplup/utils';
import { type FieldPath, type FieldValues } from 'react-hook-form';

export type UseMuiTextFieldAdapterProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValue = unknown,
  ComponentProps extends React.ComponentPropsWithRef<React.ElementType> = TextFieldProps
> = UseHtmlInputAdapterProps<TFieldValues, TName, TTransformedValue, ComponentProps>;

export function useMuiTextFieldAdapter<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValue = unknown,
  ComponentProps extends React.ComponentPropsWithRef<React.ElementType> = TextFieldProps
>(
  props: UseMuiTextFieldAdapterProps<TFieldValues, TName, TTransformedValue, ComponentProps>,
  ref?: ExtractRef<ComponentProps>
) {
  return useHtmlInputAdapter<TFieldValues, TName, TTransformedValue, ComponentProps>(props, ref);
}
