/**
 * makes all properties of `T` mutable
 */
export type Mutable<T> =
  { -readonly [K in keyof T]: T[K] }
