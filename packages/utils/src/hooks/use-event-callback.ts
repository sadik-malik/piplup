import * as React from 'react';
import { useIsomorphicEffect } from './use-isomorphic-effect';

export function useEventCallback<Args extends unknown[], Return>(
  fn: (...args: Args) => Return
): (...args: Args) => Return {
  const ref = React.useRef(fn);

  useIsomorphicEffect(() => {
    ref.current = fn;
  }, [fn]);

  return React.useCallback((...args: Args) => ref.current(...args), []);
}
