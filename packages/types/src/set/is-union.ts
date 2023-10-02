type _IsUnion<T, U = T> =
  U extends any
    ? [T] extends [U]
      ? false
      : true
    : false

/**
 * whether `T` is a union type
 * 
 * @since 0.0.2
 */
export type IsUnion<T> = _IsUnion<T>