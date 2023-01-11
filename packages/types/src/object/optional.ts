/**
 * makes all properties of `T` optional
 */
export type Optional<T> =
  { [K in keyof T]?: T[K] }