/**
 * makes all properties of `T` required
 */
export type Required<T> =
  { [K in keyof T]-?: T[K] }