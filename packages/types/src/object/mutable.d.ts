/**
 * makes all properties of `T` mutable (i.e. strips readonly). like the opposite to `Readonly<T>`
 */
export type Mutable<T> =
  { -readonly [K in keyof T]: T[K] }