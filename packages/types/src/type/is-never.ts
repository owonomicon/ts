/**
 * whether `T` is the `never` type
 */
export type IsNever<T> =
  [T] extends [never]
    ? true
    : false