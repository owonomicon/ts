/**
 * whether `T` is the `never` type
 * 
 * @since 0.0.2
 */
export type IsNever<T> =
  [T] extends [never]
    ? true
    : false