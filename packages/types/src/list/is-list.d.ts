/**
 * whether `T` is an array type (including readonly and tuples)
 */
export type IsList<T> =
  T extends readonly any[]
    ? true
    : false