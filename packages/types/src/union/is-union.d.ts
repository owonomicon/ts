type _IsUnion<T, U = T> =
  U extends any
    ? [T] extends [U]
      ? 0
      : 1
    : 0

/**
 * whether `T` is a union type
 */
export type IsUnion<T> = _IsUnion<T>