/**
 * makes all properties of `T` mutable
 * 
 * @since 0.0.2
 */
export type Mutable<T> =
  { -readonly [K in keyof T]: T[K] }
