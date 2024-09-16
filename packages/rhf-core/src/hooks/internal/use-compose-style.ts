import * as React from 'react';
import { type UseComposeModifierStateResult } from './use-compose-modifier-state';

/**
 * Defines the properties for the `useComposeStyle` hook.
 */
export type UseComposeStyleProps<
  ModifierState extends UseComposeModifierStateResult = UseComposeModifierStateResult
> = {
  /**
   * The state object representing the current modifier states.
   */
  modifierState: ModifierState;

  /**
   * A function that takes the `modifierState` and returns a `React.CSSProperties` object,
   * or a direct `React.CSSProperties` object.
   *
   * @param modifierState - The current modifier states.
   * @returns The computed CSS properties based on the `modifierState`.
   */
  style?: ((modifierState: ModifierState) => React.CSSProperties) | React.CSSProperties;
};

/**
 * Hook to compose styles based on modifier states.
 *
 * This hook computes the CSS properties object based on the provided modifier state and style definition.
 *
 * @param options - An object containing modifier states and style definitions.
 * @returns Computed CSS properties object based on the provided `modifierState`,
 * or `undefined` if no style is provided.
 */
export function useComposeStyle<
  ModifierState extends UseComposeModifierStateResult = UseComposeModifierStateResult
>(options: UseComposeStyleProps<ModifierState>) {
  const { modifierState, style } = options;

  return React.useMemo(
    () => (typeof style === 'function' ? style(modifierState) : style),
    [style, modifierState]
  );
}
