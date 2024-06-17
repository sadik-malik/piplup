import * as React from 'react';
import { UseComposeModifierStateResult } from './use-compose-modifier-state';

export type UseComposeStyleProps<ModifierState extends UseComposeModifierStateResult> = {
  modifierState: ModifierState;
  style?: React.CSSProperties | ((modifierState: ModifierState) => React.CSSProperties);
};

/**
 * Hook to compose styles based on modifier states.
 *
 * @template ModifierState - Type representing the state of modifiers.
 * @param {UseComposeStyleProps<ModifierState>} options - Options object containing modifier states and style definitions.
 * @returns {React.CSSProperties} Computed CSS properties object based on the provided modifierState.
 */
export default function useComposeStyle<ModifierState extends UseComposeModifierStateResult>(
  options: UseComposeStyleProps<ModifierState>
) {
  const { modifierState, style } = options;

  return React.useMemo(
    () => (typeof style === 'function' ? style(modifierState) : style),
    [style, modifierState]
  );
}
