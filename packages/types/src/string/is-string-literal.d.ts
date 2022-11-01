/**
 * whether `T` is a string literal type
 */
export type IsStringLiteral<T> =
  T extends string
    ? string extends T
      ? 0
      : 1
    : 0