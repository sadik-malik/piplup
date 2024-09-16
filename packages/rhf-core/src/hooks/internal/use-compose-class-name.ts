import * as React from 'react';
import { type UseComposeModifierStateResult } from './use-compose-modifier-state';

/**
 * Props for the `useComposeClassName` hook.
 */
export type UseComposeClassNameProps<
  ModifierState extends UseComposeModifierStateResult = UseComposeModifierStateResult
> = {
  /**
   * Custom classes mapped by keys such as 'root' or modifier state keys.
   * Each value can be a string representing a class name.
   */
  classes?: Partial<Record<'root' | keyof ModifierState, string>>;
  /**
   * Additional className string to append to the composed classes.
   */
  className?: string;
  /**
   * Flag to determine whether to compose the class name based on the state and provided classes.
   * Defaults to `true`.
   */
  composeClassName?: boolean;
  /**
   * Internal classes mapped by keys similar to `classes`, used as base class names.
   */
  internalClasses?: Record<'root' | keyof ModifierState, string>;
  /**
   * The state of modifiers that determine which classes to include.
   */
  modifierState: ModifierState;
};

/**
 * Hook to compose a className based on modifier states and additional classes.
 *
 * @param options - Options object containing modifier states and class definitions.
 * @returns Composed className string based on the provided options.
 */
export function useComposeClassName<
  ModifierState extends UseComposeModifierStateResult = UseComposeModifierStateResult
>(options: UseComposeClassNameProps<ModifierState>): string | undefined {
  const { classes, className, composeClassName = true, internalClasses, modifierState } = options;

  return React.useMemo(() => {
    if (!composeClassName) {
      return className;
    }
    const output: Array<false | null | string | undefined> = [internalClasses?.root, classes?.root];

    (Object.keys(modifierState) as Array<keyof ModifierState>).forEach((key) => {
      if (!modifierState[key]) {
        return;
      }
      output.push(internalClasses?.[key]);
      output.push(classes?.[key]);
    });

    output.push(className);

    return output.filter(Boolean).join(' ');
  }, [className, classes, internalClasses, modifierState, composeClassName]);
}
