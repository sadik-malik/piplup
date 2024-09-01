import * as React from 'react';
import { type UseComposeModifierStateResult } from './use-compose-modifier-state';

export type UseComposeClassNameProps<ModifierState extends UseComposeModifierStateResult> = {
  classes?: Partial<Record<'root' | keyof ModifierState, false | null | string | undefined>>;
  className?: string;
  composeClassName?: boolean;
  internalClasses?: Record<'root' | keyof ModifierState, false | null | string | undefined>;
  modifierState: ModifierState;
};

/**
 * Hook to compose a className based on modifier states and additional classes.
 *
 * @template ModifierState - Type representing the state of modifiers.
 * @param {UseComposeClassNameProps<ModifierState>} options - Options object containing modifier states and class definitions.
 * @returns {string} Composed className string based on the provided options.
 */
export function useComposeClassName<ModifierState extends UseComposeModifierStateResult>(
  options: UseComposeClassNameProps<ModifierState>
): string | undefined {
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
