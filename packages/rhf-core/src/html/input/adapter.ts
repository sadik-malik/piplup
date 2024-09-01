import * as React from 'react';
import { execSequentially, useForkRef, type ExtractRef } from '@piplup/utils';
import { useController, type FieldPath, type FieldValues, type PathValue } from 'react-hook-form';
import { HtmlInputClasses } from './classes';
import { useComposeClassName } from '../../hooks/use-compose-class-name';
import { useComposeModiferState } from '../../hooks/use-compose-modifier-state';
import { useComposeRules } from '../../hooks/use-compose-rules';
import { useComposeStyle } from '../../hooks/use-compose-style';
import { useTransform } from '../../hooks/use-transform';
import { type StandardFieldAdapterProps } from '../../types';

function isEqualRadioOrCheckboxValue(a: unknown, b: unknown) {
  if (typeof a === 'object' && b !== null) {
    return a === b;
  }
  // The DOM can stringify numeric or boolean value so converting values to string for comparison.
  return String(a) === String(b);
}

interface HtmlInputBaseProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValue = unknown
> extends StandardFieldAdapterProps<TFieldValues, TName, TTransformedValue> {
  checked?: (values: TTransformedValue) => boolean;
  children?: ((value: TTransformedValue) => React.ReactNode) | React.ReactNode;
  classes?: Partial<Record<keyof typeof HtmlInputClasses, 'string'>>;
  indeterminate?: (values: TTransformedValue) => boolean;
  max?: number | string;
  maxLength?: number;
  min?: number | string;
  minLength?: number;
  pattern?: RegExp | string;
  title?: string;
  type?:
    | 'checkbox'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    | 'radio'
    | 'range'
    | 'search'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week';
  value?: TTransformedValue;
}

export type UseHtmlInputAdapterProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValue = unknown,
  ComponentProps extends React.ComponentPropsWithRef<React.ElementType> = React.ComponentPropsWithRef<'input'>
> = HtmlInputBaseProps<TFieldValues, TName, TTransformedValue> &
  Omit<
    ComponentProps,
    | 'checked'
    | 'defaultChecked'
    | 'defaultValue'
    | 'indeterminate'
    | 'name'
    | 'pattern'
    | 'src'
    | 'style'
  >;

export function useHtmlInputAdapter<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValue = unknown,
  ComponentProps extends React.ComponentPropsWithRef<React.ElementType> = React.ComponentPropsWithRef<'input'>
>(
  props: UseHtmlInputAdapterProps<TFieldValues, TName, TTransformedValue, ComponentProps>,
  ref?: ExtractRef<ComponentProps>
) {
  const {
    checked,
    children,
    classes,
    className,
    composeClassName = true,
    control,
    defaultValue,
    disabled = false,
    disableOnIsSubmitting = false,
    indeterminate,
    max,
    maxLength,
    messages,
    min,
    minLength,
    name,
    onBlur,
    onChange,
    pattern,
    required = false,
    rules,
    shouldUnregister = false,
    style,
    title,
    transform,
    type = 'text',
    value: inputValue,
    ...rest
  } = props;

  React.useMemo(() => {
    if (type === 'checkbox' && typeof inputValue === 'undefined') {
      throw new Error(`\`value\` prop is required when using type as "${type}".`);
    }
  }, [inputValue, type]);

  const composedRules = useComposeRules<TFieldValues, TName>({
    max,
    maxLength,
    messages,
    min,
    minLength,
    pattern,
    required,
    rules,
    title,
    type,
  });

  const {
    field,
    fieldState: { error },
    formState: { isSubmitting },
  } = useController({
    control,
    defaultValue,
    disabled,
    name,
    rules: composedRules,
    shouldUnregister,
  });

  const handleRef = useForkRef(field.ref, ref);

  const transformHelpers = React.useMemo(
    () => ({
      input(value: PathValue<TFieldValues, TName>): TTransformedValue {
        if (type === 'file') {
          // In React, an <input type="file" /> is always an uncontrolled component because its value
          // can only be set by a user, and not programmatically.
          // https://legacy.reactjs.org/docs/uncontrolled-components.html#the-file-input-tag
          return undefined as TTransformedValue;
        } else if (typeof value === 'undefined') {
          return '' as TTransformedValue;
        }
        return value;
      },
      output(
        event: React.ChangeEvent<HTMLInputElement>,
        previousValue: TTransformedValue
      ): PathValue<TFieldValues, TName> {
        switch (type) {
          case 'checkbox': {
            const values = (Array.isArray(previousValue) ? previousValue : []).filter(
              (previousVal) => previousVal !== inputValue
            );
            if (checked) {
              values.push(inputValue);
            }
            return values as PathValue<TFieldValues, TName>;
          }
          case 'radio': {
            return (event.target.checked ? event.target.value : null) as PathValue<
              TFieldValues,
              TName
            >;
          }
          case 'file': {
            return event.target.files as PathValue<TFieldValues, TName>;
          }
          case 'number': {
            if (event.target.value === null || event.target.value === '') {
              return null as PathValue<TFieldValues, TName>;
            }
            return +event.target.value as PathValue<TFieldValues, TName>;
          }
          default:
            return event.target.value as PathValue<TFieldValues, TName>;
        }
      },
    }),
    [type, checked, inputValue]
  );

  const transformed = useTransform<TFieldValues, TName, TTransformedValue>({
    onChange: field.onChange,
    transform: {
      input: typeof transform?.input === 'function' ? transform.input : transformHelpers.input,
      output: typeof transform?.output === 'function' ? transform.output : transformHelpers.output,
    },
    value: field.value,
  });

  const handleChange = React.useMemo(
    () => execSequentially(transformed.onChange, onChange),
    [onChange, transformed.onChange]
  );
  const handleBlur = React.useMemo(
    () => execSequentially(field.onBlur, onBlur),
    [field.onBlur, onBlur]
  );

  const modifierState = useComposeModiferState({
    disabled: field.disabled,
    disableOnIsSubmitting,
    error,
    isSubmitting,
  });

  const composedClassName = useComposeClassName({
    classes,
    className,
    composeClassName,
    internalClasses: HtmlInputClasses,
    modifierState: modifierState,
  });

  const composedStyle = useComposeStyle({
    modifierState,
    style,
  });

  const isChecked = React.useMemo(() => {
    if (typeof checked === 'function') {
      return checked(transformed.value);
    }

    if (type === 'radio') {
      return isEqualRadioOrCheckboxValue(transformed.value, inputValue);
    }

    return Array.isArray(transformed.value)
      ? transformed.value.some((value) => {
          return isEqualRadioOrCheckboxValue(value, inputValue);
        })
      : false;
  }, [type, inputValue, transformed.value, checked]);

  const isIndeterminate = React.useMemo(() => {
    if (typeof indeterminate === 'function') {
      return indeterminate(transformed.value);
    }
    return indeterminate;
  }, [indeterminate, transformed.value]);

  const adapter = {
    ...rest,
    children: typeof children === 'function' ? children(transformed.value) : children,
    className: composedClassName,
    disabled: modifierState.disabled,
    name: field.name,
    onBlur: handleBlur,
    onChange: handleChange,
    ref: handleRef,
    required,
    style: composedStyle,
    title,
    type,
    value: transformed.value,
  };

  if (type === 'checkbox' || type === 'radio') {
    if (typeof inputValue !== 'undefined') {
      adapter.value = inputValue;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    adapter.checked = isChecked;
    if (type === 'checkbox') {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      adapter.indeterminate = isIndeterminate;
    }
  }

  if (type === 'image') {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    adapter.src = transformed.value?.toString();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    delete adapter.value;
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  if (typeof adapter.defaultChecked !== 'undefined') {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    delete adapter.defaultChecked;
  }

  return adapter;
}
