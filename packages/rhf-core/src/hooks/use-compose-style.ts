import * as React from 'react';
import { type UseComposeModifierStateResult } from './use-compose-modifier-state';

export type UseComposeStyleProps<ModifierState extends UseComposeModifierStateResult> = {
  modifierState: ModifierState;
  style?: ((modifierState: ModifierState) => React.CSSProperties) | React.CSSProperties;
};

/**
 * Hook to compose styles based on modifier states.
 *
 * @template ModifierState - Type representing the state of modifiers.
 * @param {UseComposeStyleProps<ModifierState>} options - Options object containing modifier states and style definitions.
 * @returns {React.CSSProperties} Computed CSS properties object based on the provided modifierState.
 */
export function useComposeStyle<ModifierState extends UseComposeModifierStateResult>(
  options: UseComposeStyleProps<ModifierState>
) {
  const { modifierState, style } = options;

  return React.useMemo(
    () => (typeof style === 'function' ? style(modifierState) : style),
    [style, modifierState]
  );
}
