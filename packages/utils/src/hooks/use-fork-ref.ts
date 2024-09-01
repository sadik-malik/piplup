import * as React from 'react';
import { setRef } from '../helpers/set-ref';

/**
 * Hook that combines multiple refs into a single ref callback.
 *
 * @template T - Type of the referenced element.
 * @param {...(React.Ref<T> | undefined)[]} refs - List of refs to be combined.
 * @returns {React.RefCallback<T> | null} Combined ref callback function or null if all refs are undefined.
 */
export function useForkRef<T>(
  ...refs: Array<React.Ref<T> | undefined>
): null | React.RefCallback<T> {
  return React.useMemo(() => {
    if (refs.every((ref) => ref == null)) {
      return null;
    }

    return (instance: T) => {
      refs.forEach((ref) => {
        setRef(ref, instance);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, refs);
}
