/**
 * whether `T` is the `any` type
 */
export type IsAny<T> =
  0 extends (1 & T) // this is true only when `T` is any
    ? 1
    : 0
