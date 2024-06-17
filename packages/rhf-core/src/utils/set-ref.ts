import * as React from 'react';
import hasOwnProperty from './has-own-property';

export default function setRef<T>(
  ref: React.MutableRefObject<T | null> | ((instance: T | null) => void) | null | undefined,
  value: T
) {
  if (typeof ref === 'function') {
    ref(value);
  } else if (hasOwnProperty(ref, 'current')) {
    (ref as React.MutableRefObject<T | null>).current = value;
  }
}
