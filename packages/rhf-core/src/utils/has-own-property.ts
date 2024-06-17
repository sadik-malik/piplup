/**
 * Checks if the given object has a property with the specified key.
 * @template X The type of the object.
 * @template Y The type of the property key.
 * @param {X} obj The object to check.
 * @param {Y} prop The property key to check.
 * @returns {boolean} True if the object has the property, otherwise false.
 */
function hasOwnProperty<X, Y extends PropertyKey>(
  obj: X,
  prop: Y
): obj is X & Record<Y, X[keyof X]> {
  return typeof obj === 'object' && obj !== null && Object.prototype.hasOwnProperty.call(obj, prop)
}

export default hasOwnProperty
