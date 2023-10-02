/**
 * makes all properties of `T` required
 * 
 * @since 0.0.2
 */
export type Required<T> =
  { [K in keyof T]-?: T[K] }