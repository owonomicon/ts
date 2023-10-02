/**
 * makes all properties of `T` optional
 * 
 * @since 0.0.2
 */
export type Optional<T> =
  { [K in keyof T]?: T[K] }