import {
  Control,
  FieldPath,
  get,
  useFormState,
  type ControllerFieldState,
  type FieldValues,
} from 'react-hook-form';

export type UseFieldStateProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  control?: Control<TFieldValues>;
  name: TName;
  disabled?: boolean;
};

export type UseFieldStateReturn = ControllerFieldState & {
  disabled: boolean;
};

/**
 * Hook to get the state of a specific field in a react-hook-form.
 * @see {@link https://github.com/react-hook-form/react-hook-form/blob/master/src/useController.ts} for more information.
 *
 * @template TFieldValues - The type of the field values.
 * @template TName - The name of the field
 * @param {UseFieldStateProps<TFieldValues>} props - The properties for the field state hook.
 * @param {Control<TFieldValues>} [props.control] - The control object from react-hook-form.
 * @param {TName} props.name - The name of the field.
 * @returns {UseFieldStateReturn} The state of the field including its validation status, dirtiness, touched state, and errors.
 */
export default function useFieldState<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: UseFieldStateProps<TFieldValues, TName>): UseFieldStateReturn {
  const { control, name, disabled } = props;

  const formState = useFormState<TFieldValues>({
    control,
    name,
    disabled,
  });

  return Object.defineProperties(
    {},
    {
      invalid: {
        enumerable: true,
        get: () => !!get(formState.errors, name),
      },
      isDirty: {
        enumerable: true,
        get: () => !!get(formState.dirtyFields, name),
      },
      isTouched: {
        enumerable: true,
        get: () => !!get(formState.touchedFields, name),
      },
      isValidating: {
        enumerable: true,
        get: () => !!get(formState.validatingFields, name),
      },
      error: {
        enumerable: true,
        get: () => get(formState.errors, name),
      },
      // Added disabled property available in field.disabled in useController
      disabled: {
        enumerable: true,
        get: () => get(formState.disabled || disabled),
      },
    }
  ) as UseFieldStateReturn;
}
