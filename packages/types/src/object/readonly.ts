/**
 * makes all properties of `T` readonly
 */
export type Readonly<T> =
  { readonly [K in keyof T]: T[K] }