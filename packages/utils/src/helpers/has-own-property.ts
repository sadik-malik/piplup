// eslint-disable-next-line @typescript-eslint/no-explicit-any
const hasOwn = (Object as any).hasOwn || Object.prototype.hasOwnProperty;

/**
 * Checks if the given object has a property with the specified key.
 * @param obj - The object to check.
 * @param prop - The property key to check.
 * @returns true if the object has the property, otherwise false.
 */
export function hasOwnProperty<X, Y extends PropertyKey>(
  obj: X,
  prop: Y
): obj is X & Record<Y, X[keyof X]> {
  return typeof obj === 'object' && obj !== null && hasOwn.call(obj, prop);
}
