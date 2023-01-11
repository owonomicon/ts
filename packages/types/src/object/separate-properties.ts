
/**
 * splits `T` into a union type of its individual properties.
 * 
 * @example
 *    type e1 = SeparateProperties<{ foo: number, bar: string }> // { foo: number } | { bar: string }
 */
export type SeparateProperties<T> =
  {
    [U in keyof T]: { [ K in U]: T[U] }
  }[keyof T]
