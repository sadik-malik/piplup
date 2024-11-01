import * as React from 'react';
import {
  useController,
  type UseControllerProps,
  type FieldPath,
  type FieldValues,
  type PathValue,
  type FieldPathValue,
  type Control,
} from 'react-hook-form';
import { execSequentially, useForkRef } from '../utils';
import {
  useComposeClassName,
  type UseComposeClassNameProps,
  type UseComposeHelperTextProps,
  useComposeHelperText,
  useComposeModifierState,
  type UseComposeModifierStateProps,
  useComposeRules,
  type UseComposeRulesProps,
  useComposeStyle,
  type UseComposeStyleProps,
  useTransform,
} from './internals/internals';

/**
 * Type for the props of the controller adapter hook.
 */
export interface UseControllerAdapterProps<
  TTransformedValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends UseComposeRulesProps<TFieldValues, TName>,
    Omit<UseComposeModifierStateProps<TFieldValues>, 'fieldError' | 'isSubmitting'>,
    Omit<UseComposeClassNameProps, 'modifierState'>,
    Omit<UseComposeStyleProps, 'modifierState'>,
    Omit<UseComposeHelperTextProps<TFieldValues>, 'fieldError' | 'name'> {
  /**
   * '`control` object from `useForm` hook.'
   */
  control?: Control<TFieldValues>;
  /**
   * The default value for the field.
   */
  defaultValue?: FieldPathValue<TFieldValues, TName>;
  /**
   * If true, the field will be disabled
   */
  disabled?: boolean;
  /**
   * Name of the field.
   */
  name: TName;
  /**
   * Function called when the field loses focus.
   *
   * @param args - Arguments to be passed to the onBlur function.
   */
  onBlur?: (
    // User needs to write their own types for the rest parameters here.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...args: any[]
  ) => void;
  /**
   * Function called when the field's value changes.
   *
   * @param args - Arguments to be passed to the onChange function.
   */
  onChange?: (
    // User needs to write their own types for the rest parameters.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...args: any[]
  ) => void;
  /**
   * Validation rules object. Refer react-hook-form documentation [here](https://www.react-hook-form.com/api/usecontroller/controller/).
   */
  rules?: UseControllerProps<TFieldValues, TName>['rules'];
  /**
   * Enable and disable field unregister after unmount.
   */
  shouldUnregister?: boolean;

  /**
   * Transformation functions for the field's input and output values.
   */
  transform?: {
    /**
     * Function to transform the input value.
     */
    input?: (value: PathValue<TFieldValues, TName>) => TTransformedValue;

    /**
     * Function to transform the output value.
     */
    output?: (
      // User needs to write their own types for the rest parameters.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...args: any[]
    ) => PathValue<TFieldValues, TName>;
  };
}

/**
 * Hook for creating a controller adapter.
 *
 * @param props - The props for the controller adapter.
 * @param [ref] - (Optional) ref for the controller adapter.
 * @returns The adapter object with the transformed and composed properties.
 */
export function useControllerAdapter<
  TTransformedValue,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  RefType = unknown
>(
  props: UseControllerAdapterProps<TTransformedValue, TFieldValues, TName>,
  ref?: React.Ref<RefType>
) {
  const {
    classes,
    className,
    composeClassName,
    composeHelperText,
    control,
    defaultValue,
    disabled,
    disableOnError,
    disableOnIsSubmitting,
    error,
    errorParser,
    helperText,
    internalClasses,
    max,
    maxLength,
    messages,
    min,
    minLength,
    name,
    onBlur,
    onChange,
    pattern,
    required,
    rules,
    shouldUnregister,
    style,
    title,
    transform,
  } = props;

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
  });

  const {
    field,
    fieldState: { error: fieldError },
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

  const transformed = useTransform<TTransformedValue, TFieldValues, TName>({
    onChange: field.onChange,
    transform,
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

  const modifierState = useComposeModifierState<TFieldValues>({
    disabled: field.disabled,
    disableOnError,
    disableOnIsSubmitting,
    error,
    fieldError,
    isSubmitting,
  });

  const composedClassName = useComposeClassName({
    classes,
    className,
    composeClassName,
    internalClasses,
    modifierState,
  });

  const composedStyle = useComposeStyle({
    modifierState,
    style,
  });

  const composedHelperText = useComposeHelperText<TFieldValues>({
    composeHelperText,
    errorParser,
    fieldError,
    helperText,
    name,
  });

  const adapter = {
    className: composedClassName,
    disabled: modifierState.disabled,
    error: modifierState.error,
    helperText: composedHelperText,
    name: field.name,
    onBlur: handleBlur,
    onChange: handleChange,
    ref: handleRef,
    required,
    style: composedStyle,
    title,
    value: transformed.value,
  };

  return adapter;
}
