/**
 * makes all properties of `T` readonly
 * 
 * @since 0.0.2
 */
export type Readonly<T> =
  { readonly [K in keyof T]: T[K] }