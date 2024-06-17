import * as React from 'react';
import { UseComposeModifierStateResult } from './use-compose-modifier-state';

export type UseComposeClassNameProps<ModifierState extends UseComposeModifierStateResult> = {
  modifierState: ModifierState;
  classes?: Partial<Record<keyof ModifierState | 'root', string | false | undefined | null>>;
  internalClasses: Record<keyof ModifierState | 'root', string | false | undefined | null>;
  className?: string;
};

/**
 * Hook to compose a className based on modifier states and additional classes.
 *
 * @template ModifierState - Type representing the state of modifiers.
 * @param {UseComposeClassNameProps<ModifierState>} options - Options object containing modifier states and class definitions.
 * @returns {string} Composed className string based on the provided options.
 */
export default function useComposeClassName<ModifierState extends UseComposeModifierStateResult>(
  options: UseComposeClassNameProps<ModifierState>
): string {
  const { internalClasses, modifierState, className, classes } = options;

  return React.useMemo(() => {
    const output: Array<string | false | undefined | null> = [internalClasses.root, classes?.root];

    (Object.keys(modifierState) as Array<keyof ModifierState>).forEach((key) => {
      if (!modifierState[key]) {
        return;
      }
      output.push(internalClasses[key]);
      output.push(classes?.[key]);
    });

    output.push(className);

    return output.filter(Boolean).join(' ');
  }, [className, classes, internalClasses, modifierState]);
}
